(() => {
  "use strict";
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  // Remove obsolete injected map/clock/location UI from earlier iterations.
  ["#teyunaiMap", "#teyunaiClock", "#teyunaiSbbClock", "#teyunaiCurrentLocation",
   ".teyunai-map-wrap", ".teyunai-clock-wrap"].forEach(sel => $$(sel).forEach(el => el.remove()));
  const oldCss = $("#teyunai-preview-style");
  if (oldCss) oldCss.remove();
  const css = document.createElement("link");
  css.id = "teyunai-preview-style";
  css.rel = "stylesheet";
  css.href = "./homepage-upgrade.css";
  document.head.append(css);

  // Header: preserve the one existing language selector and one existing hamburger.
  const header = $(".topbar");
  const nav = $("#mainNav");
  const menuButton = $("#menuToggle");
  if (header && nav && menuButton) {
    nav.classList.add("teyunai-preview-nav");
    menuButton.setAttribute("aria-label", "Open navigation");
    menuButton.setAttribute("title", "Open navigation");
    menuButton.textContent = "";
    menuButton.addEventListener("click", () => {
      const opened = nav.classList.contains("open");
      menuButton.setAttribute("aria-label", opened ? "Close navigation" : "Open navigation");
    });
    if (!nav.querySelector('[href="#recherche"]')) {
      const search = document.createElement("a");
      search.href = "#recherche";
      search.textContent = "⌕  Search";
      nav.insertBefore(search, nav.children[1] || null);
    }
    if (!nav.querySelector('[href="#information"]')) {
      const info = document.createElement("a");
      info.href = "#information";
      info.textContent = "ⓘ  Information";
      nav.append(info);
    }
    if (!nav.querySelector('[href="#sources"]')) {
      const sources = document.createElement("a");
      sources.href = "#sources";
      sources.textContent = "▤  Data sources";
      nav.append(sources);
    }
    const contact = nav.querySelector('a[href^="mailto:"]') || (() => {
      const a = document.createElement("a");
      a.href = "mailto:contact@teyunai.com";
      a.textContent = "✉  Contact";
      nav.append(a);
      return a;
    })();
  }

  // Search autocomplete: suggestions appear as the traveller types.
  const cities = [
    ["Genève, Switzerland","Genève","Switzerland","city"],
    ["Geneva Airport (GVA), Switzerland","Geneva Airport","Switzerland","airport"],
    ["Geneva main station, Switzerland","Genève-Cornavin","Switzerland","station"],
    ["Lausanne, Switzerland","Lausanne","Switzerland","city"],
    ["Zurich, Switzerland","Zürich","Switzerland","city"],
    ["Bern, Switzerland","Bern","Switzerland","city"],
    ["Basel, Switzerland","Basel","Switzerland","city"],
    ["Paris, France","Paris","France","city"],
    ["Lyon, France","Lyon","France","city"],
    ["Annecy, France","Annecy","France","city"],
    ["Chamonix, France","Chamonix","France","city"],
    ["Munich, Germany","München","Germany","city"],
    ["Stuttgart, Germany","Stuttgart","Germany","city"],
    ["Milan, Italy","Milano","Italy","city"],
    ["Turin, Italy","Torino","Italy","city"],
    ["Barcelona, Spain","Barcelona","Spain","city"],
    ["London, United Kingdom","London","United Kingdom","city"],
    ["Amsterdam, Netherlands","Amsterdam","Netherlands","city"],
    ["Genoa, Italy","Genova","Italy","city"],
    ["Ghent, Belgium","Gent","Belgium","city"]
  ];
  const form = $("#searchForm"), from = $("#from"), to = $("#to");
  function attachAutocomplete(input, isOrigin) {
    if (!input || input.dataset.autocompleteReady) return;
    input.dataset.autocompleteReady = "1";
    const wrap = input.closest(".input-with-icon") || input.parentElement;
    wrap.classList.add("teyunai-autocomplete-wrap");
    const list = document.createElement("div");
    list.className = "teyunai-city-suggestions";
    list.hidden = true;
    list.setAttribute("role", "listbox");
    wrap.append(list);

    const locate = document.createElement("button");
    locate.type = "button";
    locate.className = "teyunai-location-icon";
    locate.setAttribute("aria-label", "Use my current location");
    locate.title = "Use my current location";
    locate.textContent = "◎";
    if (isOrigin) wrap.append(locate);

    let active = -1, matches = [];
    const close = () => { list.hidden = true; active = -1; };
    const choose = item => {
      input.value = item[0];
      input.dispatchEvent(new Event("input", {bubbles:true}));
      close();
    };
    const draw = () => {
      const q = input.value.trim().toLocaleLowerCase();
      if (q.length < 2) { close(); return; }
      matches = cities.filter(c => c.join(" ").toLocaleLowerCase().includes(q)).slice(0,6);
      list.innerHTML = "";
      matches.forEach((item, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "teyunai-city-option";
        button.setAttribute("role", "option");
        const glyph = item[3] === "airport" ? "✈" : item[3] === "station" ? "▣" : "⌖";
        button.innerHTML = `<span aria-hidden="true">${glyph}</span><span>${item[0]}</span>`;
        button.addEventListener("mousedown", e => e.preventDefault());
        button.addEventListener("click", () => choose(item));
        list.append(button);
      });
      list.hidden = !matches.length;
    };
    input.addEventListener("input", draw);
    input.addEventListener("focus", draw);
    input.addEventListener("keydown", e => {
      if (list.hidden) return;
      if (e.key === "ArrowDown") { e.preventDefault(); active = Math.min(active + 1, matches.length - 1); }
      if (e.key === "ArrowUp") { e.preventDefault(); active = Math.max(active - 1, 0); }
      if (e.key === "Enter" && active >= 0) { e.preventDefault(); choose(matches[active]); }
      if (e.key === "Escape") close();
      $$(".teyunai-city-option", list).forEach((el, i) => el.classList.toggle("active", i === active));
    });
    input.addEventListener("blur", () => setTimeout(close, 120));
    locate?.addEventListener("click", () => {
      if (!navigator.geolocation) return;
      locate.disabled = true;
      navigator.geolocation.getCurrentPosition(async pos => {
        const {latitude, longitude} = pos.coords;
        try {
          const u = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
          const r = await fetch(u);
          if (!r.ok) throw new Error("Location lookup failed");
          const d = await r.json(), a = d.address || {};
          input.value = [a.city || a.town || a.village || a.municipality, a.country].filter(Boolean).join(", ") || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        } catch (_) { input.value = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`; }
        input.dispatchEvent(new Event("input", {bubbles:true}));
        locate.disabled = false;
      }, () => { locate.disabled = false; }, {timeout:10000, maximumAge:60000});
    });
  }
  attachAutocomplete(from, true);
  attachAutocomplete(to, false);

  // Turn existing service cards into wide image-led editorial rows.
  const photoByMode = {
    "Train": ["./assets/train-modern.png","Modern passenger train"],
    "Bus": ["./assets/flixbus-coach.png","FlixBus coach"],
    "VTC / taxi": ["./assets/mercedes-v-class.png","Black Mercedes passenger van"],
    "Covoiturage": ["./assets/carpooling.png","Carpool passengers"]
  };
  $$(".provider").forEach(card => {
    const config = photoByMode[card.dataset.mode];
    if (!config) return;
    card.classList.add("teyunai-photo-provider");
    let image = $(".teyunai-provider-image", card);
    if (!image) {
      image = document.createElement("img");
      image.className = "teyunai-provider-image";
      image.loading = "lazy";
      image.decoding = "async";
      image.src = config[0];
      image.alt = config[1];
      card.prepend(image);
    }
  });

  // Remove all previous clock versions and place a small, plain SBB-style clock
  // on the upper-right edge of the goddess artwork, as in the approved preview.
  const footer = $("footer.footer");
  if (footer) {
    footer.classList.add("teyunai-art-footer");
    const clock = document.createElement("div");
    clock.className = "teyunai-clock";
    clock.setAttribute("role","img");
    clock.setAttribute("aria-label","Analogue clock");
    clock.innerHTML = '<div class="teyunai-clock-face"><div class="teyunai-clock-ticks"></div><i class="ty-hour"></i><i class="ty-minute"></i><i class="ty-second"></i><b></b></div>';
    footer.prepend(clock);
    for (let i=0;i<60;i++) {
      const tick=document.createElement("span");
      tick.className=i%5===0?"major":"minor";
      tick.style.transform=`translateX(-50%) rotate(${i*6}deg)`;
      clock.querySelector(".teyunai-clock-ticks").append(tick);
    }
    const h=$(".ty-hour",clock),m=$(".ty-minute",clock),s=$(".ty-second",clock);
    const update=()=>{
      const d=new Date(), sec=d.getSeconds(), min=d.getMinutes(), hour=d.getHours()%12;
      h.style.transform=`translateX(-50%) rotate(${hour*30+min*.5}deg)`;
      m.style.transform=`translateX(-50%) rotate(${min*6+sec*.1}deg)`;
      s.style.transform=`translateX(-50%) rotate(${sec*6}deg)`;
    };
    update(); window.setInterval(update,1000);
  }

  // Hide the original long-form current-location text from any prior patch.
  $("#teyunaiCurrentLocation")?.remove();

  // Make the menu's information destination meaningful without inventing legal claims.
  const steps = $(".how-section");
  if (steps) steps.id = "information";
  const finePrint = $(".fine-print");
  if (finePrint) finePrint.id = "sources";
})();
