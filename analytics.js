(() => {
  const track = (eventName, parameters = {}) => {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", eventName, parameters);
  };

  window.fsAnalytics = { track };

  document.addEventListener("click", event => {
    const link = event.target.closest("a[href]");
    if (!link) return;

    const url = new URL(link.href, window.location.href);
    if (!/^https?:$/.test(url.protocol) || url.origin === window.location.origin) return;

    track("outbound_link_click", {
      link_url: url.href,
      link_domain: url.hostname,
      link_text: link.textContent.trim().replace(/\s+/g, " ").slice(0, 100)
    });
  });
})();
