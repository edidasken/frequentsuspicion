const acts = [
  { number: "I", title: "The Wreckage", note: "Confession without disguise. The fire is named, the choices owned, and the heart brought into the light.", image: "assets/album-cover.png" },
  { number: "II", title: "The Rebuilding", note: "Surrender becomes formation. God teaches the wounded heart to live, love, remain, and remember its birthright.", image: "assets/album-cover.png" },
  { number: "III", title: "The Reckoning", note: "Discernment sharpens. Masks fall, silence is confronted, and mercy refuses to abandon justice.", image: "assets/album-cover.png" },
  { number: "IV", title: "The Commission", note: "The inward war becomes a warning, a witness, and a legacy carried beyond the ruins.", image: "assets/album-cover.png" }
];

const tracks = [
  ["My Dumpster Fire", "my-dumpster-fire", "wpFhJ3jKb0U", 0],
  ["Every Day Was Sin", "every-day-was-sin", "_2Wk_vCBvKk", 0],
  ["Confront Me, God", "confront-me-god", "31Sl5O1zVMA", 0],
  ["Break Me", "break-me", "V50cgUUUjbQ", 0],
  ["A Prayer to The God of My Life", "a-prayer-to-the-god-of-my-life", "4-eC1qJTju4", 0],
  ["Teach Me to Live", "teach-me-to-live", "lomGMdugZx8", 1],
  ["Mend the Broken Portrait", "mend-the-broken-portrait", "zjPosOlvkd8", 1],
  ["Biblical Love", "biblical-love", "KFDz64r4C0c", 1],
  ["Covenant", "covenant", "0ugK3tQfaQ0", 1],
  ["Birthright", "birthright", "GjXvRR1Mo3A", 1],
  ["The Many Wolves in Masks", "the-many-wolves-in-masks", "dWfHapzIpFs", 2],
  ["The Little Lukewarm Church", "the-little-lukewarm-church", "6MhyeDC0jsQ", 2],
  ["Shepherds of Silence", "shepherds-of-silence", "9d4PEPhWK5M", 2],
  ["The Battle for Your Soul", "the-battle-for-your-soul", "-jNWRVneE8c", 3],
  ["A Million Times Over", "a-million-times-over", "uS_KB19t7II", 3],
  ["Carry It Forward", "carry-it-forward", "B_CWZr-zlgI", 3]
].map(([title, slug, video, act], index) => ({ title, slug, video, act, number: index + 1 }));

const escapeHtml = value => value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);

function cleanSource(raw, title) {
  let lines = raw.replace(/\r/g, "").split("\n");
  const hashIndex = lines.findIndex(line => line.trim().startsWith("#"));
  if (hashIndex >= 0) lines = lines.slice(0, hashIndex);
  lines = lines.filter(line => !/^(?:@FrequentSuspicion\b|.*\bby\s+@FrequentSuspicion\b|A Song\/Video about\b|Music, lyrics, and visual concept\b)/i.test(line.trim()));

  // Publishing/performance cues are not lyrics and should never enter the reader.
  lines = lines.filter(line => !/^\s*(?:\*{1,2})?(?:ending\s+(?:with|in)\b|guitar\s+solo\b|fade\s+(?:out|to)\b|instrumental\s+(?:break|solo)\b|music\s+(?:continues|fades)\b).*?(?:\*{1,2})?\s*$/i.test(line));

  const firstSection = lines.findIndex(line => /^\s*[[(](intro|opening|verse|chorus|pre-chorus|build|breakdown|bridge|interlude|instrumental|outro|final|closing|repeat)/i.test(line));
  if (firstSection > 0) lines = lines.slice(firstSection);

  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines.at(-1).trim()) lines.pop();
  return lines.join("\n");
}

function renderLyrics(raw) {
  const lines = raw.split("\n");
  const sections = [];
  let current = { label: "", body: [] };

  const flush = () => {
    if (current.label || current.body.some(Boolean)) sections.push(current);
    current = { label: "", body: [] };
  };

  lines.forEach(line => {
    const trimmed = line.trim();
    const section = trimmed.match(/^[[(](.+?)[\])]/);
    if (section) {
      flush();
      current.label = section[1]
        .replace(/\*+/g, "")
        .replace(/,?\s*(?:ending\s+(?:with|in)|with)\s+(?:a\s+)?(?:guitar\s+)?solo.*$/i, "")
        .trim();
    } else {
      current.body.push(line.replace(/\s+$/, ""));
    }
  });
  flush();

  return sections.map(section => {
    const type = section.label.toLowerCase();
    const cls = type.includes("chorus") || type.includes("anthem") ? "is-chorus" : type.includes("breakdown") ? "is-breakdown" : "";
    const body = section.body.join("\n").trim();
    if (!body) return "";
    return `<div class="lyric-section ${cls}">${section.label ? `<span class="section-label">${escapeHtml(section.label)}</span>` : ""}<p>${escapeHtml(body)}</p></div>`;
  }).join("");
}

function buildNavigation() {
  const nav = document.querySelector("#track-nav");
  nav.innerHTML = acts.map((act, actIndex) => {
    const links = tracks.filter(track => track.act === actIndex).map(track => `<button class="track-link" type="button" data-index="${track.number - 1}"><span>${String(track.number).padStart(2, "0")}</span><span>${escapeHtml(track.title)}</span></button>`).join("");
    return `<div class="act-label">Act ${act.number} · ${act.title}</div>${links}`;
  }).join("");
}

const lyricCache = new Map();
let activeIndex = 0;
let youtubePlayer = null;
let youtubePlayerReady = false;

function playerUrl(videoId, autoplay) {
  const origin = encodeURIComponent(window.location.origin);
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&enablejsapi=1&playsinline=1&cc_load_policy=0&origin=${origin}${autoplay ? "&autoplay=1" : ""}`;
}

function setPlayerTrack(track, autoplay) {
  if (youtubePlayerReady && youtubePlayer) {
    if (autoplay) youtubePlayer.loadVideoById(track.video);
    else youtubePlayer.cueVideoById(track.video);
    return;
  }
  document.querySelector("#video-player").src = playerUrl(track.video, autoplay);
}

window.onYouTubeIframeAPIReady = () => {
  youtubePlayer = new window.YT.Player("video-player", {
    events: {
      onReady: () => {
        youtubePlayerReady = true;
        youtubePlayer.setOption("captions", "track", {});
      },
      onStateChange: event => {
        if (event.data === window.YT.PlayerState.ENDED && activeIndex < tracks.length - 1) {
          loadTrack(activeIndex + 1, true);
        }
      }
    }
  });
};

function initializeYouTubeApi() {
  const script = document.createElement("script");
  script.src = "https://www.youtube.com/iframe_api";
  script.async = true;
  document.head.appendChild(script);
}

async function loadTrack(index, autoplay = false) {
  activeIndex = (index + tracks.length) % tracks.length;
  const track = tracks[activeIndex];
  const act = acts[track.act];
  document.querySelectorAll(".track-link").forEach(button => button.classList.toggle("active", Number(button.dataset.index) === activeIndex));
  const activeButton = document.querySelector(`.track-link[data-index="${activeIndex}"]`);
  if (autoplay) activeButton?.scrollIntoView({ block: "nearest", inline: "nearest" });

  document.querySelector("#active-kicker").textContent = `Track ${String(track.number).padStart(2, "0")} · Act ${act.number} · ${act.title}`;
  document.querySelector("#active-title").textContent = track.title;
  document.querySelector("#lyrics-title").textContent = track.title;
  document.querySelector("#track-position").textContent = `${String(track.number).padStart(2, "0")} / ${tracks.length}`;
  document.querySelector("#active-act-note").textContent = act.note;
  document.querySelector("#youtube-link").href = `https://www.youtube.com/watch?v=${track.video}`;
  setPlayerTrack(track, autoplay);

  const lyricsPanel = document.querySelector("#active-lyrics");
  lyricsPanel.innerHTML = "<div class='loading'>Opening the lyrics…</div>";
  if (!lyricCache.has(track.slug)) {
    const response = await fetch(`lyrics/${track.slug}.txt`);
    lyricCache.set(track.slug, renderLyrics(cleanSource(await response.text(), track.title)));
  }
  lyricsPanel.innerHTML = lyricCache.get(track.slug);
  lyricsPanel.scrollTop = 0;
}

function buildActGrid() {
  document.querySelector("#act-grid").innerHTML = acts.map((act, index) => {
    const actTracks = tracks.filter(track => track.act === index);
    return `<article class="act-card"><div class="act-card-image" style="background-image:url('${act.image}')"></div><span>Act ${act.number}</span><h3>${act.title}</h3><p>${act.note}</p><button type="button" data-start="${actTracks[0].number - 1}">Begin with “${escapeHtml(actTracks[0].title)}” →</button></article>`;
  }).join("");
}

buildNavigation();
buildActGrid();
document.querySelectorAll(".track-link").forEach(button => button.addEventListener("click", () => loadTrack(Number(button.dataset.index), true)));
document.querySelectorAll("[data-start]").forEach(button => button.addEventListener("click", () => {
  document.querySelector("#album").scrollIntoView({ behavior: "smooth" });
  loadTrack(Number(button.dataset.start), true);
}));
document.querySelector("#previous-track").addEventListener("click", () => loadTrack(activeIndex - 1, true));
document.querySelector("#next-track").addEventListener("click", () => loadTrack(activeIndex + 1, true));
initializeYouTubeApi();
loadTrack(0).catch(error => {
  console.error(error);
  document.querySelector("#active-lyrics").innerHTML = "<div class='loading'>The lyrics could not be opened.</div>";
});
