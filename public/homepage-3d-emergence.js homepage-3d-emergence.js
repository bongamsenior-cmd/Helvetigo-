
/* TEYUNAI — Cinematic 3D footer emergence */
(() => {
  const start = () => {
    const footer = document.querySelector("footer.footer");

    if (!footer || footer.querySelector(".teyunai-artwork-layer")) return;

    footer.classList.add("teyunai-art-footer");

    const style = document.createElement("style");
    style.textContent = `
      footer.footer.teyunai-art-footer {
        position: relative !important;
        isolation: isolate;
        overflow: visible !important;
        background-image: none !important;
      }

      .teyunai-artwork-layer {
        position: absolute;
        z-index: 0;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        background-image:
          linear-gradient(180deg,#071a2a18,#071a2a55),
          url("./assets/teyunai-goddess-sisters-travel.png");
        background-size: cover;
        background-position: center 42%;
        background-repeat: no-repeat;
        opacity: 0;
        transform:
          perspective(1100px)
          translate3d(0,105px,0)
          rotateX(9deg)
          scale(.94);
        transform-origin: center bottom;
        transition:
          opacity 1.15s ease,
          transform 1.45s cubic-bezier(.2,.7,.2,1);
        will-change: transform, opacity;
      }

      .teyunai-art-visible .teyunai-artwork-layer {
        opacity: 1;
        transform:
          perspective(1100px)
          translate3d(0,0,0)
          rotateX(0)
          scale(1);
      }

      footer.footer.teyunai-art-footer >
      :not(.teyunai-artwork-layer) {
        position: relative;
        z-index: 2;
      }

      footer.footer.teyunai-art-footer .teyunai-clock {
        z-index: 50 !important;
      }

      @media (max-width:760px) {
        .teyunai-artwork-layer {
          background-position: center center;
          transform:
            perspective(900px)
            translate3d(0,70px,0)
            rotateX(6deg)
            scale(.96);
          transition:
            opacity 1s ease,
            transform 1.25s cubic-bezier(.2,.7,.2,1);
        }

        .teyunai-art-visible .teyunai-artwork-layer {
          transform:
            perspective(900px)
            translate3d(0,0,0)
            rotateX(0)
            scale(1);
        }
      }

      @media (prefers-reduced-motion:reduce) {
        .teyunai-artwork-layer,
        .teyunai-art-visible .teyunai-artwork-layer {
          opacity: 1;
          transform: none;
          transition: none;
        }
      }
    `;

    document.head.appendChild(style);

    const artwork = document.createElement("div");
    artwork.className = "teyunai-artwork-layer";
    artwork.setAttribute("aria-hidden", "true");
    footer.prepend(artwork);

    if (!("IntersectionObserver" in window)) {
      footer.classList.add("teyunai-art-visible");
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        footer.classList.add("teyunai-art-visible");
        observer.disconnect();
      }
    }, { threshold: 0.12 });

    observer.observe(footer);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
