/* TEYUNAI localization extension.
   Loaded after app.js. Extends its existing translation dictionaries without
   replacing the search, navigation, or other application logic. */
(() => {
  const extra = {
    fr: {
      city_geneva:"Genève", city_paris:"Paris", city_munich:"Munich",
      swiss_cities:"Genève · Lausanne · Zurich",
      france_cities:"Paris · Lyon · Annecy",
      germany_cities:"Munich · Stuttgart",
      coverage_cities:"Genève, Lausanne, Zurich, Paris, Lyon, Annecy, Munich, Stuttgart"
    },
    en: {
      city_geneva:"Geneva", city_paris:"Paris", city_munich:"Munich",
      swiss_cities:"Geneva · Lausanne · Zurich",
      france_cities:"Paris · Lyon · Annecy",
      germany_cities:"Munich · Stuttgart",
      coverage_cities:"Geneva, Lausanne, Zurich, Paris, Lyon, Annecy, Munich, Stuttgart"
    },
    de: {
      city_geneva:"Genf", city_paris:"Paris", city_munich:"München",
      swiss_cities:"Genf · Lausanne · Zürich",
      france_cities:"Paris · Lyon · Annecy",
      germany_cities:"München · Stuttgart",
      coverage_cities:"Genf, Lausanne, Zürich, Paris, Lyon, Annecy, München, Stuttgart"
    },
    it: {
      city_geneva:"Ginevra", city_paris:"Parigi", city_munich:"Monaco di Baviera",
      swiss_cities:"Ginevra · Losanna · Zurigo",
      france_cities:"Parigi · Lione · Annecy",
      germany_cities:"Monaco di Baviera · Stoccarda",
      coverage_cities:"Ginevra, Losanna, Zurigo, Parigi, Lione, Annecy, Monaco di Baviera, Stoccarda"
    },
    ja: {
      city_geneva:"ジュネーブ", city_paris:"パリ", city_munich:"ミュンヘン",
      swiss_cities:"ジュネーブ · ローザンヌ · チューリッヒ",
      france_cities:"パリ · リヨン · アヌシー",
      germany_cities:"ミュンヘン · シュトゥットガルト",
      coverage_cities:"ジュネーブ、ローザンヌ、チューリッヒ、パリ、リヨン、アヌシー、ミュンヘン、シュトゥットガルト"
    },
    es: {
      tagline:"Viajar, con elegancia.", nav_home:"Inicio", nav_routes:"Rutas", nav_stays:"Alojamientos", nav_taxis:"Conductores y taxis", nav_discover:"Descubrir",
      eyebrow:"VIAJAR SIN FRONTERAS", hero_title:'Viaja más lejos,<br><span>con elegancia.</span>', hero_copy:"Compara trenes, autobuses, conductores privados y alojamientos para crear un viaje a tu medida.", hero_note:"Europa, a tu ritmo.",
      from_label:"Salida", to_label:"Destino", date_label:"Fecha", mode_label:"Transporte", all:"Todos", train:"Tren", bus:"Autobús", taxi:"Conductor / taxi", carpool:"Viaje compartido", search:"Buscar", disclaimer:"Los precios y la disponibilidad deben confirmarse con los proveedores.",
      bus_short:"Autobuses y autocares", metro:"Metro y tranvía", taxi_short:"Conductores y taxis", soft_mobility:"Movilidad sostenible", stays:"Alojamientos", compare:"ELIGE CON CONFIANZA", options_title:"Tus opciones de viaje", options_sub:"Explora los operadores disponibles para tu ruta.", operator_links:"Enlaces de operadores",
      rail_title:"Tren", rail_desc:"Horarios y conexiones según la ruta", price_check:"Consultar precio", view_options:"Ver opciones", bus_desc:"Consulta las paradas y los horarios disponibles", taxi_desc:"Disponibilidad según la ciudad y la hora", carpool_desc:"Consulta los trayectos ofrecidos por los conductores", fine_print:"Los precios y la disponibilidad aún no están conectados con todos los proveedores. Comprueba los detalles antes de comprar.",
      stays_title:"Hoteles y alojamientos", geneva_desc:"Lago, centro y estación", paris_desc:"Cultura y barrios históricos", munich_desc:"Centro y conexiones de transporte", discover_stays:"Descubrir alojamientos →", drivers_title:"Conductores y taxis", view_all:"Ver todo →", local_taxis:"Taxis locales", coverage_title:"Ciudades cubiertas",
      inspiration:"LA INSPIRACIÓN TE ESPERA", dest_title:"Descubre Europa", dest_sub:"Ciudades emblemáticas y experiencias únicas.", switzerland:"Suiza", france:"Francia", germany:"Alemania", simple:"SENCILLO Y TRANSPARENTE", steps_title:"Un viaje más fácil en tres pasos", step1_title:"Imagina tu ruta", step1_desc:"Indica tu salida, destino, fecha y medio de transporte.", step2_title:"Explora las posibilidades", step2_desc:"Consulta los operadores adecuados y compara las opciones.", step3_title:"Reserva con el proveedor", step3_desc:"Comprueba el precio, la disponibilidad y las condiciones en la web oficial.",
      footer_line:"Viajar, con elegancia.", data_sources:"Fuentes de datos", contact:"Contacto", prototype:"Prototipo — las reservas y los pagos directos no están disponibles",
      loading:"Buscando…", loading_desc:"Recuperando horarios y enlaces de proveedores.", date_word:"Fecha", category:"Categoría", no_providers:"No se encontraron operadores para esta categoría.", operators:"Sitios web de operadores", no_time:"Hora no indicada", duration_unknown:"Duración no indicada", train_results:"Horarios del transporte público suizo", api_note:"Resultados proporcionados por la API suiza. Aquí no se muestran los precios de los billetes.", route_notice:"Los horarios proceden de la API del transporte público suizo. Comprueba los detalles antes de salir.", departure:"Salida:", arrival:"Llegada:", duration:"Duración:", services:"Servicios:", steps:"Ver detalles del trayecto", price:"Precio:", not_provided:"no proporcionado por esta API", check_sbb:"Consultar trayecto en SBB / CFF ↗", search_error:"No se pudo completar la búsqueda", retry:"Comprueba tu conexión e inténtalo de nuevo.", default_departure:"Salida", default_arrival:"Llegada", searching:"Buscando…",
      city_geneva:"Ginebra", city_paris:"París", city_munich:"Múnich", swiss_cities:"Ginebra · Lausana · Zúrich", france_cities:"París · Lyon · Annecy", germany_cities:"Múnich · Stuttgart", coverage_cities:"Ginebra, Lausana, Zúrich, París, Lyon, Annecy, Múnich, Stuttgart"
    },
    zh: {
      tagline:"优雅出行。", nav_home:"首页", nav_routes:"行程", nav_stays:"住宿", nav_taxis:"专车与出租车", nav_discover:"探索",
      eyebrow:"畅行无界", hero_title:'探索更远，<br><span>优雅出行。</span>', hero_copy:"比较火车、巴士、私人接送和住宿，规划属于自己的旅程。", hero_note:"按照自己的节奏探索欧洲。",
      from_label:"出发地", to_label:"目的地", date_label:"日期", mode_label:"交通方式", all:"全部", train:"火车", bus:"巴士", taxi:"专车 / 出租车", carpool:"拼车", search:"搜索", disclaimer:"价格和余位请以服务供应商确认为准。",
      bus_short:"巴士与长途客车", metro:"地铁与电车", taxi_short:"专车与出租车", soft_mobility:"绿色出行", stays:"住宿", compare:"安心选择", options_title:"您的出行选择", options_sub:"探索适合您路线的服务运营商。", operator_links:"运营商链接",
      rail_title:"火车", rail_desc:"时刻表和换乘信息取决于具体路线", price_check:"请查询价格", view_options:"查看选项", bus_desc:"查看可用站点和时刻表", taxi_desc:"服务情况取决于城市和时间", carpool_desc:"查看司机提供的拼车行程", fine_print:"目前尚未接入所有供应商的价格和余位信息。购买前请向运营商核实详情。",
      stays_title:"酒店与住宿", geneva_desc:"湖畔、市中心和车站", paris_desc:"文化与历史街区", munich_desc:"市中心及交通连接", discover_stays:"探索住宿 →", drivers_title:"专车与出租车", view_all:"查看全部 →", local_taxis:"当地出租车", coverage_title:"服务城市",
      inspiration:"灵感旅程由此开启", dest_title:"探索欧洲", dest_sub:"标志性城市与独特体验。", switzerland:"瑞士", france:"法国", germany:"德国", simple:"简单透明", steps_title:"三步开启顺畅旅程", step1_title:"规划行程", step1_desc:"填写出发地、目的地、日期和交通方式。", step2_title:"探索出行选择", step2_desc:"查找相关运营商并比较可用选项。", step3_title:"向供应商预订", step3_desc:"在官方网站确认价格、余位和相关条款。",
      footer_line:"优雅出行。", data_sources:"数据来源", contact:"联系方式", prototype:"原型版本 — 暂不支持直接预订和付款",
      loading:"正在搜索…", loading_desc:"正在获取时刻表和运营商链接。", date_word:"日期", category:"类别", no_providers:"未找到此类别的运营商。", operators:"运营商网站", no_time:"未提供时间", duration_unknown:"未提供时长", train_results:"瑞士公共交通时刻表", api_note:"结果由瑞士 API 提供，此处不提供车票价格。", route_notice:"时刻表来自瑞士公共交通 API。出发前请核实相关信息。", departure:"出发：", arrival:"抵达：", duration:"时长：", services:"服务：", steps:"查看行程详情", price:"价格：", not_provided:"此 API 未提供", check_sbb:"在 SBB / CFF 查看行程 ↗", search_error:"无法完成搜索", retry:"请检查网络连接后重试。", default_departure:"出发", default_arrival:"抵达", searching:"正在搜索…",
      city_geneva:"日内瓦", city_paris:"巴黎", city_munich:"慕尼黑", swiss_cities:"日内瓦 · 洛桑 · 苏黎世", france_cities:"巴黎 · 里昂 · 安纳西", germany_cities:"慕尼黑 · 斯图加特", coverage_cities:"日内瓦、洛桑、苏黎世、巴黎、里昂、安纳西、慕尼黑、斯图加特"
    }
  };

  const languageLabels = {fr:"🇫🇷 FR", en:"🇬🇧 EN", de:"🇩🇪 DE", it:"🇮🇹 IT", ja:"🇯🇵 JA", es:"🇪🇸 ES", zh:"🇨🇳 中文"};
  const languageNames = {fr:"Français", en:"English", de:"Deutsch", it:"Italiano", ja:"日本語", es:"Español", zh:"中文"};

  // Existing app.js declares these at top level; this script runs immediately after it.
  Object.keys(extra).forEach(lang => Object.assign(translations[lang], extra[lang]));
  Object.assign(languageMeta, languageLabels);

  // Add localized city labels to the existing DOM translation pass.
  const apply = window.applyLanguage;
  if (typeof apply === "function") {
    // If app.js exposes it as a global function, preserve its original behavior.
    window.applyLanguage = apply;
  }

  // Re-apply current language after extending dictionaries.
  const saved = localStorage.getItem("teyunai-language") || "fr";
  if (typeof applyLanguage === "function" && translations[saved]) applyLanguage(saved);

  // Replace visible language names with consistent labels; existing app.js click handlers
  // already call applyLanguage(button.dataset.lang) for every data-lang button.
  document.querySelectorAll("[data-lang]").forEach(button => {
    const code = button.dataset.lang;
    if (languageNames[code]) button.disabled = false;
    button.removeAttribute("aria-disabled");
    button.removeAttribute("title");
  });
})();