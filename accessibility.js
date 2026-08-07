(() => {
  const STORAGE_KEY = "frequentsuspicion.text-size-scale";
  const allowedScales = ["0.92", "1", "1.08", "1.16", "1.24", "1.32"];
  const root = document.documentElement;
  const trigger = document.querySelector(".reader-size-trigger");
  const menu = document.querySelector(".reader-size-menu");
  const sizeButtons = [...document.querySelectorAll("[data-reader-scale]")];
  const signsTrigger = document.querySelector(".signs-trigger");
  const signsLayer = document.querySelector(".signs-layer");
  const signsDialog = document.querySelector(".signs-dialog");
  const albumMenus = [...document.querySelectorAll(".nav-albums")];
  let returnFocus = null;

  function applyScale(value, persist = true) {
    const scale = allowedScales.includes(String(value)) ? String(value) : "1";
    root.style.setProperty("--reader-scale", scale);
    root.dataset.readerScale = scale;
    sizeButtons.forEach(button => {
      const selected = button.dataset.readerScale === scale;
      button.setAttribute("aria-checked", String(selected));
      button.classList.toggle("active", selected);
    });
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, scale); } catch (_) { /* Preference storage may be unavailable. */ }
    }
  }

  function closeSizeMenu() {
    if (!menu || !trigger) return;
    menu.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
  }

  function openSigns() {
    if (!signsLayer || !signsDialog) return;
    returnFocus = document.activeElement;
    signsLayer.hidden = false;
    signsTrigger?.setAttribute("aria-expanded", "true");
    document.body.classList.add("dialog-open");
    signsDialog.focus();
  }

  function closeSigns() {
    if (!signsLayer) return;
    signsLayer.hidden = true;
    signsTrigger?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("dialog-open");
    if (returnFocus instanceof HTMLElement) returnFocus.focus();
  }

  try { applyScale(localStorage.getItem(STORAGE_KEY) || "1", false); } catch (_) { applyScale("1", false); }

  trigger?.addEventListener("click", event => {
    event.stopPropagation();
    const opening = menu.hidden;
    menu.hidden = !opening;
    trigger.setAttribute("aria-expanded", String(opening));
    if (opening) menu.querySelector(".active")?.focus();
  });

  sizeButtons.forEach(button => button.addEventListener("click", () => {
    applyScale(button.dataset.readerScale);
    closeSizeMenu();
    trigger?.focus();
  }));

  signsTrigger?.addEventListener("click", openSigns);
  document.querySelectorAll("[data-signs-close]").forEach(button => button.addEventListener("click", closeSigns));
  document.querySelectorAll("[data-nav-album]").forEach(link => link.addEventListener("click", () => link.closest(".nav-albums")?.removeAttribute("open")));
  document.querySelectorAll("[data-scroll-target]").forEach(control => control.addEventListener("click", () => {
    const target = document.querySelector(control.dataset.scrollTarget);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }));

  document.addEventListener("click", event => {
    if (!event.target.closest(".reader-size-control")) closeSizeMenu();
    if (!event.target.closest(".nav-albums")) albumMenus.forEach(menu => menu.removeAttribute("open"));
  });

  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    albumMenus.forEach(menu => menu.removeAttribute("open"));
    if (signsLayer && !signsLayer.hidden) closeSigns();
    else closeSizeMenu();
  });

  signsDialog?.addEventListener("keydown", event => {
    if (event.key !== "Tab") return;
    const focusable = [...signsDialog.querySelectorAll("a[href], button:not([disabled])")];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();
