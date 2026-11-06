const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const translations = {
  fr: {
    tagline:"Le voyage, avec élégance.",nav_home:"Accueil",nav_routes:"Itinéraires",nav_stays:"Hébergements",nav_taxis:"Chauffeurs & taxis",nav_discover:"Découvrir",
    eyebrow:"LE VOYAGE, SANS FRONTIÈRES",hero_title:'Voyagez plus loin,<br><span>en toute élégance.</span>',hero_copy:"Comparez les trains, bus, chauffeurs privés et hébergements pour composer un voyage qui vous ressemble.",hero_note:"L’Europe, à votre rythme.",
    from_label:"Départ",to_label:"Destination",date_label:"Date",mode_label:"Transport",all:"Tous",train:"Train",bus:"Bus",taxi:"Chauffeur / taxi",carpool:"Covoiturage",search:"Rechercher",disclaimer:"Les tarifs et disponibilités doivent être confirmés auprès des fournisseurs.",
    bus_short:"Bus & autocars",metro:"Métros & tramways",taxi_short:"Chauffeurs & taxis",soft_mobility:"Mobilité douce",stays:"Hébergements",compare:"CHOISISSEZ EN TOUTE SÉRÉNITÉ",options_title:"Vos options de voyage",options_sub:"Explorez les opérateurs disponibles pour votre itinéraire.",operator_links:"Liens opérateurs",
    rail_title:"Train",rail_desc:"Horaires et correspondances selon l’itinéraire",price_check:"Tarif à vérifier",view_options:"Voir les options",bus_desc:"Consultez les arrêts et horaires disponibles",taxi_desc:"Disponibilité selon la ville et l’heure",carpool_desc:"Vérifiez les départs proposés par les conducteurs",fine_print:"Les disponibilités et les prix ne sont pas encore connectés à tous les fournisseurs. Vérifiez les détails auprès de l’opérateur avant tout achat.",
    stays_title:"Séjours & hôtels",geneva_desc:"Lac, centre-ville et gare",paris_desc:"Culture et quartiers historiques",munich_desc:"Centre et accès aux transports",discover_stays:"Découvrir les séjours →",drivers_title:"Chauffeurs & taxis",view_all:"Tout voir →",local_taxis:"Taxis locaux",coverage_title:"Villes couvertes",
    inspiration:"L’INSPIRATION VOUS ATTEND",dest_title:"L’Europe à découvrir",dest_sub:"Des villes emblématiques, des expériences singulières.",switzerland:"Suisse",france:"France",germany:"Allemagne",simple:"SIMPLE ET TRANSPARENT",steps_title:"Un voyage plus fluide, en trois étapes",step1_title:"Imaginez votre itinéraire",step1_desc:"Indiquez votre départ, votre destination, votre date et votre mode de transport.",step2_title:"Explorez les possibilités",step2_desc:"Consultez les opérateurs pertinents et comparez les options proposées.",step3_title:"Réservez auprès du fournisseur",step3_desc:"Vérifiez le prix, les disponibilités et les conditions sur le site officiel.",
    footer_line:"Le voyage, avec élégance.",data_sources:"Sources des données",contact:"Contact",prototype:"Prototype — réservations et paiements directs non disponibles",
    loading:"Recherche en cours…",loading_desc:"Récupération des horaires et des liens opérateurs.",date_word:"Date",category:"Catégorie",no_providers:"Aucun opérateur trouvé pour cette catégorie.",operators:"Sites des opérateurs",no_time:"Horaire non communiqué",duration_unknown:"Durée non communiquée",train_results:"Horaires des transports publics suisses",api_note:"Résultats fournis par l’API suisse. Les prix des billets ne sont pas disponibles ici.",route_notice:"Les horaires proviennent de l’API des transports publics suisses. Vérifiez les détails avant le départ.",departure:"Départ :",arrival:"Arrivée :",duration:"Durée :",services:"Services :",steps:"Voir les étapes du trajet",price:"Prix :",not_provided:"non fourni par cette API",check_sbb:"Vérifier le trajet sur SBB / CFF ↗",search_error:"Impossible d’effectuer la recherche",retry:"Vérifiez votre connexion puis réessayez.",default_departure:"Départ",default_arrival:"Arrivée",searching:"Recherche…"
  },
  e    eyebrow:"TRAVEL WITHOUT BORDERS",hero_title:'Go further,<br><span>travel beautifully.</span>',hero_copy:"Compare trains, buses, private drivers and stays to create a journey that feels like yours.",hero_note:"Europe, at your own pace.",    eyebrow:"VIAGGIARE SENZA CONFINI",hero_title:'Vai più lontano,<br><span>con eleganza.</span>',hero_copy:"Confronta treni, autobus, autisti privati e strutture per creare un viaggio su misura.",hero_note:"L’Europa, al tuo ritmo.",    rail_title:"Treno",rail_desc:"Orari e coincidenze in base all’itinerario",price_check:"Verifica il prezzo",view_options:"Vedi opzioni",bus_desc:"Consulta fermate e orari disponibili",taxi_desc:"Disponibilità in base alla città e all’orario",carpool_desc:"Verifica i passaggi offerti dai conducenti",fine_print:"Prezzi e disponibilità non sono ancora collegati a tutti i fornitori. Verifica i dettagli con l’operatore prima dell’acquisto.",    inspiration:"LASCIATI ISPIRARE",dest_title:"Scopri l’Europa",dest_sub:"Città iconiche ed esperienze speciali.",switzerland:"Svizzera",france:"Francia",germany:"Germania",simple:"SEMPLICE E TRASPARENTE",steps_title:"Un viaggio più semplice in tre passaggi",step1_title:"Pianifica il viaggio",step1_desc:"Inserisci partenza, destinazione, data e mezzo di trasporto.",step2_title:"Esplora le possibilità",step2_desc:"Consulta gli operatori pertinenti e confronta le opzioni.",step3_title:"Prenota con il fornitore",step3_desc:"Verifica prezzo, disponibilità e condizioni sul sito ufficiale.",};if (!translations[currentLang]) currentLang = "f  if (!translations[lang]) return;    else element.textContent = valu  $("#currentLanguage").textContent = languageMeta[lang];
languageToggle.addEventListener("click", () => {
  const open = languageMenu.hidden;
  languageMenu.hidden = !open;
  languageToggle.setAttribute("aria-expanded", String(open));
});
$$("[data-lang]").forEach(button => button.addEventListener("click", () => {
  applyLanguage(button.dataset.lang);
  if (lastSearchData && !results.hidden) {
    results.innerHTML = renderSearchResults(lastSearchData);
  }
}));
document.addEventListener("click", event => {
  if (!event.target.closest(".language-selector")) {
    languageMenu.hidden = true;
    languageToggle.setAttribute("aria-expanded", "false");
  }
});
applyLanguage(currentLang);

const dateInput = $("#date");
const now = new Date();
const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0,10);
dateInput.min = localDate;
dateInput.value = localDate;
$("#year").textContent = new Date().getFullYear();

  menuToggle.setAttribute("aria-expanded", String(open));
$$(".main-nav a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
$("#swap").addEventListener("click", () => {
  const from = $("#from"), to = $("#to");
  [from.value, to.value] = [to.value, from.value];
  from.focus();
});
$$(".tab").forEach(tab => tab.addEventListener("click", () => {
  $$(".tab").forEach(item => item.classList.toggle("active", item === tab));
  const filter = tab.dataset.filter;
  $$(".provider").forEach(card => { card.hidden = filter !== "Tous" && card.dataset.mode !== filter; });
}));

const form = $("#searchForm");
const results = $("#searchResults");
const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
function formatTime(value) {
  if (!value) return t("no_time");
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return t("no_time");
  return new Intl.DateTimeFormat(currentLang === "ja" ? "ja-JP" : currentLang === "de" ? "de-DE" : currentLang === "it" ? "it-IT" : currentLang === "en" ? "en-GB" : "fr-FR", {hour:"2-digit",minute:"2-digit",timeZone:"Europe/Zurich"}).format(date);
}
function formatDuration(value) {
  if (!value) return t("duration_unknown");
  const match = String(value).match(/(?:(\d+):)?(\d{1,2}):(\d{1,2})/);
  if (!match) return String(value);
  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0) + Math.floor(Number(match[3] || 0) / 60);
  return currentLang === "ja" ? (hours ? `${hours}時間${minutes}分` : `${minutes}分`) : hours > 0 ? `${hours} h ${minutes} min` : `${minutes} min`;
}
function renderConnections(connections) {
  if (!connections.length) return "";
  return `<section class="live-connections"><h3>${t("train_results")}</h3><p>${t("api_note")}</p>
  ${connections.map(connection => `<article class="connection-card"><h4>${escapeHtml(connection.from)} → ${escapeHtml(connection.to)}</h4>
  <p><strong>${t("departure")}</strong> ${escapeHtml(formatTime(connection.departureTime))}<br><strong>${t("arrival")}</strong> ${escapeHtml(formatTime(connection.arrivalTime))}<br><strong>${t("duration")}</strong> ${escapeHtml(formatDuration(connection.duration))}</p>
  ${connection.products?.length ? `<p><strong>${t("services")}</strong> ${escapeHtml(connection.products.join(", "))}</p>` : ""}
  ${connection.sections?.length ? `<details><summary>${t("steps")}</summary><ol>${connection.sections.map(section => `<li>${escapeHtml(section.from || t("default_departure"))} → ${escapeHtml(section.to || t("default_arrival"))}${section.journey ? ` — ${escapeHtml(section.journey)}` : ""}<br>${escapeHtml(formatTime(section.departure))} → ${escapeHtml(formatTime(section.arrival))}</li>`).join("")}</ol></details>` : ""}
  <p><strong>${t("price")}</strong> ${t("not_provided")}</p><a href="https://www.sbb.ch/" target="_blank" rel="noopener noreferrer">${t("check_sbb")}</a></article>`).join("")}</section>`;
function renderProviders(providers) {
  if (!providers?.length) return `<p>${t("no_providers")}</p>`;
  return `<section class="operator-links"><h3>${t("operators")}</h3><div class="result-links">${providers.map(provider => `<a href="${escapeHtml(provider.bookingUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(provider.name)} ↗</a>`).join("")}</div></section>`;
}
function renderSearchResults(data) {
  return `<h3>${escapeHtml(data.query.from)} → ${escapeHtml(data.query.to)}</h3>
  <p><strong>${t("date_word")} :</strong> ${escapeHtml(data.query.formattedDate)} ·
  <strong>${t("category")} :</strong> ${escapeHtml(data.query.mode)}</p>
  <p>${escapeHtml(data.message)}</p>
  ${renderConnections(data.trainConnections || [])}
  ${renderProviders(data.results || [])}`;
}