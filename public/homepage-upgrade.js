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
    const locationBtn=document.createElement("button"); locationBtn.type="button"; locationBtn.className="location-action"; locationBtn.textContent="⌖ "+t("location"); $("#from").closest(".field").append(locationBtn);
    locationBtn.addEventListener("click",()=>{
      if(!navigator.geolocation){locationBtn.textContent=t("locationDenied");return;}
      locationBtn.disabled=true;
      navigator.geolocation.getCurrentPosition(async pos=>{
        try{
          const url=`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`;
          const r=await fetch(url,{headers:{Accept:"application/json"}}); const data=await r.json();
          const a=data.address||{}; $("#from").value=[a.city||a.town||a.village||a.municipality,a.country].filter(Boolean).join(", ") || `${pos.coords.latitude.toFixed(4)},${pos.coords.longitude.toFixed(4)}`;
        }catch{locationBtn.textContent=t("locationDenied");}
        locationBtn.disabled=false;
      },()=>{locationBtn.textContent=t("locationDenied");locationBtn.disabled=false;},{enableHighAccuracy:false,timeout:10000,maximumAge:300000});
    });
  }

  const footer = $("footer.footer");
  if (footer && !$(".teyunai-signature")) {
    const signature = document.createElement("section");
    signature.className = "teyunai-signature";
    signature.setAttribute("aria-label", "TEYUNAI signature");
    signature.innerHTML = '<img src="./assets/teyunai-goddess-sisters-travel.png" alt="Les deux déesses sœurs TEYUNAI, la lune, les voyages en avion et en train, et un hôtel">';
    footer.before(signature);
  }

  const tools=document.createElement("section"); tools.className="container teyunai-tools";
  tools.innerHTML=`<div class="clock-card"><div><p class="eyebrow dark">${t("clock")}</p><strong id="genevaDigital"></strong></div><div class="analog-clock" role="img" aria-label="${t("clock")}"><div class="clock-face"><span class="clock-number n12">12</span><span class="clock-number n3">3</span><span class="clock-number n6">6</span><span class="clock-number n9">9</span><i class="hand hour" id="clockHour"></i><i class="hand minute" id="clockMinute"></i><i class="hand second" id="clockSecond"></i><span class="clock-center">✧</span></div></div></div><div class="coverage-card"><div class="coverage-heading"><div><p class="eyebrow dark">${t("map")}</p><h2>Europe</h2></div><span class="coverage-live">● ${t("live")}</span></div><p class="coverage-note">${t("mapNote")}</p><div id="teyunaiMap" aria-label="${t("map")}"></div><div class="map-legend"><span>● ${t("mapSwiss")}</span><span>○ ${t("planned")}</span></div></div>`;
  const dashboard=$("#transports");
  if(dashboard && !$("#teyunaiMap")) dashboard.after(tools);
  function tick(){
    const now=new Date(), parts=new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Zurich",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false}).formatToParts(now);
    const p=Object.fromEntries(parts.map(x=>[x.type,x.value])); const h=+p.hour,m=+p.minute,s=+p.second;
    const set=(id,deg)=>{const el=$("#"+id);if(el)el.style.transform=`translateX(-50%) rotate(${deg}deg)`};
    set("clockHour",(h%12)*30+m*.5);set("clockMinute",m*6+s*.1);set("clockSecond",s*6);
    const digital=$("#genevaDigital"); if(digital)digital.textContent=`${p.hour}:${p.minute}:${p.second}`;
  }
  tick(); setInterval(tick,1000);

  if($("#teyunaiMap") && !window.L){
    const leaflet=document.createElement("link");leaflet.rel="stylesheet";leaflet.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";document.head.append(leaflet);
    const script=document.createElement("script");script.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";script.onload=initMap;document.head.append(script);
  } else if(window.L) initMap();
  function initMap(){
    if(!window.L || $("#teyunaiMap").dataset.ready)return;
    $("#teyunaiMap").dataset.ready="1";
    const map=L.map("teyunaiMap",{scrollWheelZoom:false}).setView([46.8,8.2],6);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:18,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
    const cities=[["Genève",46.2044,6.1432],["Lausanne",46.5197,6.6323],["Zurich",47.3769,8.5417],["Berne",46.948,7.4474],["Bâle",47.5596,7.5886]];
    cities.forEach(([name,lat,lon])=>L.circleMarker([lat,lon],{radius:7,color:"#9b7946",fillColor:"#cdb78e",fillOpacity:.95,weight:2}).addTo(map).bindPopup(`<strong>${name}</strong><br>${t("mapSwiss")}`));
  }
  // Re-apply translated labels when the existing language selector changes.
  document.querySelectorAll(".language-menu [data-lang]").forEach(b=>b.addEventListener("click",()=>setTimeout(()=>location.reload(),0)));
})();
