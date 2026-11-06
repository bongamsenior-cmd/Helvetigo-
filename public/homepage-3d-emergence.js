
/* TEYUNAI — Smooth cinematic 3D scroll animation */
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

      // Gradual interpolation reduces sudden visual jumps.
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
