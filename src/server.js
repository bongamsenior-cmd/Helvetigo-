import express from "express";
import helmet from "helmet";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT || 3000);

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
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(`${value}T12:00:00`));
}
function cleanText(value, max = 120) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "HelvetiGo API", liveProviderData: false });
});

app.get("/api/providers", (_req, res) => {
  res.json({ providers });
});

app.post("/api/search", (req, res) => {
  const from = cleanText(req.body?.from);
  const to = cleanText(req.body?.to);
  const date = req.body?.date;
  const mode = cleanText(req.body?.mode || "Tous", 30);

  if (!from || !to) return res.status(400).json({ error: "Le départ et la destination sont obligatoires." });
  if (from.toLocaleLowerCase("fr") === to.toLocaleLowerCase("fr")) {
    return res.status(400).json({ error: "Le départ et la destination doivent être différents." });
  }
  if (!validDate(date)) return res.status(400).json({ error: "Choisissez une date de départ valide." });

  const allowedModes = ["Tous", "Train", "Bus", "VTC / taxi", "Covoiturage"];
  if (!allowedModes.includes(mode)) return res.status(400).json({ error: "Catégorie de transport inconnue." });

  const matches = providers.filter(p => mode === "Tous" || p.mode === mode);
  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC"
  }).format(new Date(`${date}T12:00:00Z`));

  res.json({
    query: { from, to, date, formattedDate, mode },
    status: "provider-links-only",
    liveData: false,
    message: "Les connecteurs de données transport ne sont pas configurés. Aucun horaire, tarif ou siège n'est présenté comme confirmé.",
    results: matches.map(p => ({
      ...p,
      bookingUrl: p.url,
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

app.use("/api", (_req, res) => res.status(404).json({ error: "Route API introuvable." }));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

export default app;
