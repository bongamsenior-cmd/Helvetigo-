
/* TEYUNAI — Native scroll-driven cinematic artwork */
(() => {
  function initTeyunaiArtwork() {
    const footer = document.querySelector("footer.footer");
    if (!footer) return;

    footer.classList.add("teyunai-art-footer");

    let artwork = footer.querySelector(".teyunai-artwork-layer");

    if (!artwork) {
      artwork = document.createElement("div");
      artwork.className = "teyunai-artwork-layer";
      artwork.setAttribute("aria-hidden", "true");

      const image = document.createElement("img");
      image.className = "teyunai-artwork-image";
      image.src = "./assets/teyunai-goddess-sisters-travel.png";
      image.alt = "";
      image.draggable = false;

      artwork.appendChild(image);
      footer.prepend(artwork);
    }

    let style = document.getElementById("teyunai-emergence-style");

    if (!style) {
      style = document.createElement("style");
      style.id = "teyunai-emergence-style";
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
        opacity: 1;
      }

      footer.footer.teyunai-art-footer .teyunai-artwork-image {
        display: block;
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center 42%;
        transform: translate3d(0, 0, 0) scale(1);
        backface-visibility: hidden;
      }

      footer.footer.teyunai-art-footer >
      :not(.teyunai-artwork-layer) {
        position: relative;
        z-index: 2;
      }

      footer.footer.teyunai-art-footer .teyunai-clock {
        z-index: 50 !important;
      }

      /* Native scroll-driven animation */
      @supports (animation-timeline: view()) and
                (animation-range: cover 0% cover 100%) {

        footer.footer.teyunai-art-footer .teyunai-artwork-layer {
          animation: teyunai-art-fade linear both;
          animation-timeline: view(block);
          animation-range: cover 0% cover 100%;
        }

        footer.footer.teyunai-art-footer .teyunai-artwork-image {
          animation: teyunai-art-rise linear both;
          animation-timeline: view(block);
          animation-range: cover 0% cover 100%;
        }

        @keyframes teyunai-art-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @keyframes teyunai-art-rise {
          from {
            transform:
              translate3d(0, 155px, 0)
              scale(.93);
          }

          to {
            transform:
              translate3d(0, 0, 0)
              scale(1);
          }
        }
      }

      /* Smaller movement on mobile */
      @media (max-width: 760px) {
        footer.footer.teyunai-art-footer .teyunai-artwork-image {
          object-position: center center;
        }

        @supports (animation-timeline: view()) and
                  (animation-range: cover 0% cover 100%) {

          footer.footer.teyunai-art-footer .teyunai-artwork-image {
            animation-name: teyunai-art-rise-mobile;
          }

          @keyframes teyunai-art-rise-mobile {
            from {
              transform:
                translate3d(0, 115px, 0)
                scale(.94);
            }

            to {
              transform:
                translate3d(0, 0, 0)
                scale(1);
            }
          }
        }
      }

      /* Fallback for browsers without scroll-driven animation */
      @supports not (animation-timeline: view()) {
        footer.footer.teyunai-art-footer .teyunai-artwork-layer {
          opacity: 0;
          transition: opacity 700ms ease;
        }

        footer.footer.teyunai-art-footer .teyunai-artwork-image {
          transform: translate3d(0, 65px, 0) scale(.97);
          transition: transform 900ms cubic-bezier(.22,.61,.36,1);
        }

        footer.footer.teyunai-art-footer.teyunai-art-visible
        .teyunai-artwork-layer {
          opacity: 1;
        }

        footer.footer.teyunai-art-footer.teyunai-art-visible
        .teyunai-artwork-image {
          transform: translate3d(0, 0, 0) scale(1);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        footer.footer.teyunai-art-footer .teyunai-artwork-layer {
          animation: none !important;
          opacity: 1 !important;
          transition: none !important;
        }

        footer.footer.teyunai-art-footer .teyunai-artwork-image {
          animation: none !important;
          transform: none !important;
          transition: none !important;
        }
      }
    `;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      footer.classList.add("teyunai-art-visible");
      return;
    }

    const supportsNativeScroll =
      CSS.supports("animation-timeline: view()") &&
      CSS.supports("animation-range: cover 0% cover 100%");

    if (supportsNativeScroll) return;

    if (!("IntersectionObserver" in window)) {
      footer.classList.add("teyunai-art-visible");
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        footer.classList.toggle(
          "teyunai-art-visible",
          entry.isIntersecting
        );
      });
    }, {
      threshold: 0.05
    });

    observer.observe(artwork);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initTeyunaiArtwork,
      { once: true }
    );
  } else {
    initTeyunaiArtwork();
  }
})();
