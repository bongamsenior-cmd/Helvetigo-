
/* TEYUNAI — Independent cinematic artwork emergence */
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
        overflow: hidden;
        pointer-events: none;
        opacity: 0;

        -webkit-mask-image:
          linear-gradient(to bottom, transparent 0%, #000 18%, #000 100%),
          linear-gradient(to right, transparent 0%, #000 5%, #000 95%, transparent 100%);
        -webkit-mask-composite: source-in;

        mask-image:
          linear-gradient(to bottom, transparent 0%, #000 18%, #000 100%),
          linear-gradient(to right, transparent 0%, #000 5%, #000 95%, transparent 100%);
        mask-composite: intersect;

        transition: opacity 900ms ease;
      }

      .teyunai-artwork-image {
        display: block;
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center 42%;

        transform:
          perspective(1100px)
          translate3d(0, 170px, 0)
          rotateX(9deg)
          scale(.92);

        transform-origin: center bottom;

        transition:
          transform 1700ms cubic-bezier(.16,1,.3,1);

        will-change: transform;
      }

      footer.footer.teyunai-art-footer.teyunai-art-visible
      .teyunai-artwork-layer {
        opacity: 1;
      }

      footer.footer.teyunai-art-footer.teyunai-art-visible
      .teyunai-artwork-image {
        transform:
          perspective(1100px)
          translate3d(0, 0, 0)
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

      @media (max-width: 760px) {
        .teyunai-artwork-image {
          object-position: center center;
          transform:
            perspective(900px)
            translate3d(0, 135px, 0)
            rotateX(7deg)
            scale(.93);

          transition:
            transform 1550ms cubic-bezier(.16,1,.3,1);
        }

        footer.footer.teyunai-art-footer.teyunai-art-visible
        .teyunai-artwork-image {
          transform:
            perspective(900px)
            translate3d(0, 0, 0)
            rotateX(0)
            scale(1);
        }

        footer.footer.teyunai-art-footer .teyunai-artwork-layer {
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
          transition: none !important;
        }

        footer.footer.teyunai-art-footer .teyunai-artwork-image {
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
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          footer.classList.add("teyunai-art-visible");
        } else {
          footer.classList.remove("teyunai-art-visible");
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: "0px 0px -12% 0px"
    });

    observer.observe(footer);
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
