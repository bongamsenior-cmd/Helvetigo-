
/* TEYUNAI — Integrated cinematic footer artwork */
(() => {
  function initTeyunaiFooter() {
    const footer = document.querySelector("footer.footer");
    if (!footer) return;

    footer.classList.add("teyunai-art-footer");

    /* Remove previous experimental image layers. */
    footer.querySelectorAll(".teyunai-artwork-layer").forEach(el => el.remove());

    /* Remove previous animation styling. */
    document.getElementById("teyunai-emergence-style")?.remove();
    document.getElementById("teyunai-final-artwork-style")?.remove();

    const style = document.createElement("style");
    style.id = "teyunai-integrated-artwork-style";

    style.textContent = `
      footer.footer.teyunai-art-footer {
        position: relative !important;
        isolation: isolate;
        overflow: visible !important;

        /* Keep the original footer dimensions and spacing. */
        background-color: #10263E !important;
        background-image: none !important;
      }

      /* Artwork occupies the existing footer, not a new section. */
      footer.footer.teyunai-art-footer::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;

        background-image:
          linear-gradient(180deg, #071a2a18, #071a2a45),
          url("./assets/teyunai-goddess-sisters-travel.png");

        background-size: cover;
        background-position: center 42%;
        background-repeat: no-repeat;

        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      /* Keep footer content above the artwork. */
      footer.footer.teyunai-art-footer > * {
        position: relative;
        z-index: 2;
      }

      footer.footer.teyunai-art-footer .teyunai-clock {
        z-index: 50 !important;
      }

      /* Smooth reversible scroll animation where supported. */
      @supports (animation-timeline: view()) {
        footer.footer.teyunai-art-footer::after {
          animation: teyunai-integrated-emerge linear both;
          animation-timeline: view(block);
          animation-range: entry 0% exit 100%;
        }

        @keyframes teyunai-integrated-emerge {
          0% {
            opacity: .55;
            transform: translate3d(0, 75px, 0) scale(1.015);
          }

          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
      }

      /* Landscape positioning without changing footer height. */
      @media (max-width: 900px) and (orientation: landscape) {
        footer.footer.teyunai-art-footer::after {
          background-position: center 42%;
          background-size: cover;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        footer.footer.teyunai-art-footer::after {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTeyunaiFooter, {
      once: true
    });
  } else {
    initTeyunaiFooter();
  }
})();
