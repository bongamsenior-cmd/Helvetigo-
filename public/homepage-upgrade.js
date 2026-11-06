(() => {
  "use strict";
  const $ = (s, root=document) => root.querySelector(s);

  // Load only this clean stylesheet. This script deliberately does not create,
  // move, duplicate, or replace the existing language selector or header menu.
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = "./homepage-upgrade.css";
  document.head.append(css);

  const form = $("#searchForm");
  const from = $("#from");
  const to = $("#to");
  if (form && from && to) {
    const dateField = $("#date")?.closest(".field");
    const modeField = $("#mode")?.closest(".field");
    const submit = form.querySelector('button[type="submit"]');
    const fromField = from.closest(".field");

    // Current location is a discreet action directly beneath the origin field.
    let locationButton = $("#teyunaiCurrentLocation");
    if (!locationButton) {
      locationButton = document.createElement("button");
      locationButton.type = "button";
      locationButton.id = "teyunaiCurrentLocation";
      locationButton.className = "teyunai-current-location";
      locationButton.innerHTML = '<span aria-hidden="true">◎</span><span>Use my current location</span>';
      fromField.append(locationButton);
    }

    // Keep the initial search deliberately simple; reveal date, mode and Search
    // only after both locations have been entered.
    function refreshSearch() {
      const expanded = from.value.trim().length > 1 && to.value.trim().length > 1;
      form.classList.toggle("teyunai-search-expanded", expanded);
      [dateField, modeField, submit].forEach(el => {
        if (el) el.hidden = !expanded;
      });
    }
    ["input", "change"].forEach(type => {
      from.addEventListener(type, refreshSearch);
      to.addEventListener(type, refreshSearch);
    });
    refreshSearch();

    locationButton.addEventListener("click", () => {
      const label = locationButton.querySelector("span:last-child");
      if (!navigator.geolocation) {
        label.textContent = "Location unavailable — enter a city";
        return;
      }
      locationButton.disabled = true;
      label.textContent = "Finding your location…";
      navigator.geolocation.getCurrentPosition(async position => {
        const { latitude, longitude } = position.coords;
        try {
          const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
          const response = await fetch(url);
          if (!response.ok) throw new Error("Reverse geocoding unavailable");
          const result = await response.json();
          const a = result.address || {};
          from.value = a.city || a.town || a.village || a.municipality || a.county || result.name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        } catch (_) {
          from.value = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        }
        from.dispatchEvent(new Event("input", { bubbles: true }));
        label.textContent = "Current location added";
        locationButton.disabled = false;
      }, () => {
        label.textContent = "Location unavailable — enter a city";
        locationButton.disabled = false;
      }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 });
    });
  }

  // Representative transport photography. Cards remain real links/content in
  // the original HTML; photos are decorative and do not replace brand names.
  const photoSources = {
    Train: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1000&q=85",
    Bus: "./assets/flixbus-coach.png",
    "VTC / taxi": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1000&q=85",
    Covoiturage: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1000&q=85"
  };
  $$(".provider").forEach(card => {
    const mode = card.dataset.mode;
    const src = photoSources[mode];
    if (!src || card.querySelector(".provider-photo")) return;
    const image = document.createElement("img");
    image.className = "provider-photo";
    image.src = src;
    image.alt = mode === "Bus" ? "FlixBus coach" : "";
    image.loading = "lazy";
    image.decoding = "async";
    image.setAttribute("aria-hidden", mode === "Bus" ? "false" : "true");
    card.prepend(image);
  });

  // Embed the approved goddess artwork directly into the existing footer.
  // No extra image section is created.
  const footer = $("footer.footer");
  if (footer) {
    footer.classList.add("teyunai-art-footer");
    if (!$("#teyunaiSbbClock")) {
      const clock = document.createElement("div");
      clock.id = "teyunaiSbbClock";
      clock.className = "teyunai-sbb-clock";
      clock.setAttribute("role", "img");
      clock.setAttribute("aria-label", "Analogue clock showing local time");
      clock.innerHTML = '<div class="sbb-face"><div class="sbb-marks"></div><span class="sbb-hand sbb-hour"></span><span class="sbb-hand sbb-minute"></span><span class="sbb-hand sbb-second"></span><span class="sbb-pin"></span></div>';
      footer.prepend(clock);
      const marks = clock.querySelector(".sbb-marks");
      for (let i = 0; i < 60; i++) {
        const mark = document.createElement("i");
        mark.className = i % 5 === 0 ? "major" : "minor";
        mark.style.transform = `translateX(-50%) rotate(${i * 6}deg)`;
        marks.append(mark);
      }
      const hour = clock.querySelector(".sbb-hour");
      const minute = clock.querySelector(".sbb-minute");
      const second = clock.querySelector(".sbb-second");
      const update = () => {
        const d = new Date();
        const s = d.getSeconds(), m = d.getMinutes(), h = d.getHours() % 12;
        hour.style.transform = `translateX(-50%) rotate(${h * 30 + m * .5}deg)`;
        minute.style.transform = `translateX(-50%) rotate(${m * 6 + s * .1}deg)`;
        second.style.transform = `translateX(-50%) rotate(${s * 6}deg)`;
      };
      update();
      window.setInterval(update, 1000);
    }
  }

  // Keep the original language and menu event handlers in app.js authoritative.
  // Add no second language toggle and no second menu button.
})();
