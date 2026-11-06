(() => {
  "use strict";
  const $ = (s, root=document) => root.querySelector(s);
  const lang = () => localStorage.getItem("teyunai-language") || localStorage.getItem("language") || "fr";
  const words = {
    fr:{trip:"Type de voyage",one:"Aller simple",return:"Aller-retour",multi:"Multi-destinations",returnDate:"Date de retour",add:"Ajouter une étape",remove:"Retirer",clock:"Heure de Genève",map:"Couverture transport vérifiée",mapNote:"Horaires publics suisses actuellement intégrés. Les autres régions seront ajoutées après validation des fournisseurs.",location:"Utiliser ma position",locationDenied:"Position indisponible. Vous pouvez saisir votre ville manuellement.",live:"En direct",planned:"Couverture à venir",mapSwiss:"Réseau de transports publics suisse"},
    en:{trip:"Journey type",one:"One way",return:"Return",multi:"Multi-city",returnDate:"Return date",add:"Add destination",remove:"Remove",clock:"Geneva time",map:"Verified transport coverage",mapNote:"Swiss public transport timetables are currently integrated. Other regions will be added after provider verification.",location:"Use my location",locationDenied:"Location unavailable. You can enter your city manually.",live:"Live",planned:"Coming soon",mapSwiss:"Swiss public transport network"},
    de:{trip:"Reiseart",one:"Einfache Fahrt",return:"Hin und zurück",multi:"Mehrere Ziele",returnDate:"Rückreisedatum",add:"Ziel hinzufügen",remove:"Entfernen",clock:"Genfer Zeit",map:"Bestätigte Verkehrsabdeckung",mapNote:"Derzeit sind Schweizer Fahrplandaten integriert. Weitere Regionen folgen nach Prüfung der Anbieter.",location:"Meinen Standort verwenden",locationDenied:"Standort nicht verfügbar. Sie können Ihre Stadt manuell eingeben.",live:"Live",planned:"Demnächst",mapSwiss:"Schweizer öffentlicher Verkehr"},
    it:{trip:"Tipo di viaggio",one:"Solo andata",return:"Andata e ritorno",multi:"Più destinazioni",returnDate:"Data di ritorno",add:"Aggiungi destinazione",remove:"Rimuovi",clock:"Ora di Ginevra",map:"Copertura trasporti verificata",mapNote:"Al momento sono integrati gli orari dei trasporti pubblici svizzeri. Altre regioni saranno aggiunte dopo la verifica dei fornitori.",location:"Usa la mia posizione",locationDenied:"Posizione non disponibile. Puoi inserire la città manualmente.",live:"Live",planned:"In arrivo",mapSwiss:"Rete dei trasporti pubblici svizzeri"},
    ja:{trip:"旅行タイプ",one:"片道",return:"往復",multi:"複数都市",returnDate:"帰着日",add:"目的地を追加",remove:"削除",clock:"ジュネーブの時刻",map:"確認済み交通カバーエリア",mapNote:"現在、スイスの公共交通時刻表を統合しています。他の地域は事業者の確認後に追加します。",location:"現在地を使用",locationDenied:"位置情報を取得できません。都市名を手入力できます。",live:"運行データ",planned:"今後対応",mapSwiss:"スイス公共交通ネットワーク"},
    es:{trip:"Tipo de viaje",one:"Solo ida",return:"Ida y vuelta",multi:"Varias ciudades",returnDate:"Fecha de regreso",add:"Añadir destino",remove:"Eliminar",clock:"Hora de Ginebra",map:"Cobertura de transporte verificada",mapNote:"Actualmente están integrados los horarios del transporte público suizo. Otras regiones se añadirán tras verificar los proveedores.",location:"Usar mi ubicación",locationDenied:"Ubicación no disponible. Puedes introducir la ciudad manualmente.",live:"En directo",planned:"Próximamente",mapSwiss:"Red de transporte público suiza"},
    zh:{trip:"行程类型",one:"单程",return:"往返",multi:"多城市",returnDate:"返程日期",add:"添加目的地",remove:"删除",clock:"日内瓦时间",map:"已验证的交通覆盖范围",mapNote:"目前已接入瑞士公共交通时刻表。其他地区将在供应商验证后添加。",location:"使用我的位置",locationDenied:"无法获取位置。您可以手动输入城市。",live:"实时",planned:"即将推出",mapSwiss:"瑞士公共交通网络"}
  };
  const t = k => (words[lang()] || words.fr)[k] || words.fr[k] || k;
  const style = document.createElement("link"); style.rel="stylesheet"; style.href="./homepage-upgrade.css"; document.head.append(style);

  const form = $("#searchForm");
  if (form && !$("#tripType")) {
    const trip = document.createElement("div");
    trip.className="field trip-type-field";
    trip.innerHTML=`<label for="tripType">${t("trip")}</label><div class="input-with-icon"><span>↔</span><select id="tripType"><option value="one">${t("one")}</option><option value="return">${t("return")}</option><option value="multi">${t("multi")}</option></select></div>`;
    form.prepend(trip);
    const toField = $("#to").closest(".field");
    const extra = document.createElement("div"); extra.id="multiStops"; extra.className="multi-stops"; extra.hidden=true;
    extra.innerHTML=`<div class="field"><label>${t("returnDate")}</label><div class="input-with-icon"><span>▦</span><input id="returnDate" type="date"></div></div><div id="extraDestinations"></div><button type="button" class="secondary-action" id="addDestination">＋ ${t("add")}</button>`;
    toField.after(extra);
    const tripSelect=$("#tripType"), returnDate=$("#returnDate"), extras=$("#extraDestinations");
    function syncTrip(){
      const v=tripSelect.value;
      extra.hidden=v==="one";
      returnDate.closest(".field").hidden=v!=="return";
      $("#addDestination").hidden=v!=="multi";
      if(v!=="multi") extras.innerHTML="";
      if(v==="multi" && !extras.children.length) addStop();
    }
    function addStop(){
      const row=document.createElement("div"); row.className="field extra-destination";
      row.innerHTML=`<label>${t("multi")}</label><div class="input-with-icon"><span>⌖</span><input type="text" maxlength="120" placeholder="City, country"><button type="button" aria-label="${t("remove")}">×</button></div>`;
      row.querySelector("button").addEventListener("click",()=>row.remove()); extras.append(row);
    }
    tripSelect.addEventListener("change",syncTrip);
    $("#addDestination").addEventListener("click",addStop);
    syncTrip();

  }

  const footer = $("footer.footer");
  if (footer && !$(".teyunai-signature")) {
    const signature = document.createElement("section");
    signature.className = "teyunai-signature";
    signature.setAttribute("aria-label", "TEYUNAI signature");
    signature.innerHTML = '<img src="./assets/teyunai-goddess-sisters-travel.png" alt="Les deux déesses sœurs TEYUNAI, la lune, les voyages en avion et en train, et un hôtel">';
    footer.before(signature);
  }


  // Compact Geneva clock integrated into the site header, not a separate column.
  const header = $("header");
  if (header && !$("#teyunaiHeaderClock")) {
    const chip = document.createElement("div");
    chip.id = "teyunaiHeaderClock";
    chip.className = "teyunai-header-clock";
    chip.innerHTML = `<div class="mini-clock"><span class="mini-hand mini-hour" id="clockHour"></span><span class="mini-hand mini-minute" id="clockMinute"></span><span class="mini-clock-center">✦</span></div><div class="clock-copy"><span>${t("clock")}</span><strong id="genevaDigital"></strong></div>`;
    const nav = $("nav", header) || header;
    nav.append(chip);
  }

  // Dark interactive map sits directly between the search form and search results.
  const formEl = $("#searchForm");
  if (formEl && !$("#teyunaiMapPanel")) {
    const panel = document.createElement("section");
    panel.id = "teyunaiMapPanel";
    panel.className = "teyunai-map-panel container";
    panel.innerHTML = `<div class="map-topline"><div><p class="eyebrow">${t("map")}</p><h2>Explore with TEYUNAI</h2><p class="map-subtitle">${t("mapNote")}</p></div><span class="map-live"><i></i>${t("live")}</span></div><div class="map-stage"><div id="teyunaiMap" aria-label="${t("map")}"></div><button type="button" class="map-locate" id="mapLocate" aria-label="${t("location")}">⌖ <span>${t("location")}</span></button><div class="teyunai-compass" aria-label="Compass"><span class="compass-n">N</span><span class="compass-star">✦</span><span class="compass-s">S</span><span class="compass-e">E</span><span class="compass-w">W</span></div><div class="map-status" id="mapStatus">Swiss network reference points · Live location off</div></div><div class="map-legend"><span><i class="legend-dot covered"></i>${t("mapSwiss")}</span><span><i class="legend-dot user"></i>${t("location")}</span><span><i class="legend-dot future"></i>${t("planned")}</span></div></section>`;
    formEl.after(panel);
  }

  function tick(){
    const now=new Date(), parts=new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Zurich",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false}).formatToParts(now);
    const p=Object.fromEntries(parts.map(x=>[x.type,x.value])); const h=+p.hour,m=+p.minute,s=+p.second;
    const set=(id,deg)=>{const el=$("#"+id);if(el)el.style.transform=`translateX(-50%) rotate(${deg}deg)`};
    set("clockHour",(h%12)*30+m*.5);set("clockMinute",m*6+s*.1);
    const digital=$("#genevaDigital"); if(digital)digital.textContent=`${p.hour}:${p.minute}`;
  }
  tick(); setInterval(tick,1000);

  function initMap(){
    const mapEl=$("#teyunaiMap");
    if(!window.L || !mapEl || mapEl.dataset.ready)return;
    mapEl.dataset.ready="1";
    const map=L.map("teyunaiMap",{scrollWheelZoom:false,zoomControl:false}).setView([46.8,8.2],7);
    L.control.zoom({position:"bottomleft"}).addTo(map);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",{subdomains:"abcd",maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'}).addTo(map);
    const cities=[["Genève",46.2044,6.1432],["Lausanne",46.5197,6.6323],["Zurich",47.3769,8.5417],["Berne",46.948,7.4474],["Bâle",47.5596,7.5886]];
    cities.forEach(([name,lat,lon])=>L.circleMarker([lat,lon],{radius:6,color:"#e3c68f",fillColor:"#cdb78e",fillOpacity:.95,weight:2}).addTo(map).bindPopup(`<strong>${name}</strong><br>${t("mapSwiss")}`));

    // Browser geolocation is requested only after an explicit tap. watchPosition updates the marker as the device moves.
    let userMarker=null, accuracyCircle=null, watchId=null, follow=true;
    const status=$("#mapStatus"), locate=$("#mapLocate");
    const userIcon=L.divIcon({className:"",html:'<div class="user-location-pulse"><span></span></div>',iconSize:[28,28],iconAnchor:[14,14]});
    function startTracking(){
      if(!navigator.geolocation){if(status)status.textContent=t("locationDenied");return;}
      if(locate){locate.disabled=true;locate.classList.add("is-active");}
      if(status)status.textContent="Requesting location permission…";
      watchId=navigator.geolocation.watchPosition(pos=>{
        const lat=pos.coords.latitude,lon=pos.coords.longitude,accuracy=pos.coords.accuracy||40,point=[lat,lon];
        if(!userMarker)userMarker=L.marker(point,{icon:userIcon,zIndexOffset:1000}).addTo(map).bindPopup("Your current location");
        else userMarker.setLatLng(point);
        if(!accuracyCircle)accuracyCircle=L.circle(point,{radius:accuracy,color:"#7db7e8",weight:1,fillColor:"#2588d8",fillOpacity:.16}).addTo(map);
        else accuracyCircle.setLatLng(point).setRadius(accuracy);
        if(follow)map.setView(point,Math.max(map.getZoom(),15),{animate:true});
        if(status)status.textContent=`Live location · accuracy about ${Math.round(accuracy)} m`;
        if(locate){locate.disabled=false;locate.classList.add("is-active");locate.querySelector("span").textContent="Location active";}
        // Populate the departure field with coordinates; reverse geocoding is deliberately not required for map tracking.
        const from=$("#from"); if(from && !from.value.trim()) from.value=`${lat.toFixed(5)}, ${lon.toFixed(5)}`;
      },err=>{
        if(status)status.textContent=err.code===1?"Location permission denied. Enter your departure city manually.":"Location unavailable. Try again or enter your city manually.";
        if(locate){locate.disabled=false;locate.classList.remove("is-active");}
      },{enableHighAccuracy:true,timeout:15000,maximumAge:5000});
    }
    locate?.addEventListener("click",startTracking);
    map.on("dragstart",()=>{follow=false;if(status)status.textContent="Map browsing · tap location to follow you";});
  }
  if($("#teyunaiMap")){
    const leaflet=document.createElement("link");leaflet.rel="stylesheet";leaflet.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";document.head.append(leaflet);
    if(window.L)initMap();
    else {const script=document.createElement("script");script.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";script.onload=initMap;document.head.append(script);}
  }
  // Re-apply translated labels when the existing language selector changes.
  
})();
