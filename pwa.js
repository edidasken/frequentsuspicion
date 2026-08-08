if ("serviceWorker" in navigator) {
  const release = "20260808-published-catalog";
  let refreshing = false;

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    const reloadKey = `fs-sw-reloaded-${release}`;
    if (refreshing || sessionStorage.getItem(reloadKey)) return;
    refreshing = true;
    sessionStorage.setItem(reloadKey, "true");
    window.location.reload();
  });

  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`./sw.js?v=${release}`, { updateViaCache: "none" })
      .then(registration => registration.update())
      .catch(error => {
        console.error("FrequentSuspicion service worker registration failed:", error);
      });
  });
}
