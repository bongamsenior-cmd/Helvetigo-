
/* TEYUNAI — Elegant, lightweight footer reveal */
(() => {
  function initTeyunaiReveal() {
    const footer = document.querySelector("footer.footer");
    if (!footer) return;

    footer.classList.add("teyunai-art-footer");

    let artwork = footer.querySelector(".teyunai-artwork-layer");

    if (!artwork) {
      artwork = document.createElement("div");
      artwork.className = "teyunai-artwork-layer";
      artwork.setAttribute("aria-hidden", "true");
      footer.prepend(artwork);
    }

    const styleId = "teyunai-emergence-style";
    let style = document.getElementById(styleId);

    if (!style) {
      style = document.createElement("style");
      style.id = styleId;
      document.head.appendChild(style);
    }

    style.textContent = `
      footer.footer.teyunai-art-footer {
        position: relative !important;
        isolation: isolate;
        overflow: visible !important;
        background-image: none !important;
      }

      footer.footer.teyunai-art-footer .teyunai-artwork-layer {
        position: absolute;
        inset: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;

        background-image:
          linear-gradient(180deg, #071a2a18, #071a2a55),
          url("./assets/teyunai-goddess-sisters-travel.png");

        background-size: cover;
        background-position: center 42%;
        background-repeat: no-repeat;

        opacity: 0;
        transform: translate3d(0, 28px, 0) scale(.99);
        transition:
          opacity 900ms ease-out,
          transform 1100ms cubic-bezier(.22,.61,.36,1);

        will-change: opacity, transform;
      }

      footer.footer.teyunai-art-footer.teyunai-art-visible
      .teyunai-artwork-layer {
        opacity: 1;
        transform: translate3d(0, 0, 0) scale(1);
      }

      footer.footer.teyunai-art-footer >
      :not(.teyunai-artwork-layer) {
        position: relative;
        z-index: 2;
      }

      footer.footer.teyunai-art-footer .teyunai-clock {
        z-index: 50 !important;
      }

      @media (max-width: 760px) {
        footer.footer.teyunai-art-footer .teyunai-artwork-layer {
          background-position: center center;
          transform: translate3d(0, 20px, 0) scale(.995);
          transition:
            opacity 850ms ease-out,
            transform 1000ms cubic-bezier(.22,.61,.36,1);
        }

        footer.footer.teyunai-art-footer.teyunai-art-visible
        .teyunai-artwork-layer {
          transform: translate3d(0, 0, 0) scale(1);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        footer.footer.teyunai-art-footer .teyunai-artwork-layer {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
        }
      }
    `;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      footer.classList.add("teyunai-art-visible");
      return;
    }

    if (!("IntersectionObserver" in window)) {
      footer.classList.add("teyunai-art-visible");
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          footer.classList.add("teyunai-art-visible");
          observer.disconnect();
          break;
        }
      }
    }, {
      threshold: 0.08,
      rootMargin: "0px 0px -8% 0px"
    });

    observer.observe(artwork);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initTeyunaiReveal,
      { once: true }
    );
  } else {
    initTeyunaiReveal();
  }
})();
