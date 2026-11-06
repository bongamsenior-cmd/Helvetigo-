
/* TEYUNAI — Scroll-driven cinematic 3D artwork emergence */
(() => {
  function initTeyunaiEmergence() {
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

    if (!document.getElementById("teyunai-emergence-style")) {
      const style = document.createElement("style");
      style.id = "teyunai-emergence-style";
      style.textContent = `
        footer.footer.teyunai-art-footer {
          position: relative !important;
          isolation: isolate;
          overflow: visible !important;
          background-image: none !important;
        }

        .teyunai-artwork-layer {
          position: absolute;
          inset: 0;
          z-index: 0;
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
            translate3d(0,100px,0)
            rotateX(9deg)
            scale(.94);
          transform-origin: center bottom;
          will-change: transform, opacity;
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
          }
        }

        @media (prefers-reduced-motion:reduce) {
          .teyunai-artwork-layer {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `;
      document.head.appendChild(style);
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let framePending = false;

    function updateArtwork() {
      framePending = false;

      if (reducedMotion.matches) {
        artwork.style.opacity = "1";
        artwork.style.transform = "none";
        return;
      }

      const rect = footer.getBoundingClientRect();
      const vh = window.innerHeight;

      const start = vh * 0.88;
      const finish = vh * 0.25;

      const progress = Math.max(
        0,
        Math.min(1, (start - rect.top) / (start - finish))
      );

      const lift = 100 * (1 - progress);
      const tilt = 9 * (1 - progress);
      const scale = 0.94 + (0.06 * progress);

      artwork.style.opacity = String(progress);
      artwork.style.transform =
        `perspective(1100px) translate3d(0,${lift}px,0) ` +
        `rotateX(${tilt}deg) scale(${scale})`;
    }

    function requestUpdate() {
      if (!framePending) {
        framePending = true;
        window.requestAnimationFrame(updateArtwork);
      }
    }

    window.addEventListener("scroll", requestUpdate, {
      passive: true
    });

    window.addEventListener("resize", requestUpdate);

    updateArtwork();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initTeyunaiEmergence,
      { once: true }
    );
  } else {
    initTeyunaiEmergence();
  }
})();
