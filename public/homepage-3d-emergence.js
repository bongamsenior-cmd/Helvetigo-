
/* TEYUNAI — Smooth cinematic 3D artwork emergence */
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

    /* Complete visual styling */
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

        footer.footer.teyunai-art-footer .teyunai-artwork-layer {
          position: absolute;
          z-index: 0;
          inset: 0;
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
          transform:
            perspective(1100px)
            translate3d(0, 100px, 0)
            rotateX(9deg)
            scale(.94);

          transform-origin: center bottom;
          will-change: transform, opacity;

          -webkit-mask-image:
            linear-gradient(to bottom, transparent 0%, #000 18%, #000 100%),
            linear-gradient(to right, transparent 0%, #000 5%, #000 95%, transparent 100%);

          -webkit-mask-composite: source-in;

          mask-image:
            linear-gradient(to bottom, transparent 0%, #000 18%, #000 100%),
            linear-gradient(to right, transparent 0%, #000 5%, #000 95%, transparent 100%);

          mask-composite: intersect;
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

            -webkit-mask-image:
              linear-gradient(to bottom, transparent 0%, #000 13%, #000 100%),
              linear-gradient(to right, transparent 0%, #000 2.5%, #000 97.5%, transparent 100%);

            mask-image:
              linear-gradient(to bottom, transparent 0%, #000 13%, #000 100%),
              linear-gradient(to right, transparent 0%, #000 2.5%, #000 97.5%, transparent 100%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          footer.footer.teyunai-art-footer .teyunai-artwork-layer {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `;

      document.head.appendChild(style);
    }

    /* Smooth scroll-driven animation */
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) {
      artwork.style.opacity = "1";
      artwork.style.transform = "none";
      return;
    }

    let targetProgress = 0;
    let currentProgress = 0;
    let animationFrame = null;

    const clamp = (value, min, max) =>
      Math.max(min, Math.min(max, value));

    function calculateProgress() {
      const rect = footer.getBoundingClientRect();
      const viewport = window.innerHeight;

      const start = viewport * 0.88;
      const finish = viewport * 0.25;

      targetProgress = clamp(
        (start - rect.top) / (start - finish),
        0,
        1
      );

      if (animationFrame === null) {
        animationFrame = requestAnimationFrame(animate);
      }
    }

    function animate() {
      const difference = targetProgress - currentProgress;

      currentProgress += difference * 0.12;

      if (Math.abs(difference) < 0.001) {
        currentProgress = targetProgress;
      }

      const progress = currentProgress;

      const lift = 100 * (1 - progress);
      const tilt = 9 * (1 - progress);
      const scale = 0.94 + (0.06 * progress);

      artwork.style.opacity = progress.toFixed(3);

      artwork.style.transform =
        `perspective(1100px) ` +
        `translate3d(0, ${lift.toFixed(2)}px, 0) ` +
        `rotateX(${tilt.toFixed(2)}deg) ` +
        `scale(${scale.toFixed(4)})`;

      if (Math.abs(targetProgress - currentProgress) > 0.001) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        animationFrame = null;
      }
    }

    window.addEventListener("scroll", calculateProgress, {
      passive: true
    });

    window.addEventListener("resize", calculateProgress, {
      passive: true
    });

    calculateProgress();
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
