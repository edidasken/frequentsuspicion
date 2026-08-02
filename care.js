import counseling from "./data/biblical-counseling.js";
import apologetics from "./data/apologetics.js";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBA-fkxjABbwIHn0i6MPiXbGwahfJmuJeo",
  authDomain: "flockos-notify.firebaseapp.com",
  projectId: "flockos-notify",
  storageBucket: "flockos-notify.firebasestorage.app",
  messagingSenderId: "321766738616",
  appId: "1:321766738616:web:d2c1c53ad7493fcde4c24d"
};
const APP_CHECK_SITE_KEY = "6LcUV2AtAAAAAG8xFBNxd-GAGObHa6yWI6Fp0eQC";

const layer = document.querySelector(".care-layer");
const dialog = document.querySelector(".care-dialog");
const trigger = document.querySelector(".care-trigger");
const search = document.querySelector("[data-care-search]");
const list = document.querySelector("[data-care-list]");
const detail = document.querySelector("[data-care-detail]");
const count = document.querySelector("[data-care-count]");
const clear = document.querySelector("[data-care-clear]");
const panel = document.querySelector("#care-library");
const notice = document.querySelector("[data-care-notice]");

let mode = "counseling";
let selectedId = "";
let returnFocus = null;
let submissionClient;
let prayerStartedAt = 0;

const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
})[char]);

const paragraphs = value => String(value || "").split(/\n\s*\n/).filter(Boolean).map(text => `<p>${esc(text)}</p>`).join("");
const topicId = item => String(item.topicId || item._id || "");
const questionId = item => String(item.questionId || item._id || "");
const cleanQuestionTitle = value => String(value || "").replace(/^\s*\d+\.\s*/, "");

function currentRows() {
  return mode === "counseling"
    ? counseling.slice().sort((a, b) => a.title.localeCompare(b.title))
    : apologetics.slice().sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0));
}

function searchable(item) {
  if (mode === "counseling") return [item.title, item.definition, item.scriptures, item.pastoralGuidance, item.steps].join(" ");
  return [item.questionTitle, item.shortTitle, item.answerContent, item.categoryTitle, item.quoteText, item.referenceText].join(" ");
}

function renderList() {
  const query = search.value.trim().toLowerCase();
  const rows = currentRows().filter(item => searchable(item).toLowerCase().includes(query));
  count.textContent = `${rows.length} ${mode === "counseling" ? "counseling topics" : "questions"}`;
  clear.hidden = !query;
  if (!rows.length) {
    list.innerHTML = `<div class="care-empty"><strong>No close match found.</strong><span>Try fewer words or clear the search to browse every topic.</span></div>`;
    detail.innerHTML = placeholder();
    return;
  }
  const idFor = mode === "counseling" ? topicId : questionId;
  if (!rows.some(item => idFor(item) === selectedId)) selectedId = idFor(rows[0]);
  list.innerHTML = rows.map(item => {
    const id = idFor(item);
    const title = mode === "counseling" ? item.title : cleanQuestionTitle(item.questionTitle);
    const meta = mode === "counseling" ? "Biblical counseling guide" : String(item.categoryTitle || "Apologetics").replace(/^\S+\s*/, "");
    return `<button class="care-list-item${id === selectedId ? " active" : ""}" type="button" data-care-id="${esc(id)}" aria-pressed="${id === selectedId}">
      <span class="care-list-icon" aria-hidden="true">${mode === "counseling" ? esc(item.icon || "✦") : "?"}</span>
      <span><strong>${esc(title)}</strong><small>${esc(meta)}</small></span>
      <span aria-hidden="true">→</span>
    </button>`;
  }).join("");
  list.querySelectorAll("[data-care-id]").forEach(button => button.addEventListener("click", () => select(button.dataset.careId)));
  renderDetail(rows.find(item => idFor(item) === selectedId) || rows[0]);
}

function placeholder() {
  return `<div class="care-placeholder"><span aria-hidden="true">✦</span><h3>Choose a place to begin.</h3><p>Search by a struggle, question, doctrine, or passage. Every guide stays rooted in Scripture and points toward a concrete next step.</p></div>`;
}

function renderDetail(item) {
  if (!item) { detail.innerHTML = placeholder(); return; }
  if (mode === "counseling") renderCounseling(item);
  else renderApologetics(item);
  detail.scrollTop = 0;
}

function renderCounseling(item) {
  const resources = Array.isArray(item.research) ? item.research : [];
  detail.innerHTML = `
    <div class="care-detail-hero">
      <span class="care-detail-mark" aria-hidden="true">${esc(item.icon || "✦")}</span>
      <div><span>Biblical counseling guide</span><h3>${esc(item.title)}</h3></div>
    </div>
    <section class="care-detail-section care-definition"><span>Understand the concern</span>${paragraphs(item.definition)}</section>
    <section class="care-scripture"><span>Read and consider</span>${paragraphs(item.scriptures)}</section>
    <section class="care-detail-section"><span>Pastoral guidance</span>${paragraphs(item.pastoralGuidance)}</section>
    <section class="care-detail-section care-action"><span>A faithful next step</span>${paragraphs(item.steps)}</section>
    ${item.safety ? `<section class="care-safety"><span>Safety &amp; wise care</span>${paragraphs(item.safety)}</section>` : ""}
    ${resources.length ? `<section class="care-detail-section"><span>Further study</span><div class="care-resources">${resources.map(resource => `<a href="${esc(resource.url)}" target="_blank" rel="noreferrer"><strong>${esc(resource.title)}</strong><small>${esc(resource.author || "External resource")} ↗</small></a>`).join("")}</div></section>` : ""}
    ${spiritualCareBridge(item.title)}
    <p class="care-disclaimer">General spiritual education—not medical, legal, or emergency services. Read cited passages in context and involve qualified care when safety, health, or law requires it.</p>`;
  wireRequestButtons();
}

function renderApologetics(item) {
  const title = cleanQuestionTitle(item.questionTitle);
  detail.innerHTML = `
    <div class="care-detail-hero care-detail-hero--question">
      <span class="care-detail-mark" aria-hidden="true">?</span>
      <div><span>${esc(String(item.categoryTitle || "Apologetics").replace(/^\S+\s*/, ""))}</span><h3>${esc(title)}</h3></div>
    </div>
    <section class="care-detail-section care-definition"><span>Direct answer</span>${paragraphs(item.answerContent)}</section>
    <blockquote class="care-scripture"><span>${esc(item.referenceText)}</span><p>“${esc(item.quoteText)}”</p>${item.referenceUrl ? `<a href="${esc(item.referenceUrl)}" target="_blank" rel="noreferrer">Read the passage in context ↗</a>` : ""}</blockquote>
    <section class="care-study-path"><article><b>01</b><strong>Observe</strong><span>What does the passage actually say?</span></article><article><b>02</b><strong>Interpret</strong><span>How does its context shape the answer?</span></article><article><b>03</b><strong>Respond</strong><span>What belief or action should change?</span></article></section>
    ${spiritualCareBridge(title)}
    <p class="care-disclaimer">This study library offers concise starting points. Read every cited passage in its literary and biblical context.</p>`;
  wireRequestButtons();
}

function spiritualCareBridge(topic) {
  return `<section class="care-bridge">
    <div><span>Need someone to pray with you?</span><h4>Send a prayer request to get in touch with Greg.</h4><p>Your request will enter the private Outreach Contacts queue so it can receive personal follow-up.</p></div>
    <button type="button" data-prayer-request data-prayer-topic="${esc(topic)}">Submit a prayer request</button>
  </section>`;
}

function select(id) {
  selectedId = id;
  renderList();
  if (matchMedia("(max-width: 760px)").matches) detail.scrollIntoView({ block: "start", behavior: "smooth" });
}

function setMode(nextMode) {
  mode = nextMode;
  selectedId = "";
  search.value = "";
  document.querySelectorAll("[data-care-mode]").forEach(button => {
    const selected = button.dataset.careMode === mode;
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  panel.setAttribute("aria-labelledby", `care-tab-${mode}`);
  search.placeholder = mode === "counseling" ? "Search counseling topics…" : "Search apologetics questions…";
  notice.innerHTML = mode === "counseling"
    ? "<strong>Biblical counsel for real life.</strong><span>Explore a topic, read Scripture in context, and identify a faithful next step.</span>"
    : "<strong>Honest questions deserve faithful answers.</strong><span>Examine a concise answer, its primary passage, and a path into deeper study.</span>";
  renderList();
}

function openCare() {
  returnFocus = document.activeElement;
  layer.hidden = false;
  trigger.setAttribute("aria-expanded", "true");
  document.body.classList.add("dialog-open");
  renderList();
  dialog.focus();
}

function closeCare() {
  closePrayerForm();
  layer.hidden = true;
  trigger.setAttribute("aria-expanded", "false");
  document.body.classList.remove("dialog-open");
  if (returnFocus instanceof HTMLElement) returnFocus.focus();
}

function prayerForm(topic = "") {
  return `<div class="prayer-layer" data-prayer-layer>
    <div class="prayer-backdrop" data-prayer-close></div>
    <section class="prayer-dialog" role="dialog" aria-modal="true" aria-labelledby="prayer-title">
      <header><div><span>Private spiritual care</span><h3 id="prayer-title">Submit a prayer request</h3><p>Share how Greg can pray and whether you would like him to get in touch.</p></div><button type="button" data-prayer-close aria-label="Close prayer request">×</button></header>
      <form data-prayer-form>
        <div class="prayer-form-row">
          <label><span>First name</span><input name="firstName" required autocomplete="given-name"></label>
          <label><span>Last name <small>(optional)</small></span><input name="lastName" autocomplete="family-name"></label>
        </div>
        <div class="prayer-form-row">
          <label><span>Email</span><input name="email" type="email" autocomplete="email" placeholder="Reply address"></label>
          <label><span>Phone</span><input name="phone" type="tel" autocomplete="tel" placeholder="Safe callback number"></label>
        </div>
        <p class="prayer-field-note">Provide an email address or phone number if you would like Greg to respond.</p>
        <label><span>Prayer area</span><select name="category" required><option value="">Choose an area…</option>${topic ? `<option selected>${esc(topic)}</option>` : ""}<option>Personal</option><option>Family</option><option>Healing</option><option>Guidance</option><option>Grief</option><option>Urgent</option><option>Praise</option><option>Other</option></select></label>
        <label><span>How can I pray?</span><textarea name="message" rows="6" required placeholder="Share the request in your own words…"></textarea><small>Share only what you are comfortable placing in a private spiritual-care record.</small></label>
        <div class="prayer-form-row">
          <label><span>Response timing</span><select name="urgency"><option value="Normal">Normal follow-up</option><option value="Urgent">Urgent — please respond soon</option></select></label>
          <label><span>Preferred contact</span><select name="preferredContact"><option value="email">Email</option><option value="phone">Phone</option><option value="either">Either is fine</option><option value="none">Prayer only — no reply needed</option></select></label>
        </div>
        <label class="prayer-honeypot" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <div class="prayer-confidential"><strong>Private Outreach Contacts intake</strong><span>This request goes to the Notify spiritual-care database for prayer and personal follow-up. It is not monitored continuously.</span></div>
        <div class="prayer-emergency"><strong>Need immediate help?</strong><span>If you or someone else is in immediate danger, call local emergency services now. Call or text 988 in the U.S. for a suicide or mental-health crisis.</span></div>
        <p class="prayer-error" data-prayer-error hidden></p>
        <footer><button type="submit">Send prayer request</button><button type="button" data-prayer-close>Cancel</button></footer>
      </form>
    </section>
  </div>`;
}

function openPrayerForm(topic) {
  closePrayerForm();
  prayerStartedAt = Date.now();
  document.body.insertAdjacentHTML("beforeend", prayerForm(topic));
  const prayerLayer = document.querySelector("[data-prayer-layer]");
  prayerLayer.querySelectorAll("[data-prayer-close]").forEach(button => button.addEventListener("click", closePrayerForm));
  prayerLayer.querySelector("[data-prayer-form]").addEventListener("submit", submitPrayerRequest);
  prayerLayer.querySelector("input")?.focus();
}

function closePrayerForm() {
  document.querySelector("[data-prayer-layer]")?.remove();
}

async function getSubmissionClient() {
  if (submissionClient) return submissionClient;
  const [{ initializeApp }, { getFunctions, httpsCallable }, { initializeAppCheck, ReCaptchaEnterpriseProvider, getToken }] = await Promise.all([
    import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js"),
    import("https://www.gstatic.com/firebasejs/10.14.1/firebase-functions.js"),
    import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app-check.js")
  ]);
  const app = initializeApp(FIREBASE_CONFIG, "frequent-suspicion-care");
  const appCheck = initializeAppCheck(app, { provider: new ReCaptchaEnterpriseProvider(APP_CHECK_SITE_KEY), isTokenAutoRefreshEnabled: true });
  await getToken(appCheck, false);
  submissionClient = httpsCallable(getFunctions(app), "submitPublicCareIntake");
  return submissionClient;
}

async function submitPrayerRequest(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const submit = form.querySelector("button[type='submit']");
  const error = form.querySelector("[data-prayer-error]");
  const values = Object.fromEntries(new FormData(form));
  if (values.preferredContact !== "none" && !values.email.trim() && !values.phone.trim()) {
    error.textContent = "Please provide an email address or phone number, or choose prayer only.";
    error.hidden = false;
    form.elements.email.focus();
    return;
  }
  submit.disabled = true;
  submit.textContent = "Sending securely…";
  error.hidden = true;
  try {
    const send = await getSubmissionClient();
    const result = await send({
      churchId: "flockos",
      intakeKind: "Prayer Request",
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      preferredContact: values.preferredContact,
      urgency: values.urgency.toLowerCase(),
      category: values.category,
      message: values.message.trim(),
      sourcePath: `FrequentSuspicion ${location.pathname}${location.hash}`,
      website: values.website,
      startedAt: prayerStartedAt
    });
    const reference = result.data?.reference ? ` Reference: ${esc(result.data.reference)}.` : "";
    document.querySelector(".prayer-dialog").innerHTML = `<div class="prayer-success"><span aria-hidden="true">✓</span><small>Request received</small><h3>Your prayer request was sent.</h3><p>It is now in the private Outreach Contacts queue for prayer and personal follow-up.${reference}</p><button type="button" data-prayer-close>Return to the care library</button></div>`;
    document.querySelector("[data-prayer-close]")?.addEventListener("click", closePrayerForm);
  } catch (requestError) {
    error.textContent = requestError?.message || "The request could not be sent. Please try again.";
    error.hidden = false;
    submit.disabled = false;
    submit.textContent = "Send prayer request";
  }
}

function wireRequestButtons() {
  detail.querySelectorAll("[data-prayer-request]").forEach(button => button.addEventListener("click", () => openPrayerForm(button.dataset.prayerTopic)));
}

trigger?.addEventListener("click", openCare);
document.querySelectorAll("[data-open-prayer]").forEach(button => button.addEventListener("click", () => {
  if (layer.hidden) openCare();
  openPrayerForm("");
}));
document.querySelectorAll("[data-care-close]").forEach(button => button.addEventListener("click", closeCare));
document.querySelectorAll("[data-care-mode]").forEach(button => button.addEventListener("click", () => setMode(button.dataset.careMode)));
search?.addEventListener("input", renderList);
clear?.addEventListener("click", () => { search.value = ""; search.focus(); renderList(); });

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && document.querySelector("[data-prayer-layer]")) { closePrayerForm(); return; }
  if (event.key === "Escape" && layer && !layer.hidden) closeCare();
});

dialog?.addEventListener("keydown", event => {
  if (event.key !== "Tab" || document.querySelector("[data-prayer-layer]")) return;
  const focusable = [...dialog.querySelectorAll("a[href], button:not([disabled]), input:not([disabled])")].filter(node => node.offsetParent !== null);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable.at(-1);
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});

setMode("counseling");
