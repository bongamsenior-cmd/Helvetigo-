
/* TEYUNAI — Final responsive cinematic artwork */
(() => {
  function initTeyunaiArtwork() {
    const footer = document.querySelector("footer.footer");
    if (!footer) return;

    footer.classList.add("teyunai-art-footer");

    /* Remove any previous artwork layer before rebuilding it. */
    const previous = footer.querySelector(".teyunai-artwork-layer");
    if (previous) previous.remove();

    /* Create an independent artwork section in normal document flow. */
    const artwork = document.createElement("div");
    artwork.className = "teyunai-artwork-layer";
    artwork.setAttribute("aria-hidden", "true");

    const image = document.createElement("img");
    image.className = "teyunai-artwork-image";
    image.src = "./assets/teyunai-goddess-sisters-travel.png";
    image.alt = "";
    image.draggable = false;
    image.decoding = "async";

    artwork.appendChild(image);

    /* Place artwork before footer content, without absolute positioning. */
    footer.prepend(artwork);

    let style = document.getElementById("teyunai-final-artwork-style");

    if (!style) {
      style = document.createElement("style");
      style.id = "teyunai-final-artwork-style";
      document.head.appendChild(style);
    }

    style.textContent = `
      footer.footer.teyunai-art-footer {
        position: relative !important;
        isolation: isolate;
        overflow: visible !important;
        padding-top: 0 !important;
        background-color: #10263E !important;
        background-image: none !important;
      }

      /* Independent image section: natural height and full width. */
      footer.footer.teyunai-art-footer > .teyunai-artwork-layer {
        display: block;
        position: relative;
        z-index: 1;
        width: 100%;
        height: auto;
        margin: 0;
        padding: 0;
        overflow: visible;
        background: transparent;
        pointer-events: none;

        opacity: 0;
        transform: translate3d(0, 65px, 0);

        transition:
          opacity 1100ms ease,
          transform 1250ms cubic-bezier(.22,.61,.36,1);
      }

      footer.footer.teyunai-art-footer
      .teyunai-artwork-image {
        display: block;
        position: relative;
        width: 100%;
        height: auto;
        max-width: none;
        max-height: none;
        margin: 0;
        padding: 0;

        object-fit: unset;
        object-position: center;

        transform: none;
        backface-visibility: hidden;
      }

      /* Soft edges that blend into the navy footer. */
      footer.footer.teyunai-art-footer
      .teyunai-artwork-layer::after {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;

        background:
          linear-gradient(
            to bottom,
            #10263E 0%,
            transparent 10%,
            transparent 86%,
            #10263E 100%
          ),
          linear-gradient(
            to right,
            #10263E 0%,
            transparent 3%,
            transparent 97%,
            #10263E 100%
          );
      }

      /* Reveal and reverse when entering or leaving the viewport. */
      footer.footer.teyunai-art-footer.teyunai-art-visible
      > .teyunai-artwork-layer {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      footer.footer.teyunai-art-footer >
      :not(.teyunai-artwork-layer) {
        position: relative;
        z-index: 2;
      }

      /* Preserve the existing clock position and appearance. */
      footer.footer.teyunai-art-footer .teyunai-clock {
        z-index: 50 !important;
      }

      /* Mobile portrait */
      @media (max-width: 760px) and (orientation: portrait) {
        footer.footer.teyunai-art-footer
        .teyunai-artwork-layer {
          transform: translate3d(0, 45px, 0);
          transition:
            opacity 950ms ease,
            transform 1100ms cubic-bezier(.22,.61,.36,1);
        }

        footer.footer.teyunai-art-footer.teyunai-art-visible
        > .teyunai-artwork-layer {
          transform: translate3d(0, 0, 0);
        }
      }

      /* Mobile landscape: preserve the entire original image. */
      @media (max-width: 900px) and (orientation: landscape) {
        footer.footer.teyunai-art-footer
        .teyunai-artwork-layer {
          width: 100%;
          height: auto;
          transform: translate3d(0, 35px, 0);
        }

        footer.footer.teyunai-art-footer
        .teyunai-artwork-image {
          width: 100%;
          height: auto;
          object-fit: unset;
        }

        footer.footer.teyunai-art-footer.teyunai-art-visible
        > .teyunai-artwork-layer {
          transform: translate3d(0, 0, 0);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        footer.footer.teyunai-art-footer
        .teyunai-artwork-layer {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
        }
      }
    `;

    /* Respect accessibility settings. */
    if (window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches) {
      footer.classList.add("teyunai-art-visible");
      return;
    }

    /* Replay the reveal when the artwork enters and leaves view. */
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
      threshold: 0.04,
      rootMargin: "0px 0px -5% 0px"
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
