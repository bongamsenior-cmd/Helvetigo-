import express from "express";
import helmet from "helmet";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.disable("x-powered-by");
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "32kb" }));
app.use(express.static(path.join(__dirname, "../public"), { extensions: ["html"] }));

const providers = [
  { id: "sbb", name: "SBB / CFF", mode: "Train", url: "https://www.sbb.ch/", description: "Horaires et billets ferroviaires en Suisse et au-delà." },
  { id: "sncf", name: "SNCF Connect", mode: "Train", url: "https://www.sncf-connect.com/", description: "Trains et correspondances en France." },
  { id: "bahn", name: "Deutsche Bahn", mode: "Train", url: "https://www.bahn.de/", description: "Horaires et billets en Allemagne et en Europe." },
  { id: "flixbus", name: "FlixBus", mode: "Bus", url: "https://www.flixbus.fr/", description: "Réseau d'autocars longue distance." },
  { id: "blablacar", name: "BlaBlaCar", mode: "Covoiturage", url: "https://www.blablacar.fr/", description: "Trajets partagés et covoiturage." },
  { id: "uber", name: "Uber", mode: "VTC / taxi", url: "https://www.uber.com/", description: "Vérifiez la disponibilité locale et estimez votre course." },
  { id: "bolt", name: "Bolt", mode: "VTC / taxi", url: "https://bolt.eu/", description: "Mobilité urbaine selon les villes couvertes." },
  { id: "maps", name: "Taxis locaux", mode: "VTC / taxi", url: "https://maps.google.com/", description: "Trouvez un taxi local à votre destination." }
];

const TRANSPORT_API = "https://transport.opendata.ch/v1";
const PHOTON_API = "https://photon.komoot.io/api/";
const locationCache = new Map();
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

function validDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function cleanText(value, max = 120) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function formatDate(date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(`${date}T12:00:00Z`));
}

async function fetchJson(url, timeoutMs = 10000) {
  const response = await fetch(url, {
    headers: { "Accept": "application/json" },
    signal: AbortSignal.timeout(timeoutMs)
  });
  if (!response.ok) throw new Error(`Service externe indisponible (${response.status}).`);
  return response.json();
}

/*
 * Resolve a user-entered place name without assuming its language.
 * First try the Swiss transport location index (best for exact stations).
 * If it cannot find a station, use Photon/OSM geocoding and pass the
 * resulting WGS84 coordinates to the Swiss connections endpoint.
 */
async function resolveLocation(input) {
  const cacheKey = input.normalize("NFKC").trim().toLocaleLowerCase();
  const cached = locationCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached.value;

  // First: exact/near-exact station lookup in the Swiss public transport index.
  try {
    const stationUrl = new URL(`${TRANSPORT_API}/locations`);
    stationUrl.searchParams.set("query", input);
    stationUrl.searchParams.set("type", "station");
    stationUrl.searchParams.set("limit", "5");

    const stationData = await fetchJson(stationUrl);
    const station = (stationData.stations || []).find(item =>
      item?.id && item?.name && item.type !== "refine"
    );

    if (station) {
      const value = {
        apiValue: station.id,
        displayName: station.name,
        resolution: "transport-station",
        coordinates: station.coordinate || null
      };
      locationCache.set(cacheKey, { value, expiresAt: Date.now() + CACHE_TTL_MS });
      return value;
    }
  } catch (error) {
    // Continue to multilingual geocoding if the station lookup fails.
    console.warn("Transport station lookup fallback:", error.message);
  }

  // Second: multilingual geocoding. Photon accepts native-script place names.
  const geocodeUrl = new URL(PHOTON_API);
  geocodeUrl.searchParams.set("q", input);
  geocodeUrl.searchParams.set("limit", "5");
  geocodeUrl.searchParams.set("lang", "en");

  const geocodeData = await fetchJson(geocodeUrl, 12000);
  const features = Array.isArray(geocodeData.features) ? geocodeData.features : [];

  if (!features.length) {
    const error = new Error(`Lieu introuvable : "${input}". Essayez un nom de ville ou de gare plus précis.`);
    error.statusCode = 422;
    throw error;
  }

  // Photon coordinates are [longitude, latitude]; the transport API expects latitude,longitude.
  const feature = features[0];
  const coordinates = feature?.geometry?.coordinates;
  if (!Array.isArray(coordinates) || coordinates.length < 2 ||
      !Number.isFinite(coordinates[0]) || !Number.isFinite(coordinates[1])) {
    const error = new Error(`Impossible de localiser : "${input}". Essayez un nom plus précis.`);
    error.statusCode = 422;
    throw error;
  }

  const properties = feature.properties || {};
  const displayName = [
    properties.name,
    properties.city,
    properties.state,
    properties.country
  ].filter(Boolean).filter((value, index, list) => list.indexOf(value) === index).join(", ") || input;

  const value = {
    apiValue: `${coordinates[1]},${coordinates[0]}`,
    displayName,
    resolution: "multilingual-geocoding",
    coordinates: { latitude: coordinates[1], longitude: coordinates[0] }
  };

  locationCache.set(cacheKey, { value, expiresAt: Date.now() + CACHE_TTL_MS });
  return value;
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "TEYUNAI API", liveProviderData: true });
});

app.get("/api/providers", (_req, res) => {
  res.json({ providers });
});

app.post("/api/search", async (req, res) => {
  const from = cleanText(req.body?.from);
  const to = cleanText(req.body?.to);
  const date = req.body?.date;
  const mode = cleanText(req.body?.mode || "Tous", 30);

  if (!from || !to) {
    return res.status(400).json({ error: "Le départ et la destination sont obligatoires." });
  }

  if (from.normalize("NFKC").toLocaleLowerCase() === to.normalize("NFKC").toLocaleLowerCase()) {
    return res.status(400).json({ error: "Le départ et la destination doivent être différents." });
  }

  if (!validDate(date)) {
    return res.status(400).json({ error: "Choisissez une date de départ valide." });
  }

  const allowedModes = ["Tous", "Train", "Bus", "VTC / taxi", "Covoiturage"];
  if (!allowedModes.includes(mode)) {
    return res.status(400).json({ error: "Catégorie de transport inconnue." });
  }

  const formattedDate = formatDate(date);
  const matches = providers.filter(p => mode === "Tous" || p.mode === mode);

  let trainConnections = [];
  let timetableStatus = "not-requested";
  let timetableMessage = "Sélectionnez Train ou Tous pour rechercher des horaires suisses.";
  let resolvedLocations = null;

  if (mode === "Tous" || mode === "Train") {
    try {
      const [resolvedFrom, resolvedTo] = await Promise.all([
        resolveLocation(from),
        resolveLocation(to)
      ]);

      resolvedLocations = {
        from: resolvedFrom.displayName,
        to: resolvedTo.displayName
      };

      const params = new URLSearchParams({
        from: resolvedFrom.apiValue,
        to: resolvedTo.apiValue,
        date,
        limit: "8"
      });

      const apiResponse = await fetchJson(
        `${TRANSPORT_API}/connections?${params.toString()}`,
        12000
      );

      trainConnections = (apiResponse.connections || []).map((connection, index) => ({
        id: `swiss-${index}`,
        resultType: "timetable",
        name: "Transport public suisse",
        from: connection.from?.station?.name || resolvedFrom.displayName,
        to: connection.to?.station?.name || resolvedTo.displayName,
        departureTime: connection.from?.departure || null,
        arrivalTime: connection.to?.arrival || null,
        duration: connection.duration || null,
        products: Array.isArray(connection.products) ? connection.products : [],
        sections: (connection.sections || []).map(section => ({
          journey: section.journey?.name || null,
          category: section.journey?.category || null,
          departure: section.departure?.departure || null,
          arrival: section.arrival?.arrival || null,
          from: section.departure?.station?.name || null,
          to: section.arrival?.station?.name || null
        })),
        price: null,
        bookingUrl: "https://www.sbb.ch/"
      }));

      timetableStatus = "live-timetable";
      timetableMessage = trainConnections.length
        ? "Horaires issus de l'API des transports publics suisses. Vérifiez les détails avant le départ."
        : "Aucune correspondance trouvée pour ces lieux et cette date. Vérifiez les lieux sélectionnés ou essayez une gare plus proche.";
    } catch (error) {
      console.error("Erreur de recherche transport :", error);
      timetableStatus = "unavailable";
      timetableMessage = error?.message || "Le service d'horaires est momentanément indisponible.";
      if (error.statusCode === 422) {
        return res.status(422).json({ error: timetableMessage });
      }
    }
  }

  res.json({
    query: { from, to, date, formattedDate, mode },
    resolvedLocations,
    status: timetableStatus,
    liveData: trainConnections.length > 0,
    timetableSource: "Transport API — opendata.ch / opentransportdata.swiss",
    geocodingSource: "Photon — OpenStreetMap",
    message: timetableMessage,
    trainConnections,
    results: matches.map(provider => ({
      ...provider,
      bookingUrl: provider.url,
      resultType: "operator",
      price: null,
      departureTime: null,
      arrivalTime: null,
      duration: null
    }))
  });
});

app.get("/api/hotels", (req, res) => {
  const city = cleanText(req.query.city || "Munich", 80);
  const q = encodeURIComponent(city);

  res.json({
    city,
    liveData: false,
    message: "Recherche transmise à un partenaire externe ; aucun tarif ni disponibilité n'est récupéré par TEYUNAI.",
    url: `https://www.booking.com/searchresults.html?ss=${q}`
  });
});

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "Route API introuvable." });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

export default app;
