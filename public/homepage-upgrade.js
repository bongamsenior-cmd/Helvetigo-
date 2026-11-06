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


  // Progressive search: begin with just From/To; reveal date, time and mode after both cities are entered.
  const searchForm=$("#searchForm");
  if(searchForm && $("#from") && $("#to")){
    $("#tripType")?.closest(".field")?.remove();
    $("#multiStops")?.remove();
    const from=$("#from"), to=$("#to");
    const fromField=from.closest(".field"), toField=to.closest(".field");
    const dateField=$("#date")?.closest(".field"), modeField=$("#mode")?.closest(".field");
    const searchButton=searchForm.querySelector('button[type="submit"],input[type="submit"]');
    const options=document.createElement("div");
    options.className="teyunai-search-options";
    options.id="teyunaiSearchOptions";
    if(dateField) options.append(dateField);
    if(modeField) options.append(modeField);
    const timeField=document.createElement("div");
    timeField.className="field";
    timeField.innerHTML='<label for="teyunaiDepartureTime">Departure time</label><div class="input-with-icon"><span>◷</span><input id="teyunaiDepartureTime" type="time" value="08:00"></div>';
    options.append(timeField);
    if(searchButton) options.append(searchButton);
    searchForm.append(options);
    options.hidden=true;
    const quick=document.createElement("button");
    quick.type="button"; quick.className="teyunai-current-location";
    quick.innerHTML='<span aria-hidden="true">◎</span><span>Use my current location</span>';
    fromField.append(quick);
    const swap=document.createElement("button");
    swap.type="button"; swap.className="teyunai-swap-locations";
    swap.setAttribute("aria-label","Swap departure and destination");
    swap.textContent="⇅";
    toField.append(swap);
    swap.addEventListener("click",()=>{const v=from.value;from.value=to.value;to.value=v;refresh();});
    function refresh(){
      const ready=from.value.trim().length>1 && to.value.trim().length>1;
      options.hidden=!ready;
      searchForm.classList.toggle("teyunai-search-expanded",ready);
    }
    from.addEventListener("input",refresh); to.addEventListener("input",refresh);
    from.addEventListener("change",refresh);to.addEventListener("change",refresh);
    refresh();
    quick.addEventListener("click",()=>{
      if(!navigator.geolocation){quick.lastChild.textContent="Location unavailable — enter a city";return;}
      quick.disabled=true;quick.lastChild.textContent="Finding your location…";
      navigator.geolocation.getCurrentPosition(async pos=>{
        try{
          const {latitude,longitude}=pos.coords;
          const response=await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
          if(!response.ok)throw new Error("geocoder");
          const data=await response.json();
          const a=data.address||{};
          from.value=a.city||a.town||a.village||a.municipality||a.county||data.name||`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          refresh();quick.lastChild.textContent="Current location added";
        }catch(_){from.value=`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;refresh();quick.lastChild.textContent="Location added";}
        quick.disabled=false;
      },()=>{
        quick.disabled=false;quick.lastChild.textContent="Location unavailable — enter a city";
      },{enableHighAccuracy:true,timeout:12000,maximumAge:60000});
    });
  }

  const footer = $("footer.footer");
  if (footer && !footer.id) footer.id="footer";
  if (footer) {
    footer.classList.add("teyunai-goddess-footer");
    footer.style.setProperty("--teyunai-footer-art", 'url("./assets/teyunai-goddess-sisters-travel.png")');
    if (!$("#teyunaiTickClock")) {
      const clock=document.createElement("div");
      clock.id="teyunaiTickClock";
      clock.className="teyunai-tick-clock";
      clock.setAttribute("role","img");
      clock.setAttribute("aria-label","Analogue clock showing local time");
      clock.innerHTML='<div class="tick-clock-face"><div class="tick-clock-marks" aria-hidden="true"></div><span class="tick-hand tick-hour"></span><span class="tick-hand tick-minute"></span><span class="tick-hand tick-second"></span><span class="tick-clock-pin"></span></div>';
      footer.append(clock);
      const marks=clock.querySelector(".tick-clock-marks");
      for(let i=0;i<60;i++){const mark=document.createElement("i");mark.className=i%5===0?"major":"minor";mark.style.transform=`translateX(-50%) rotate(${i*6}deg)`;marks.append(mark);}
      const hour=clock.querySelector(".tick-hour"),minute=clock.querySelector(".tick-minute"),second=clock.querySelector(".tick-second");
      const updateClock=()=>{
        const now=new Date(),sec=now.getSeconds(),mins=now.getMinutes(),hrs=now.getHours()%12;
        hour.style.transform=`translateX(-50%) rotate(${hrs*30+mins*.5}deg)`;
        minute.style.transform=`translateX(-50%) rotate(${mins*6+sec*.1}deg)`;
        second.style.transform=`translateX(-50%) rotate(${sec*6}deg)`;
      };
      updateClock();window.setInterval(updateClock,1000);
    }
    if ("IntersectionObserver" in window) {
      const reveal = new IntersectionObserver((entries) => {
        if (entries.some(entry => entry.isIntersecting)) {
          footer.classList.add("teyunai-art-revealed");
          reveal.disconnect();
        }
      }, { threshold: 0.08, rootMargin: "0px 0px 12% 0px" });
      reveal.observe(footer);
    } else {
      footer.classList.add("teyunai-art-revealed");
    }
  }



  // Clean navigation: retain language controls, move all other navigation into one compact menu.
  const headerClean=$("header");
  if(headerClean){
    const navClean=$("nav",headerClean);
    if(navClean){
      navClean.querySelectorAll("a").forEach(a=>a.remove());
      navClean.querySelectorAll("[id*=Clock],.teyunai-header-clock").forEach(e=>e.remove());
    }
    $("#teyunaiHeaderClock")?.remove();
    $("#teyunaiMapPanel")?.remove();
    const oldMenu=$("#teyunaiDiscoverMenu"); if(oldMenu) oldMenu.remove();
    const menu=document.createElement("div");
    menu.id="teyunaiDiscoverMenu"; menu.className="teyunai-discover-menu";
    menu.innerHTML=`<button type="button" class="discover-trigger" id="discoverTrigger" aria-expanded="false" aria-controls="discoverPanel"><span class="menu-lines">☰</span><span class="discover-label">Menu</span></button><div class="discover-panel" id="discoverPanel" hidden><a href="#">Home</a><a href="#destinations">Discover destinations</a><a href="#searchForm" data-menu-search>Search journeys　⌕</a><a href="#footer">Contact & information</a></div>`;
    headerClean.append(menu);
    const trigger=$("#discoverTrigger"), panel=$("#discoverPanel");
    trigger.addEventListener("click",()=>{const open=trigger.getAttribute("aria-expanded")!=="true";trigger.setAttribute("aria-expanded",String(open));panel.hidden=!open;});
    panel.addEventListener("click",event=>{if(event.target.closest("a")){panel.hidden=true;trigger.setAttribute("aria-expanded","false");}});
    document.addEventListener("click",event=>{if(!menu.contains(event.target)){panel.hidden=true;trigger.setAttribute("aria-expanded","false");}});
  }

  // Make service shortcuts feel more editorial and polished.
  const shortcutIcons={train:"🚆",bus:"🚌",metro:"🚋",driver:"🚘",taxi:"🚘",carpool:"👥",mobility:"🚲",stay:"🛏️",hotel:"🏨"};
  document.querySelectorAll(".transport-shortcuts a,.transport-shortcuts button,.transport-grid a,.transport-grid button,.transport-card").forEach(card=>{
    const txt=(card.textContent||"").toLowerCase();
    const key=Object.keys(shortcutIcons).find(k=>txt.includes(k));
    if(key){card.classList.add("teyunai-service-shortcut");}
  });

  // Add real representative operator photography to provider cards where a provider is named.
  function decorateProviderCards(){
    const candidates=document.querySelectorAll(".provider-card,.provider-item,.operator-card,.provider-list a,.provider-list article,.provider");
    candidates.forEach(card=>{
      if(card.dataset.teyunaiPhoto)return;
      const text=(card.textContent||"").toLowerCase();
      if(text.includes("flixbus")){
        card.dataset.teyunaiPhoto="flixbus";
        const img=document.createElement("img");img.className="provider-photo";img.src="./assets/flixbus-coach.png";img.alt="FlixBus coach";
        card.prepend(img);
      }
    });
  }
  decorateProviderCards();
  const providerObserver=new MutationObserver(decorateProviderCards);
  providerObserver.observe(document.body,{childList:true,subtree:true});

  // Re-apply translated labels when the existing language selector changes.
  
})();
