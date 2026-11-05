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
    loading:"Recherche en cours…",loading_desc:"Récupération des horaires et des liens opérateurs.",date_word:"Date",category:"Catégorie",no_providers:"Aucun opérateur trouvé pour cette catégorie.",operators:"Sites des opérateurs",no_time:"Horaire non communiqué",duration_unknown:"Durée non communiquée",train_results:"Horaires des transports publics suisses",api_note:"Résultats fournis par l’API suisse. Les prix des billets ne sont pas disponibles ici.",departure:"Départ :",arrival:"Arrivée :",duration:"Durée :",services:"Services :",steps:"Voir les étapes du trajet",price:"Prix :",not_provided:"non fourni par cette API",check_sbb:"Vérifier le trajet sur SBB / CFF ↗",search_error:"Impossible d’effectuer la recherche",retry:"Vérifiez votre connexion puis réessayez.",default_departure:"Départ",default_arrival:"Arrivée",searching:"Recherche…"
  },
  en: {
    tagline:"Travel, beautifully.",nav_home:"Home",nav_routes:"Journeys",nav_stays:"Stays",nav_taxis:"Drivers & taxis",nav_discover:"Discover",
    eyebrow:"TRAVEL WITHOUT BORDERS",hero_title:'Go further,<br><span>travel beautifully.</span>',hero_copy:"Compare trains, buses, private drivers and stays to create a journey that feels like yours.",hero_note:"Europe, at your own pace.",
    from_label:"From",to_label:"Destination",date_label:"Date",mode_label:"Transport",all:"All",train:"Train",bus:"Bus",taxi:"Private driver / taxi",carpool:"Carpooling",search:"Search",disclaimer:"Prices and availability must be confirmed with the providers.",
    bus_short:"Buses & coaches",metro:"Metro & trams",taxi_short:"Drivers & taxis",soft_mobility:"Soft mobility",stays:"Stays",compare:"CHOOSE WITH CONFIDENCE",options_title:"Your travel options",options_sub:"Explore the operators available for your journey.",operator_links:"Provider links",
    rail_title:"Train",rail_desc:"Timetables and connections depend on your route",price_check:"Check price",view_options:"View options",bus_desc:"Check available stops and timetables",taxi_desc:"Availability depends on city and time",carpool_desc:"Check rides offered by drivers",fine_print:"Prices and availability are not yet connected to every provider. Check details with the operator before purchasing.",
    stays_title:"Hotels & stays",geneva_desc:"Lake, city centre and station",paris_desc:"Culture and historic districts",munich_desc:"City centre and transport links",discover_stays:"Explore stays →",drivers_title:"Drivers & taxis",view_all:"View all →",local_taxis:"Local taxis",coverage_title:"Cities covered",
    inspiration:"INSPIRATION AWAITS",dest_title:"Discover Europe",dest_sub:"Iconic cities and distinctive experiences.",switzerland:"Switzerland",france:"France",germany:"Germany",simple:"SIMPLE & TRANSPARENT",steps_title:"A smoother journey in three steps",step1_title:"Plan your journey",step1_desc:"Enter your departure, destination, date and preferred transport.",step2_title:"Explore your options",step2_desc:"Find relevant operators and compare the options available.",step3_title:"Book with the provider",step3_desc:"Check the price, availability and terms on the official website.",
    footer_line:"Travel, beautifully.",data_sources:"Data sources",contact:"Contact",prototype:"Prototype — direct bookings and payments are not available",
    loading:"Searching…",loading_desc:"Retrieving timetables and provider links.",date_word:"Date",category:"Category",no_providers:"No providers found for this category.",operators:"Provider websites",no_time:"Time not provided",duration_unknown:"Duration not provided",train_results:"Swiss public transport timetables",api_note:"Results are supplied by the Swiss API. Ticket prices are not available here.",departure:"Departure:",arrival:"Arrival:",duration:"Duration:",services:"Services:",steps:"View journey details",price:"Price:",not_provided:"not provided by this API",check_sbb:"Check journey on SBB / CFF ↗",search_error:"Unable to complete the search",retry:"Check your connection and try again.",default_departure:"Departure",default_arrival:"Arrival",searching:"Searching…"
  },
  de: {
    tagline:"Reisen mit Stil.",nav_home:"Startseite",nav_routes:"Reiserouten",nav_stays:"Unterkünfte",nav_taxis:"Fahrdienste & Taxis",nav_discover:"Entdecken",
    eyebrow:"REISEN OHNE GRENZEN",hero_title:'Entdecken Sie mehr,<br><span>reisen Sie stilvoll.</span>',hero_copy:"Vergleichen Sie Züge, Busse, private Fahrdienste und Unterkünfte für Ihre persönliche Reise.",hero_note:"Europa in Ihrem Tempo.",
    from_label:"Abfahrt",to_label:"Reiseziel",date_label:"Datum",mode_label:"Verkehrsmittel",all:"Alle",train:"Zug",bus:"Bus",taxi:"Fahrdienst / Taxi",carpool:"Mitfahrgelegenheit",search:"Suchen",disclaimer:"Preise und Verfügbarkeit müssen beim Anbieter bestätigt werden.",
    bus_short:"Busse & Fernbusse",metro:"U-Bahn & Straßenbahn",taxi_short:"Fahrdienste & Taxis",soft_mobility:"Sanfte Mobilität",stays:"Unterkünfte",compare:"MIT SICHERHEIT WÄHLEN",options_title:"Ihre Reiseoptionen",options_sub:"Entdecken Sie verfügbare Anbieter für Ihre Route.",operator_links:"Anbieter-Links",
    rail_title:"Zug",rail_desc:"Fahrpläne und Verbindungen je nach Route",price_check:"Preis prüfen",view_options:"Optionen ansehen",bus_desc:"Verfügbare Haltestellen und Fahrpläne prüfen",taxi_desc:"Verfügbarkeit je nach Stadt und Uhrzeit",carpool_desc:"Fahrten von Fahrern prüfen",fine_print:"Preise und Verfügbarkeiten sind noch nicht mit allen Anbietern verbunden. Prüfen Sie alle Angaben vor dem Kauf beim Anbieter.",
    stays_title:"Hotels & Unterkünfte",geneva_desc:"See, Stadtzentrum und Bahnhof",paris_desc:"Kultur und historische Viertel",munich_desc:"Zentrum und Verkehrsanbindung",discover_stays:"Unterkünfte entdecken →",drivers_title:"Fahrdienste & Taxis",view_all:"Alle ansehen →",local_taxis:"Lokale Taxis",coverage_title:"Abgedeckte Städte",
    inspiration:"INSPIRATION WARTET",dest_title:"Europa entdecken",dest_sub:"Ikonische Städte und besondere Erlebnisse.",switzerland:"Schweiz",france:"Frankreich",germany:"Deutschland",simple:"EINFACH & TRANSPARENT",steps_title:"In drei Schritten entspannter reisen",step1_title:"Route planen",step1_desc:"Geben Sie Abfahrtsort, Ziel, Datum und Verkehrsmittel ein.",step2_title:"Möglichkeiten entdecken",step2_desc:"Finden Sie passende Anbieter und vergleichen Sie die Optionen.",step3_title:"Beim Anbieter buchen",step3_desc:"Prüfen Sie Preis, Verfügbarkeit und Bedingungen auf der offiziellen Website.",
    footer_line:"Reisen mit Stil.",data_sources:"Datenquellen",contact:"Kontakt",prototype:"Prototyp — direkte Buchungen und Zahlungen sind nicht verfügbar",
    loading:"Suche läuft…",loading_desc:"Fahrpläne und Anbieter-Links werden abgerufen.",date_word:"Datum",category:"Kategorie",no_providers:"Keine Anbieter für diese Kategorie gefunden.",operators:"Websites der Anbieter",no_time:"Keine Zeitangabe",duration_unknown:"Keine Dauerangabe",train_results:"Fahrpläne des Schweizer öffentlichen Verkehrs",api_note:"Ergebnisse der Schweizer API. Ticketpreise sind hier nicht verfügbar.",departure:"Abfahrt:",arrival:"Ankunft:",duration:"Dauer:",services:"Services:",steps:"Fahrtdetails anzeigen",price:"Preis:",not_provided:"von dieser API nicht bereitgestellt",check_sbb:"Verbindung bei SBB / CFF prüfen ↗",search_error:"Suche nicht möglich",retry:"Bitte Verbindung prüfen und erneut versuchen.",default_departure:"Abfahrt",default_arrival:"Ankunft",searching:"Suche…"
  },
  it: {
    tagline:"Viaggiare, con eleganza.",nav_home:"Home",nav_routes:"Itinerari",nav_stays:"Soggiorni",nav_taxis:"Autisti e taxi",nav_discover:"Scopri",
    eyebrow:"VIAGGIARE SENZA CONFINI",hero_title:'Vai più lontano,<br><span>con eleganza.</span>',hero_copy:"Confronta treni, autobus, autisti privati e strutture per creare un viaggio su misura.",hero_note:"L’Europa, al tuo ritmo.",
    from_label:"Partenza",to_label:"Destinazione",date_label:"Data",mode_label:"Trasporto",all:"Tutti",train:"Treno",bus:"Autobus",taxi:"Autista / taxi",carpool:"Carpooling",search:"Cerca",disclaimer:"Prezzi e disponibilità devono essere confermati con i fornitori.",
    bus_short:"Bus e pullman",metro:"Metropolitana e tram",taxi_short:"Autisti e taxi",soft_mobility:"Mobilità dolce",stays:"Soggiorni",compare:"SCEGLI IN TUTTA TRANQUILLITÀ",options_title:"Le tue opzioni di viaggio",options_sub:"Scopri gli operatori disponibili per il tuo itinerario.",operator_links:"Link agli operatori",
    rail_title:"Treno",rail_desc:"Orari e coincidenze in base all’itinerario",price_check:"Verifica il prezzo",view_options:"Vedi opzioni",bus_desc:"Consulta fermate e orari disponibili",taxi_desc:"Disponibilità in base alla città e all’orario",carpool_desc:"Verifica i passaggi offerti dai conducenti",fine_print:"Prezzi e disponibilità non sono ancora collegati a tutti i fornitori. Verifica i dettagli con l’operatore prima dell’acquisto.",
    stays_title:"Hotel e soggiorni",geneva_desc:"Lago, centro città e stazione",paris_desc:"Cultura e quartieri storici",munich_desc:"Centro e collegamenti",discover_stays:"Scopri i soggiorni →",drivers_title:"Autisti e taxi",view_all:"Vedi tutto →",local_taxis:"Taxi locali",coverage_title:"Città coperte",
    inspiration:"LASCIATI ISPIRARE",dest_title:"Scopri l’Europa",dest_sub:"Città iconiche ed esperienze speciali.",switzerland:"Svizzera",france:"Francia",germany:"Germania",simple:"SEMPLICE E TRASPARENTE",steps_title:"Un viaggio più semplice in tre passaggi",step1_title:"Pianifica il viaggio",step1_desc:"Inserisci partenza, destinazione, data e mezzo di trasporto.",step2_title:"Esplora le possibilità",step2_desc:"Consulta gli operatori pertinenti e confronta le opzioni.",step3_title:"Prenota con il fornitore",step3_desc:"Verifica prezzo, disponibilità e condizioni sul sito ufficiale.",
    footer_line:"Viaggiare, con eleganza.",data_sources:"Fonti dei dati",contact:"Contatti",prototype:"Prototipo — prenotazioni e pagamenti diretti non disponibili",
    loading:"Ricerca in corso…",loading_desc:"Recupero degli orari e dei link degli operatori.",date_word:"Data",category:"Categoria",no_providers:"Nessun operatore trovato per questa categoria.",operators:"Siti degli operatori",no_time:"Orario non indicato",duration_unknown:"Durata non indicata",train_results:"Orari dei trasporti pubblici svizzeri",api_note:"Risultati forniti dall’API svizzera. I prezzi dei biglietti non sono disponibili qui.",departure:"Partenza:",arrival:"Arrivo:",duration:"Durata:",services:"Servizi:",steps:"Visualizza i dettagli del viaggio",price:"Prezzo:",not_provided:"non fornito da questa API",check_sbb:"Verifica il viaggio su SBB / CFF ↗",search_error:"Impossibile completare la ricerca",retry:"Controlla la connessione e riprova.",default_departure:"Partenza",default_arrival:"Arrivo",searching:"Ricerca…"
  },
  ja: {
    tagline:"上質な旅を、もっと自由に。",nav_home:"ホーム",nav_routes:"ルート",nav_stays:"宿泊施設",nav_taxis:"送迎・タクシー",nav_discover:"旅を発見",
    eyebrow:"国境を越える旅へ",hero_title:'もっと遠くへ、<br><span>もっと優雅に。</span>',hero_copy:"列車、バス、専用車、宿泊施設を比較して、自分らしい旅を見つけましょう。",hero_note:"自分のペースでヨーロッパを。",
    from_label:"出発地",to_label:"目的地",date_label:"日付",mode_label:"交通手段",all:"すべて",train:"列車",bus:"バス",taxi:"専用車・タクシー",carpool:"相乗り",search:"検索",disclaimer:"料金と空席状況は各サービス提供会社でご確認ください。",
    bus_short:"バス・長距離バス",metro:"地下鉄・トラム",taxi_short:"専用車・タクシー",soft_mobility:"環境にやさしい移動",stays:"宿泊施設",compare:"安心して選ぶ",options_title:"旅の選択肢",options_sub:"ルートに合った交通サービスをご覧ください。",operator_links:"サービス提供会社へのリンク",
    rail_title:"列車",rail_desc:"時刻と乗り換えはルートによって異なります",price_check:"料金を確認",view_options:"選択肢を見る",bus_desc:"利用可能な停留所と時刻をご確認ください",taxi_desc:"利用状況は都市と時間によって異なります",carpool_desc:"ドライバーが提供する乗車情報をご確認ください",fine_print:"料金と空席情報は、まだすべての提供会社に接続されていません。購入前に提供会社で詳細をご確認ください。",
    stays_title:"ホテル・宿泊",geneva_desc:"湖畔、中心街、駅周辺",paris_desc:"文化と歴史ある街並み",munich_desc:"中心街と交通アクセス",discover_stays:"宿泊施設を見る →",drivers_title:"専用車・タクシー",view_all:"すべて見る →",local_taxis:"現地タクシー",coverage_title:"対応都市",
    inspiration:"旅のインスピレーション",dest_title:"ヨーロッパを発見",dest_sub:"魅力的な都市と特別な体験。",switzerland:"スイス",france:"フランス",germany:"ドイツ",simple:"シンプルで透明",steps_title:"3つのステップで、より快適な旅へ",step1_title:"旅程を計画",step1_desc:"出発地、目的地、日付、交通手段を入力します。",step2_title:"選択肢を比較",step2_desc:"関連するサービス提供会社と利用可能な選択肢を確認します。",step3_title:"提供会社で予約",step3_desc:"公式サイトで料金、空席状況、利用条件をご確認ください。",
    footer_line:"上質な旅を、もっと自由に。",data_sources:"データソース",contact:"お問い合わせ",prototype:"プロトタイプ — 直接予約・決済には未対応です",
    loading:"検索中…",loading_desc:"時刻表と提供会社へのリンクを取得しています。",date_word:"日付",category:"カテゴリー",no_providers:"このカテゴリーの提供会社は見つかりませんでした。",operators:"提供会社のウェブサイト",no_time:"時刻情報なし",duration_unknown:"所要時間情報なし",train_results:"スイス公共交通機関の時刻表",api_note:"スイスのAPIによる検索結果です。ここでは乗車券の料金は表示されません。",departure:"出発：",arrival:"到着：",duration:"所要時間：",services:"サービス：",steps:"経路の詳細を見る",price:"料金：",not_provided:"このAPIでは提供されていません",check_sbb:"SBB / CFFで経路を確認 ↗",search_error:"検索を完了できませんでした",retry:"接続を確認して、もう一度お試しください。",default_departure:"出発",default_arrival:"到着",searching:"検索中…"
  }
};

const languageMeta = {fr:"🇫🇷 FR",en:"🇬🇧 EN",de:"🇩🇪 DE",it:"🇮🇹 IT",ja:"🇯🇵 JA"};
let currentLang = localStorage.getItem("teyunai-language") || "fr";
if (!translations[currentLang]) currentLang = "fr";
const t = key => translations[currentLang][key] || translations.fr[key] || key;

function applyLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  document.documentElement.lang = lang;
  localStorage.setItem("teyunai-language", lang);
  $$("[data-i18n]").forEach(element => {
    const value = t(element.dataset.i18n);
    if (value.includes("<br>") || value.includes("<span>")) element.innerHTML = value;
    else element.textContent = value;
  });
  $("#currentLanguage").textContent = languageMeta[lang];
  $("#languageMenu").hidden = true;
  $("#languageToggle").setAttribute("aria-expanded", "false");
  $("#languageToggle").setAttribute("aria-label", lang === "ja" ? "言語を選択" : "Select language");
}

const languageToggle = $("#languageToggle");
const languageMenu = $("#languageMenu");
languageToggle.addEventListener("click", () => {
  const open = languageMenu.hidden;
  languageMenu.hidden = !open;
  languageToggle.setAttribute("aria-expanded", String(open));
});
$$("[data-lang]").forEach(button => button.addEventListener("click", () => {
  applyLanguage(button.dataset.lang);
  if (!results.hidden) results.dataset.langChanged = "true";
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

const menuToggle = $("#menuToggle");
const mainNav = $("#mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
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
}
function renderProviders(providers) {
  if (!providers?.length) return `<p>${t("no_providers")}</p>`;
  return `<section class="operator-links"><h3>${t("operators")}</h3><div class="result-links">${providers.map(provider => `<a href="${escapeHtml(provider.bookingUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(provider.name)} ↗</a>`).join("")}</div></section>`;
}
form.addEventListener("submit", async event => {
  event.preventDefault();
  const button = $(".search-button", form);
  const payload = {from:$("#from").value.trim(),to:$("#to").value.trim(),date:dateInput.value,mode:$("#mode").value};
  results.hidden = false;
  results.innerHTML = `<strong>${t("loading")}</strong><p>${t("loading_desc")}</p>`;
  button.disabled = true;
  button.innerHTML = `<span>${t("searching")}</span>`;
  try {
    const response = await fetch("/api/search", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || t("search_error"));
    results.innerHTML = `<h3>${escapeHtml(data.query.from)} → ${escapeHtml(data.query.to)}</h3><p><strong>${t("date_word")} :</strong> ${escapeHtml(data.query.formattedDate)} · <strong>${t("category")} :</strong> ${escapeHtml(data.query.mode)}</p><p>${escapeHtml(data.message)}</p>${renderConnections(data.trainConnections || [])}${renderProviders(data.results || [])}`;
    results.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",block:"nearest"});
  } catch (error) {
    results.innerHTML = `<h3>${t("search_error")}</h3><p class="api-error">${escapeHtml(error.message)} ${t("retry")}</p>`;
  } finally {
    button.disabled = false;
    button.innerHTML = `<span aria-hidden="true">⌕</span><span data-i18n="search">${t("search")}</span>`;
  }
});
