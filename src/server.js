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

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "HelvetiGo API", liveProviderData: true });
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

  if (from.toLocaleLowerCase("fr") === to.toLocaleLowerCase("fr")) {
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

  if (mode === "Tous" || mode === "Train") {
    try {
      const params = new URLSearchParams({
        from,
        to,
        date,
        limit: "8"
      });

      const apiResponse = await fetch(
        `https://transport.opendata.ch/v1/connections?${params.toString()}`,
        { signal: AbortSignal.timeout(10000) }
      );

      if (!apiResponse.ok) {
        throw new Error("Le service d'horaires est momentanément indisponible.");
      }

      const apiData = await apiResponse.json();

      trainConnections = (apiData.connections || []).map((connection, index) => ({
        id: `swiss-${index}`,
        resultType: "timetable",
        name: "Transport public suisse",
        from: connection.from?.station?.name || from,
        to: connection.to?.station?.name || to,
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
        : "Aucune correspondance trouvée par l'API suisse pour ces critères. Essayez les noms exacts des gares.";
    } catch (error) {
  console.error("Erreur API transport suisse :", error);

  timetableStatus = "unavailable";
  timetableMessage =
    "Erreur technique : " +
    (error?.message || "cause inconnue") +
    ". Vous pouvez consulter les opérateurs ci-dessous.";
}

  res.json({
    query: { from, to, date, formattedDate, mode },
    status: timetableStatus,
    liveData: trainConnections.length > 0,
    timetableSource: "Transport API — opendata.ch / opentransportdata.swiss",
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
    message: "Recherche transmise à un partenaire externe ; aucun tarif ni disponibilité n'est récupéré par HelvetiGo.",
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
