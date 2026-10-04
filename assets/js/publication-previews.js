// Keep a still preview visible while progressively loading the animation.
(() => {
  const previews = document.querySelectorAll("img[data-preview-low][data-preview-high]");
  if (!previews.length) return;

  const connection = navigator.connection;
  const saveData = connection && (connection.saveData || ["slow-2g", "2g"].includes(connection.effectiveType));

  function loadImage(url, onLoad, onError) {
    const next = new Image();
    next.onload = onLoad;
    next.onerror = onError;
    next.src = url;
  }

  function loadHigh(preview) {
    loadImage(preview.dataset.previewHigh, () => {
      preview.src = preview.dataset.previewHigh;
    });
  }

  const highObserver =
    "IntersectionObserver" in window
      ? new IntersectionObserver((entries) => {
          entries.forEach(({ target, isIntersecting }) => {
            if (!isIntersecting) return;
            highObserver.unobserve(target);
            loadHigh(target);
          });
        })
      : null;

  function scheduleHigh(preview) {
    if (saveData) return;
    // Give the lightweight animation time to appear before upgrading.
    window.setTimeout(() => {
      const upgrade = () => {
        if (highObserver) highObserver.observe(preview);
        else loadHigh(preview);
      };
      if ("requestIdleCallback" in window) window.requestIdleCallback(upgrade, { timeout: 1500 });
      else upgrade();
    }, 1000);
  }

  function loadLow(preview) {
    loadImage(
      preview.dataset.previewLow,
      () => {
        preview.src = preview.dataset.previewLow;
        scheduleHigh(preview);
      },
      () => scheduleHigh(preview)
    );
  }

  function start(preview) {
    if (preview.complete) {
      loadLow(preview);
      return;
    }
    const ready = () => {
      preview.removeEventListener("load", ready);
      preview.removeEventListener("error", ready);
      loadLow(preview);
    };
    preview.addEventListener("load", ready);
    preview.addEventListener("error", ready);
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          observer.unobserve(target);
          start(target);
        });
      },
      { rootMargin: "150px 0px" }
    );
    previews.forEach((preview) => observer.observe(preview));
  } else {
    previews.forEach(start);
  }
})();
