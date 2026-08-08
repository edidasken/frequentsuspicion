const readerDockMarkup = `
  <div class="reader-dock" aria-label="Reading and safety tools">
    <div class="reader-size-control">
      <button class="reader-size-trigger" type="button" aria-label="Change text size" aria-expanded="false" aria-controls="reader-size-menu">Aa</button>
      <div class="reader-size-menu" id="reader-size-menu" role="menu" aria-label="Text size" hidden>
        <button type="button" role="menuitemradio" data-reader-scale="0.92">Smaller</button>
        <button type="button" role="menuitemradio" data-reader-scale="1">Default</button>
        <button type="button" role="menuitemradio" data-reader-scale="1.08">Large</button>
        <button type="button" role="menuitemradio" data-reader-scale="1.16">XL</button>
        <button type="button" role="menuitemradio" data-reader-scale="1.24">XXL</button>
        <button type="button" role="menuitemradio" data-reader-scale="1.32">XXXL</button>
      </div>
    </div>
    <button class="care-trigger" type="button" aria-label="Open biblical counseling and apologetics" title="Biblical Counseling &amp; Apologetics" aria-haspopup="dialog" aria-expanded="false">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5c2.8-.8 5.5-.2 8 1.8v12c-2.5-2-5.2-2.6-8-1.8v-12Z"/><path d="M20 5.5c-2.8-.8-5.5-.2-8 1.8v12c2.5-2 5.2-2.6 8-1.8v-12Z"/><path d="M12 7.3v12.2"/></svg>
    </button>
    <button class="signs-trigger" type="button" aria-label="Know the signs of abuse" title="Know the Signs" aria-haspopup="dialog" aria-expanded="false">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2.8 20h18.4L12 3Z"/><path d="M12 8.2v5.9M12 17.5v.1"/></svg>
    </button>
  </div>`;

const careTriggerMarkup = `
  <button class="care-trigger" type="button" aria-label="Open biblical counseling and apologetics" title="Biblical Counseling &amp; Apologetics" aria-haspopup="dialog" aria-expanded="false">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5c2.8-.8 5.5-.2 8 1.8v12c-2.5-2-5.2-2.6-8-1.8v-12Z"/><path d="M20 5.5c-2.8-.8-5.5-.2-8 1.8v12c2.5-2 5.2-2.6 8-1.8v-12Z"/><path d="M12 7.3v12.2"/></svg>
  </button>`;

const careLayerMarkup = `
  <div class="care-layer" hidden>
    <div class="care-backdrop" data-care-close></div>
    <section class="care-dialog" role="dialog" aria-modal="true" aria-labelledby="care-title" tabindex="-1">
      <header class="care-header">
        <div><span>Scripture-centered help</span><h2 id="care-title">Counsel &amp; Defense</h2></div>
        <button class="care-close" type="button" data-care-close aria-label="Close counseling and apologetics">×</button>
      </header>
      <div class="care-app">
        <div class="care-toolbar">
          <div class="care-tabs" role="tablist" aria-label="Choose a library">
            <button type="button" role="tab" id="care-tab-counseling" aria-controls="care-library" aria-selected="true" data-care-mode="counseling">Biblical Counseling</button>
            <button type="button" role="tab" id="care-tab-apologetics" aria-controls="care-library" aria-selected="false" data-care-mode="apologetics">Apologetics</button>
          </div>
          <label class="care-search">
            <span class="sr-only">Search this library</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.2 4.2"/></svg>
            <input type="search" data-care-search placeholder="Search counseling topics…" autocomplete="off">
          </label>
        </div>
        <div class="care-notice" data-care-notice><strong>Biblical counsel for real life.</strong><span>Explore a topic, read Scripture in context, and identify a faithful next step.</span></div>
        <div class="care-layout" id="care-library" role="tabpanel" aria-labelledby="care-tab-counseling">
          <aside class="care-catalog" aria-label="Library topics">
            <div class="care-catalog-meta"><span data-care-count>Loading library…</span><button type="button" data-care-clear hidden>Clear search</button></div>
            <div class="care-list" data-care-list></div>
          </aside>
          <article class="care-detail" data-care-detail aria-live="polite"></article>
        </div>
      </div>
    </section>
  </div>`;

const signsLayerMarkup = `
  <div class="signs-layer" hidden>
    <div class="signs-backdrop" data-signs-close></div>
    <section class="signs-dialog" role="dialog" aria-modal="true" aria-labelledby="signs-title" tabindex="-1">
      <header class="signs-header">
        <div><span>Safety guide</span><h2 id="signs-title">Know the Signs</h2></div>
        <button class="signs-close" type="button" data-signs-close aria-label="Close safety guide">×</button>
      </header>
      <div class="signs-body">
        <p class="signs-intro">Abuse is not only physical. It can be a pattern of behaviors used to gain or maintain power and control over another person.</p>
        <aside class="urgent-help" aria-label="Immediate help">
          <strong>If you may be in danger</strong>
          <p>Call <a href="tel:911">911</a> for immediate danger. Call or text <a href="tel:988">988</a> for a mental-health or suicide crisis. The National Domestic Violence Hotline is available at <a href="tel:18007997233">800-799-SAFE (7233)</a>, by texting <strong>START</strong> to <a href="sms:88788">88788</a>, or through <a href="https://www.thehotline.org/" target="_blank" rel="noreferrer">TheHotline.org</a>.</p>
          <p class="device-warning">If your device may be monitored, use a safer device when possible and clear your browsing history only if doing so will not increase risk.</p>
        </aside>
        <div class="signs-grid">
          <article><span>01</span><h3>Control</h3><p>Making decisions for you, controlling where you go, what you wear, your medical care, work, faith, or daily choices.</p></article>
          <article><span>02</span><h3>Isolation</h3><p>Separating you from family, friends, support, transportation, money, communication, or sources of independence.</p></article>
          <article><span>03</span><h3>Humiliation</h3><p>Insults, public or private degradation, constant blame, denying your reality, or using shame to keep you compliant.</p></article>
          <article><span>04</span><h3>Monitoring</h3><p>Demanding passwords, tracking your location, reading messages, repeated accusations, stalking, or constant check-ins.</p></article>
          <article><span>05</span><h3>Intimidation</h3><p>Threats, weapons, frightening gestures, destroying property, harming pets, reckless driving, or threats involving children.</p></article>
          <article><span>06</span><h3>Coercion</h3><p>Pressuring or forcing sexual activity, withholding necessities, controlling finances, or punishing you for saying no.</p></article>
        </div>
        <section class="trauma-note">
          <span>Trauma is real—and help is available</span>
          <h3>PTSD can keep the nervous system on alert.</h3>
          <p>Intrusive memories, avoidance, changes in mood or beliefs, and feeling constantly on guard can be trauma responses. They deserve care from a qualified professional. Trauma can explain a struggle, but it does not excuse harming or controlling another person.</p>
        </section>
        <section class="support-note">
          <h3>If you recognize these signs</h3>
          <p>You do not have to confront anyone or decide everything today. Consider speaking privately with a trained advocate, documenting only when it is safe, and making a personalized safety plan. If you are supporting someone else, listen without blame, respect their choices, and help them connect with expert support.</p>
          <div class="official-resources">
            <a href="https://www.thehotline.org/identify-abuse/domestic-abuse-warning-signs/" target="_blank" rel="noreferrer">Domestic abuse warning signs ↗</a>
            <a href="https://safety-plan.thehotline.org/" target="_blank" rel="noreferrer">Create a safety plan ↗</a>
            <a href="https://www.ptsd.va.gov/understand/what/ptsd_basics.asp" target="_blank" rel="noreferrer">VA PTSD information ↗</a>
          </div>
        </section>
        <p class="signs-disclaimer">This guide provides general education, not a diagnosis, legal advice, or emergency services.</p>
      </div>
    </section>
  </div>`;

let readerDock = document.querySelector(".reader-dock");
if (!readerDock) {
  document.body.insertAdjacentHTML("beforeend", readerDockMarkup);
  readerDock = document.querySelector(".reader-dock");
} else if (!readerDock.querySelector(".care-trigger")) {
  const signsTrigger = readerDock.querySelector(".signs-trigger");
  if (signsTrigger) signsTrigger.insertAdjacentHTML("beforebegin", careTriggerMarkup);
  else readerDock.insertAdjacentHTML("beforeend", careTriggerMarkup);
}

if (!document.querySelector(".care-layer")) document.body.insertAdjacentHTML("beforeend", careLayerMarkup);
if (!document.querySelector(".signs-layer")) document.body.insertAdjacentHTML("beforeend", signsLayerMarkup);
