const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const dateInput = $("#date");
const now = new Date();
const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  .toISOString()
  .slice(0, 10);

dateInput.min = localDate;
dateInput.value = localDate;
$("#year").textContent = new Date().getFullYear();

const menuToggle = $("#menuToggle");
const mainNav = $("#mainNav");

menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
});

$$(".main-nav a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

$("#swap").addEventListener("click", () => {
  const from = $("#from");
  const to = $("#to");
  [from.value, to.value] = [to.value, from.value];
  from.focus();
});

$$(".tab").forEach(tab => tab.addEventListener("click", () => {
  $$(".tab").forEach(item => item.classList.toggle("active", item === tab));
  const filter = tab.dataset.filter;

  $$(".provider").forEach(card => {
    card.hidden = filter !== "Tous" && card.dataset.mode !== filter;
  });
}));

const form = $("#searchForm");
const results = $("#searchResults");

const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
})[char]);

function formatTime(value) {
  if (!value) return "Horaire non communiqué";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Horaire non communiqué";

  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Zurich"
  }).format(date);
}

function formatDuration(value) {
  if (!value) return "Durée non communiquée";

  const match = String(value).match(/(?:(\d+):)?(\d{1,2}):(\d{1,2})/);
  if (!match) return String(value);

  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0) + Math.floor(Number(match[3] || 0) / 60);

  return hours > 0 ? `${hours} h ${minutes} min` : `${minutes} min`;
}

function renderConnections(connections) {
  if (!connections.length) return "";

  return `
    <section class="live-connections" aria-label="Horaires des trains suisses">
      <h3>Horaires des transports publics suisses</h3>
      <p>Résultats fournis par l’API suisse. Les prix des billets ne sont pas disponibles ici.</p>
      ${connections.map(connection => `
        <article class="connection-card">
          <h4>${escapeHtml(connection.from)} → ${escapeHtml(connection.to)}</h4>
          <p>
            <strong>Départ :</strong> ${escapeHtml(formatTime(connection.departureTime))}
            <br>
            <strong>Arrivée :</strong> ${escapeHtml(formatTime(connection.arrivalTime))}
            <br>
            <strong>Durée :</strong> ${escapeHtml(formatDuration(connection.duration))}
          </p>
          ${connection.products?.length
            ? `<p><strong>Services :</strong> ${escapeHtml(connection.products.join(", "))}</p>`
            : ""}
          ${connection.sections?.length
            ? `<details>
                <summary>Voir les étapes du trajet</summary>
                <ol>
                  ${connection.sections.map(section => `
                    <li>
                      ${escapeHtml(section.from || "Départ")}
                      → ${escapeHtml(section.to || "Arrivée")}
                      ${section.journey ? ` — ${escapeHtml(section.journey)}` : ""}
                      <br>
                      ${escapeHtml(formatTime(section.departure))}
                      → ${escapeHtml(formatTime(section.arrival))}
                    </li>
                  `).join("")}
                </ol>
              </details>`
            : ""}
          <p><strong>Prix :</strong> non fourni par cette API</p>
          <a href="https://www.sbb.ch/" target="_blank" rel="noopener noreferrer">
            Vérifier le trajet sur SBB / CFF ↗
          </a>
        </article>
      `).join("")}
    </section>
  `;
}

function renderProviders(providers) {
  if (!providers?.length) {
    return "<p>Aucun opérateur trouvé pour cette catégorie.</p>";
  }

  return `
    <section class="operator-links">
      <h3>Sites des opérateurs</h3>
      <div class="result-links">
        ${providers.map(provider => `
          <a href="${escapeHtml(provider.bookingUrl)}"
             target="_blank"
             rel="noopener noreferrer">
            ${escapeHtml(provider.name)} ↗
          </a>
        `).join("")}
      </div>
    </section>
  `;
}

form.addEventListener("submit", async event => {
  event.preventDefault();

  const button = $(".search-button", form);
  const payload = {
    from: $("#from").value.trim(),
    to: $("#to").value.trim(),
    date: dateInput.value,
    mode: $("#mode").value
  };

  results.hidden = false;
  results.innerHTML = "<strong>Recherche en cours…</strong><p>Récupération des horaires et des liens opérateurs.</p>";

  button.disabled = true;
  button.textContent = "Recherche…";

  try {
    const response = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "La recherche n'a pas pu être effectuée.");
    }

    results.innerHTML = `
      <h3>${escapeHtml(data.query.from)} → ${escapeHtml(data.query.to)}</h3>
      <p>
        <strong>Date :</strong> ${escapeHtml(data.query.formattedDate)}
        · <strong>Catégorie :</strong> ${escapeHtml(data.query.mode)}
      </p>
      <p>${escapeHtml(data.message)}</p>
      ${renderConnections(data.trainConnections || [])}
      ${renderProviders(data.results || [])}
    `;

    results.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "nearest"
    });
  } catch (error) {
    results.innerHTML = `
      <h3>Impossible d’effectuer la recherche</h3>
      <p class="api-error">
        ${escapeHtml(error.message)}
        Vérifiez votre connexion puis réessayez.
      </p>
    `;
  } finally {
    button.disabled = false;
    button.innerHTML = '<span aria-hidden="true">⌕</span> Rechercher';
  }
});
