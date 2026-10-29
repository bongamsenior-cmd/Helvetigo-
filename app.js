const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const dateInput = $("#date");
const now = new Date();
const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
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
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
})[char]);

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
  results.innerHTML = "<strong>Recherche en cours…</strong><p>Préparation des liens vers les opérateurs.</p>";
  button.disabled = true;
  button.textContent = "Recherche…";

  try {
    const response = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "La recherche n'a pas pu être effectuée.");

    const links = data.results.map(provider =>
      `<a href="${escapeHtml(provider.bookingUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(provider.name)} ↗</a>`
    ).join("");
    results.innerHTML = `
      <h3>${escapeHtml(data.query.from)} <span aria-hidden="true">→</span> ${escapeHtml(data.query.to)}</h3>
      <p><strong>Date :</strong> ${escapeHtml(data.query.formattedDate)} · <strong>Catégorie :</strong> ${escapeHtml(data.query.mode)}</p>
      <p>${escapeHtml(data.message)}</p>
      <div class="result-links">${links || "<span>Aucun opérateur trouvé pour cette catégorie.</span>"}</div>`;
    results.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
  } catch (error) {
    results.innerHTML = `<h3>Impossible d’effectuer la recherche</h3><p class="api-error">${escapeHtml(error.message)} Vérifiez que le serveur HelvetiGo est démarré.</p>`;
  } finally {
    button.disabled = false;
    button.innerHTML = '<span aria-hidden="true">⌕</span> Rechercher';
  }
});
