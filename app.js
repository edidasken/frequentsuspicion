const album = ({ slug, number, title, subtitle, movement, question, artwork, story, tracks, sections = [], playlist = "" }) => ({
  slug, number, title, subtitle, movement, question, artwork, story, tracks, sections, playlist
});

const song = (title, slug, summary, { video = "", section = 0, lyrics = false } = {}) => ({
  title, slug, summary, video, section, lyrics
});

const albums = [
  album({
    slug: "the-war-came-home",
    number: "I",
    title: "The War Came Home",
    subtitle: "Recognizing the Destruction",
    movement: "The Wound / The Soldier Returns",
    question: "Why is the war still here when the war is over?",
    artwork: "assets/artwork/the-war-came-home-site-textless.png",
    playlist: "https://www.youtube.com/playlist?list=PLPo3bQ3s4tZE",
    story: [
      "The War Came Home was written to name what happened when the battlefield did not remain overseas. The body returned, but vigilance, memory, fear, sleeplessness, and the instinct to search for danger came home too. These songs move through quiet rooms, fractured perception, interrupted celebrations, and the exhausting distance between knowing you are safe and actually feeling safe. They tell the truth about PTSD without allowing trauma to become the complete definition of the man carrying it.",
      "The purpose of this album is recognition. A wound cannot be healed while it remains unnamed, and suffering cannot be understood while it is treated only as weakness or failure. The album does not use trauma to excuse harm; it gives language to the battle so responsibility and compassion can exist together. In the darkest valley, the Shepherd is still present. Beneath the startle response, there is still a man—and the wound is not the end of his identity."
    ],
    tracks: [
      song("The War Came Home", "the-war-came-home", "The realization that the battlefield followed him home. Trauma is no longer overseas; it lives in quiet rooms, relationships, and memories.", { video: "RAQVldP7EG0", lyrics: true }),
      song("When the Night Goes Quiet", "when-the-night-goes-quiet", "The loneliness of the watchman. When the world sleeps, the mind stays awake.", { video: "OMIBkj7bos8", lyrics: true }),
      song("Shattered Lens", "shattered-lens", "Trauma changes perception. Survival skills can become barriers to peace.", { video: "TwCvTTnEaAM", lyrics: true }),
      song("Wounded, But Still Going", "wounded-but-still-going", "Being wounded does not mean being defeated.", { video: "Rwn6RK86z9U", lyrics: true }),
      song("September in July", "september-in-july", "Celebration and trauma collide when a beautiful moment becomes a doorway into the past.", { video: "WGGmb7bDTD4", lyrics: true }),
      song("The Darkest Valley", "the-darkest-valley", "Suffering is faced while discovering that the Shepherd is present in the valley.", { video: "l4CSMFyyFt0", lyrics: true }),
      song("Sleep Don’t Come Easy", "sleep-dont-come-easy", "The body continues fighting after the battle—the distance between knowing you are safe and feeling safe.", { video: "-WIDXwftu0Q", lyrics: true }),
      song("When I Close My Eyes", "when-i-close-my-eyes", "The struggle of rest, memory, and what appears when everything becomes quiet.", { video: "HAEO8xOXI90", lyrics: true }),
      song("The Man Behind the Startle", "the-man-behind-the-startle", "The reaction is not the identity. There is still a man beyond the trauma response.", { video: "-C6pngc4otA", lyrics: true })
    ]
  }),
  album({
    slug: "the-reckoning",
    number: "II",
    title: "The Reckoning",
    subtitle: "The Story and The Truth",
    movement: "The Story They Told / The Truth Revealed",
    question: "Who gets to define who I am?",
    artwork: "assets/artwork/the-reckoning-site-textless.png",
    playlist: "https://www.youtube.com/playlist?list=PLBK0aBG9kNY4",
    story: [
      "The Reckoning was written from the struggle over who gets to define a person’s identity. It confronts the stories people construct, the whispers that travel before truth is heard, the difference between public appearance and private reality, and the judgment of those who speak without understanding the full cost. It follows the moment when accusations stop sounding like truth and become what they always were: echoes produced by voices that never possessed final authority.",
      "This is not an album about revenge. It is about discernment, boundaries, and the exposure of borrowed authority. No person, institution, relationship, or accusation has the right to occupy God’s throne. The purpose found in this suffering is the freedom to stop living inside another person’s account of who you are. Truth does not require retaliation. Sometimes the reckoning is complete when the false throne is left empty and the old battlefield no longer receives another day of your life."
    ],
    tracks: [
      song("Broken Me", "broken-me", "They told me who I was. The battle begins against the identity others assigned.", { video: "rhqsSV30VJc", lyrics: true }),
      song("The Watchtower", "the-watchtower", "Discernment, isolation, and seeing what others refused to see.", { video: "w29av97bmKs", lyrics: true }),
      song("It’s Over", "its-over", "Release: leaving the old battlefield and refusing to live there anymore.", { video: "SBnEiGgEpyU", lyrics: true }),
      song("Whispers in the Ear", "whispers-in-the-ear", "How narratives travel before truth gets heard.", { video: "xQObiKvlsTk", lyrics: true }),
      song("Stop Casting Stones", "stop-casting-stones", "The wounded confront those who judged without understanding.", { video: "W4QtQ_hhSg0", lyrics: true }),
      song("Your Words are Echoes", "your-words-are-echoes", "The moment accusations stop controlling identity.", { video: "NqXb__tRKHk", lyrics: true }),
      song("Borrowed Throne", "borrowed-throne", "False authority is exposed. No one gets to take God’s seat.", { video: "mNNBePWIqmk", lyrics: true }),
      song("Your Sunday Best", "your-sunday-best", "The mask—and the distance between appearance and reality.", { video: "Q3TJHs0YXls", lyrics: true }),
      song("What is Next", "what-is-next", "Repentance accepts consequence and asks God who the man must become now.", { video: "qql34ovgOus", lyrics: true })
    ]
  }),
  album({
    slug: "the-restoration",
    number: "III",
    title: "The Restoration",
    subtitle: "Death and Rebirth",
    movement: "The Healing / Becoming Whole",
    question: "Who am I becoming now?",
    artwork: "assets/artwork/the-restoration-site-textless.png",
    playlist: "https://www.youtube.com/playlist?list=PLDV_tezlXhbU",
    story: [
      "The Restoration was written about what happens after survival and confrontation—when the question is no longer only what happened, but who you are becoming now. These songs follow the ending of destructive cycles, the thawing of places that became numb, and the recovery of love as truth and grace rather than disappearance. They return to the well, to childlike dependence on the Father, and to the identity God intended before fear, shame, trauma, and other people’s expectations began competing for authorship.",
      "Restoration does not mean recovering the old life exactly as it was. Some former identities, defenses, dreams, and ways of surviving must be surrendered. That is the death and rebirth at the center of the album. Nothing placed on God’s altar is wasted—not grief, wreckage, memory, or the years spent wandering. The purpose of healing is not merely to feel better. It is to become capable of deeper love, honest surrender, mercy, and a life received from God rather than constructed from pain."
    ],
    tracks: [
      song("The Cycle Ends Here", "the-cycle-ends-here", "The decision that the inherited pattern stops with me."),
      song("The Thaw", "the-thaw", "The frozen places begin to feel and come alive again."),
      song("Deeper Love", "deeper-love", "Love is no longer disappearance; it becomes truth and grace."),
      song("Back to Me", "back-to-me", "Recovering who I was meant to be."),
      song("Still at the Well", "still-at-the-well", "Returning to the source—the place where life comes from."),
      song("Bring Back the Child in Me", "bring-back-the-child-in-me", "Returning to trust and dependence on the Father."),
      song("Don’t Give Me Away Again", "dont-give-me-away-again", "Surrendering a wandering heart and asking not to be left to myself.", { lyrics: true }),
      song("No Waste at the Altar", "no-waste-at-the-altar", "Recognizing that God redeemed even the wreckage."),
      song("I Bow My Knees", "i-bow-my-knees", "Submitting everything back to Him."),
      song("You Still Call My Name", "you-still-call-my-name", "Receiving identity from God instead of people."),
      song("By His Grace", "by-his-grace", "Living from the identity God has given me.", { lyrics: true }),
      song("Death Day", "death-day", "The former versions of me are laid down so I can receive the life God is giving me now.", { video: "sb0rdhJndpg", lyrics: true })
    ]
  }),
  album({
    slug: "carry-it-forward",
    number: "IV",
    title: "Carry It Forward",
    subtitle: "From Wreckage to Redemption",
    movement: "Confession / Formation / Discernment / Commission",
    question: "How can God carry redemption forward through everything that was broken?",
    artwork: "assets/artwork/carry-it-forward-site-textless.png",
    playlist: "https://music.youtube.com/playlist?list=PLYnXteIAoUN8",
    story: [
      "Carry It Forward was written as the culmination of the journey. It begins with confession without disguise, moves through surrender and formation, sharpens into discernment, and ends in commission. These songs own sin without excuses, confront pride and counterfeit love, grieve damaged relationships, challenge spiritual silence, and ask God to rebuild what remains. The narrator is neither edited into the hero nor reduced permanently to his worst choices.",
      "The purpose of this album is to turn testimony into responsibility. The past cannot be rewritten, but it can become a warning, a witness, and a different inheritance. Suffering finds purpose when it produces honesty instead of concealment, compassion instead of cruelty, courage instead of silence, and faithfulness instead of another repeated cycle. Carrying it forward does not mean carrying the wreckage forever. It means allowing God to carry redemption through it so that failure does not receive the final word."
    ],
    sections: [
      { number: "I", title: "The Wreckage", note: "Confession without disguise. The fire is named, the choices are owned, and the heart is brought into the light." },
      { number: "II", title: "The Rebuilding", note: "Surrender becomes formation. God teaches the wounded heart to live, love, remain, and remember its birthright." },
      { number: "III", title: "The Reckoning", note: "Discernment sharpens. Masks fall, silence is confronted, and mercy refuses to abandon justice." },
      { number: "IV", title: "The Commission", note: "The inward war becomes a warning, a witness, and a legacy carried beyond the ruins." }
    ],
    tracks: [
      song("My Dumpster Fire", "my-dumpster-fire", "Owning the ruin without excuses and discovering that grace can still reach the ashes.", { video: "wpFhJ3jKb0U", section: 0, lyrics: true }),
      song("Every Day Was Sin", "every-day-was-sin", "Recognizing that the destruction was a repeated choice made against conviction.", { video: "_2Wk_vCBvKk", section: 0, lyrics: true }),
      song("Confront Me, God", "confront-me-god", "Asking God to expose every hidden motive, idol, lie, and counterfeit refuge.", { video: "31Sl5O1zVMA", section: 0, lyrics: true }),
      song("Break Me", "break-me", "Surrendering pride, self-rule, and every internal kingdom that competes with God.", { video: "V50cgUUUjbQ", section: 0, lyrics: true }),
      song("A Prayer to The God of My Life", "a-prayer-to-the-god-of-my-life", "Releasing vengeance without denying damage; praying for mercy, truth, accountability, justice, and repentance.", { video: "4-eC1qJTju4", section: 0, lyrics: true }),
      song("Teach Me to Live", "teach-me-to-live", "Moving beyond survival, numbness, and isolation and asking God to teach the heart how to become whole.", { video: "lomGMdugZx8", section: 1, lyrics: true }),
      song("Mend the Broken Portrait", "mend-the-broken-portrait", "Asking God to restore the man, father, and identity beneath the fractured family picture.", { video: "zjPosOlvkd8", section: 1, lyrics: true }),
      song("Biblical Love", "biblical-love", "Rejecting selfish desire disguised as love and learning the patient, sacrificial love revealed by Christ.", { video: "KFDz64r4C0c", section: 1, lyrics: true }),
      song("Covenant", "covenant", "Understanding covenant as holy faithfulness rather than something governed by changing feelings.", { video: "0ugK3tQfaQ0", section: 1, lyrics: true }),
      song("Birthright", "birthright", "Recognizing the identity and inheritance traded for rebellion and returning to what God originally gave.", { video: "GjXvRR1Mo3A", section: 1, lyrics: true }),
      song("The Many Wolves in Masks", "the-many-wolves-in-masks", "Recognizing false spiritual authority by its fruit rather than its polished language or appearance.", { video: "dWfHapzIpFs", section: 2, lyrics: true }),
      song("The Little Lukewarm Church", "the-little-lukewarm-church", "Confronting church culture that praises truth but retreats when truth requires courage and action.", { video: "6MhyeDC0jsQ", section: 2, lyrics: true }),
      song("Shepherds of Silence", "shepherds-of-silence", "Holding leaders accountable when passivity and institutional comfort leave wounded people unprotected.", { video: "9d4PEPhWK5M", section: 2, lyrics: true }),
      song("The Battle for Your Soul", "the-battle-for-your-soul", "Warning that compromise begins with belief and worship, and calling others to guard their hearts.", { video: "-jNWRVneE8c", section: 3, lyrics: true }),
      song("A Million Times Over", "a-million-times-over", "Owning the choices that destroyed what was given and allowing the testimony to warn others.", { video: "uS_KB19t7II", section: 3, lyrics: true }),
      song("Carry It Forward", "carry-it-forward", "Asking God to carry faithfulness—not failure—through the narrator, his family, and future generations.", { video: "B_CWZr-zlgI", section: 3, lyrics: true })
    ]
  })
];

const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);

function cleanSource(raw) {
  const lines = raw.replace(/\r/g, "").split("\n");
  const firstSection = lines.findIndex(line => /^\s*\[.+?\]\s*$/.test(line));
  const lyricLines = firstSection >= 0 ? lines.slice(firstSection) : lines;
  while (lyricLines.length && !lyricLines[0].trim()) lyricLines.shift();
  while (lyricLines.length && !lyricLines.at(-1).trim()) lyricLines.pop();
  return lyricLines.join("\n");
}

function renderLyrics(raw) {
  const sections = [];
  let current = { label: "", body: [] };
  const flush = () => {
    if (current.label || current.body.some(Boolean)) sections.push(current);
    current = { label: "", body: [] };
  };

  raw.split("\n").forEach(line => {
    const section = line.trim().match(/^\[(.+?)\]$/);
    if (section) {
      flush();
      current.label = section[1].trim();
    } else {
      current.body.push(line.replace(/\s+$/, ""));
    }
  });
  flush();

  return sections.map(section => {
    const body = section.body.join("\n").trim();
    if (!body) return "";
    const type = section.label.toLowerCase();
    const cls = type.includes("chorus") || type.includes("anthem") ? "is-chorus" : type.includes("breakdown") ? "is-breakdown" : "";
    return `<div class="lyric-section ${cls}">${section.label ? `<span class="section-label">${escapeHtml(section.label)}</span>` : ""}<p>${escapeHtml(body)}</p></div>`;
  }).join("");
}

const albumBySlug = slug => albums.find(item => item.slug === slug) || albums[0];
const lyricCache = new Map();
const routedAlbumSlug = window.location.hash.slice(1) || new URLSearchParams(window.location.search).get("album");
let activeAlbum = albumBySlug(routedAlbumSlug);
let activeIndex = 0;
let youtubePlayer = null;
let youtubePlayerReady = false;
let selectionMethod = "initial_load";
let playingVideoId = "";
let progressTimer = null;
let progressMilestones = new Set();

function buildAlbumJourney() {
  const container = document.querySelector("#album-chapters");
  if (!container) return;
  container.innerHTML = albums.map(item => `
    <article class="album-chapter" id="${item.slug}" data-chapter="${item.slug}">
      <a class="album-chapter-art" href="album.html#${item.slug}" aria-label="Enter the interactive ${escapeHtml(item.title)} album"><img src="${item.artwork}" alt="${escapeHtml(item.title)} album artwork" loading="lazy"></a>
      <div class="album-chapter-copy">
        <p class="eyebrow">Album ${item.number} · ${item.tracks.length} songs</p>
        <h3>${escapeHtml(item.title)}</h3>
        <p class="album-subtitle">${escapeHtml(item.subtitle)}</p>
        <blockquote>“${escapeHtml(item.question)}”</blockquote>
        ${item.story.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join("")}
        <a class="chapter-action" href="album.html#${item.slug}">Enter ${escapeHtml(item.title)} <span aria-hidden="true">→</span></a>
      </div>
    </article>
  `).join("");
  const routedChapter = albumBySlug(window.location.hash.slice(1));
  if (window.location.hash && routedChapter.slug === window.location.hash.slice(1)) {
    window.requestAnimationFrame(() => document.querySelector(`#${routedChapter.slug}`)?.scrollIntoView());
  }
}

function buildAlbumSwitcher() {
  const switcher = document.querySelector("#album-switcher");
  if (!switcher) return;
  switcher.innerHTML = albums.map(item => `<a href="album.html#${item.slug}" data-album-route="${item.slug}"><span>Album ${item.number}</span>${escapeHtml(item.title)}</a>`).join("");
}

function buildNavigation() {
  const nav = document.querySelector("#track-nav");
  const sections = activeAlbum.sections.length ? activeAlbum.sections : [{ number: activeAlbum.number, title: activeAlbum.movement }];
  nav.innerHTML = sections.map((section, sectionIndex) => {
    const links = activeAlbum.tracks
      .map((track, index) => ({ track, index }))
      .filter(({ track }) => activeAlbum.sections.length ? track.section === sectionIndex : true)
      .map(({ track, index }) => `<button class="track-link" type="button" data-index="${index}"><span>${String(index + 1).padStart(2, "0")}</span><span>${escapeHtml(track.title)}</span></button>`)
      .join("");
    const label = activeAlbum.sections.length ? `Act ${section.number} · ${section.title}` : `Movement · ${section.title}`;
    return `<div class="act-label">${escapeHtml(label)}</div>${links}`;
  }).join("");

  nav.querySelectorAll(".track-link").forEach(button => button.addEventListener("click", () => loadTrack(Number(button.dataset.index), true, "track_list")));
}

function buildArchitecture() {
  const section = document.querySelector("#architecture");
  if (!activeAlbum.sections.length) {
    section.hidden = true;
    return;
  }
  section.hidden = false;
  document.querySelector("#architecture-title").innerHTML = "Four acts.<br>One commission.";
  document.querySelector("#architecture-description").textContent = "Carry It Forward has its own four-act structure within the larger four-album journey. Each act moves from confession toward a life commissioned to carry faithfulness forward.";
  document.querySelector("#act-grid").innerHTML = activeAlbum.sections.map((sectionItem, index) => {
    const firstTrackIndex = activeAlbum.tracks.findIndex(track => track.section === index);
    const firstTrack = activeAlbum.tracks[firstTrackIndex];
    return `<article class="act-card"><div class="act-card-image" style="background-image:url('${activeAlbum.artwork}')"></div><span>Act ${sectionItem.number}</span><h3>${escapeHtml(sectionItem.title)}</h3><p>${escapeHtml(sectionItem.note)}</p><button type="button" data-start="${firstTrackIndex}">Begin with “${escapeHtml(firstTrack.title)}” →</button></article>`;
  }).join("");
  document.querySelectorAll("[data-start]").forEach(button => button.addEventListener("click", () => {
    const index = Number(button.dataset.start);
    trackAlbumEvent("movement_start", activeAlbum.tracks[index], { selection_method: "movement_card" });
    document.querySelector("#album").scrollIntoView({ behavior: "smooth" });
    loadTrack(index, true, "movement_card");
  }));
}

function trackAlbumEvent(eventName, track = activeAlbum.tracks[activeIndex], parameters = {}) {
  const section = activeAlbum.sections[track.section];
  window.fsAnalytics?.track(eventName, {
    content_type: "song",
    album_title: activeAlbum.title,
    album_slug: activeAlbum.slug,
    song_title: track.title,
    song_number: activeIndex + 1,
    song_slug: track.slug,
    video_id: track.video || "pending",
    movement_number: section ? track.section + 1 : 1,
    movement_name: section ? `Act ${section.number} · ${section.title}` : activeAlbum.movement,
    ...parameters
  });
}

function listeningEventName(track) {
  return `listening_${track.slug.replaceAll("-", "_")}`;
}

function stopProgressTracking() {
  if (progressTimer) window.clearInterval(progressTimer);
  progressTimer = null;
}

function startProgressTracking() {
  stopProgressTracking();
  progressTimer = window.setInterval(() => {
    if (!youtubePlayerReady || !youtubePlayer) return;
    const duration = youtubePlayer.getDuration();
    const currentTime = youtubePlayer.getCurrentTime();
    if (!duration || !Number.isFinite(currentTime)) return;
    const percent = Math.floor((currentTime / duration) * 100);
    [25, 50, 75].forEach(milestone => {
      if (percent < milestone || progressMilestones.has(milestone)) return;
      progressMilestones.add(milestone);
      trackAlbumEvent("song_progress", activeAlbum.tracks[activeIndex], { percent_complete: milestone, selection_method: selectionMethod });
    });
  }, 1000);
}

function playerUrl(videoId, autoplay) {
  const origin = encodeURIComponent(window.location.origin);
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&enablejsapi=1&playsinline=1&cc_load_policy=0&origin=${origin}${autoplay ? "&autoplay=1" : ""}`;
}

function setPlayerTrack(track, autoplay) {
  const iframe = document.querySelector("#video-player");
  const placeholder = document.querySelector("#video-placeholder");
  if (!track.video) {
    stopProgressTracking();
    if (youtubePlayerReady && youtubePlayer?.stopVideo) youtubePlayer.stopVideo();
    iframe.hidden = true;
    placeholder.hidden = false;
    placeholder.style.backgroundImage = `linear-gradient(rgba(5,6,5,.62), rgba(5,6,5,.9)), url('${activeAlbum.artwork}')`;
    document.querySelector("#video-placeholder-title").textContent = track.title;
    return;
  }
  placeholder.hidden = true;
  iframe.hidden = false;
  if (youtubePlayerReady && youtubePlayer) {
    if (autoplay) youtubePlayer.loadVideoById(track.video);
    else youtubePlayer.cueVideoById(track.video);
  } else {
    iframe.src = playerUrl(track.video, autoplay);
  }
}

window.onYouTubeIframeAPIReady = () => {
  youtubePlayer = new window.YT.Player("video-player", {
    events: {
      onReady: () => {
        youtubePlayerReady = true;
        youtubePlayer.setOption("captions", "track", {});
      },
      onStateChange: event => {
        const track = activeAlbum.tracks[activeIndex];
        if (!track.video) return;
        const playerVideoId = youtubePlayer.getVideoData()?.video_id;
        if (playerVideoId && playerVideoId !== track.video) return;
        if (event.data === window.YT.PlayerState.PLAYING) {
          if (playingVideoId !== track.video) {
            playingVideoId = track.video;
            progressMilestones = new Set();
            trackAlbumEvent("song_start", track, { selection_method: selectionMethod });
            trackAlbumEvent(listeningEventName(track), track, { selection_method: selectionMethod, listening_status: "started" });
          }
          startProgressTracking();
        } else if (event.data === window.YT.PlayerState.PAUSED) {
          stopProgressTracking();
          trackAlbumEvent("song_pause", track, { elapsed_seconds: Math.round(youtubePlayer.getCurrentTime() || 0), selection_method: selectionMethod });
        } else if (event.data === window.YT.PlayerState.ENDED) {
          stopProgressTracking();
          trackAlbumEvent("song_complete", track, { selection_method: selectionMethod });
          if (activeIndex < activeAlbum.tracks.length - 1) loadTrack(activeIndex + 1, true, "automatic_next");
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

function lyricsPlaceholder(track, failed = false) {
  return `<div class="lyrics-unavailable"><span>${failed ? "Lyrics unavailable" : "Track context"}</span><h4>${escapeHtml(track.title)}</h4><p>${escapeHtml(track.summary)}</p><strong>${failed ? "The lyric file could not be opened." : "Official lyrics will be added here when they are ready."}</strong></div>`;
}

async function loadTrack(index, autoplay = false, method = "direct") {
  stopProgressTracking();
  activeIndex = (index + activeAlbum.tracks.length) % activeAlbum.tracks.length;
  selectionMethod = method;
  playingVideoId = "";
  progressMilestones = new Set();
  const track = activeAlbum.tracks[activeIndex];
  const section = activeAlbum.sections[track.section];

  document.querySelectorAll(".track-link").forEach(button => button.classList.toggle("active", Number(button.dataset.index) === activeIndex));
  const activeButton = document.querySelector(`.track-link[data-index="${activeIndex}"]`);
  if (autoplay) activeButton?.scrollIntoView({ block: "nearest", inline: "nearest" });

  const movement = section ? `Act ${section.number} · ${section.title}` : activeAlbum.movement;
  document.querySelector("#active-kicker").textContent = `Track ${String(activeIndex + 1).padStart(2, "0")} · ${movement}`;
  document.querySelector("#active-title").textContent = track.title;
  document.querySelector("#lyrics-title").textContent = track.title;
  document.querySelector("#track-position").textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${activeAlbum.tracks.length}`;
  document.querySelector("#active-act-note").textContent = track.summary;

  const youtubeLink = document.querySelector("#youtube-link");
  youtubeLink.hidden = !track.video;
  youtubeLink.href = track.video ? `https://www.youtube.com/watch?v=${track.video}` : "#";
  setPlayerTrack(track, autoplay);
  trackAlbumEvent("song_view", track, { selection_method: method, autoplay_requested: autoplay, content_status: track.video ? "published" : "coming_soon" });

  const lyricsPanel = document.querySelector("#active-lyrics");
  lyricsPanel.innerHTML = track.lyrics ? "<div class='loading'>Opening the lyrics…</div>" : lyricsPlaceholder(track);
  if (track.lyrics) {
    try {
      if (!lyricCache.has(track.slug)) {
        const response = await fetch(`lyrics/${track.slug}.txt`);
        if (!response.ok) throw new Error("Lyrics unavailable");
        lyricCache.set(track.slug, renderLyrics(cleanSource(await response.text())));
      }
      lyricsPanel.innerHTML = lyricCache.get(track.slug) || lyricsPlaceholder(track, true);
    } catch {
      lyricsPanel.innerHTML = lyricsPlaceholder(track, true);
    }
  }
  lyricsPanel.scrollTop = 0;

  const url = new URL(window.location.href);
  url.searchParams.delete("album");
  url.searchParams.set("track", track.slug);
  url.hash = activeAlbum.slug;
  window.history.replaceState({}, "", url);
}

function setAlbumHeader() {
  document.body.dataset.album = activeAlbum.slug;
  document.title = `${activeAlbum.title} — Interactive Album · FrequentSuspicion`;
  const heroArt = document.querySelector("#album-route-art");
  if (heroArt) {
    heroArt.src = activeAlbum.artwork;
    heroArt.alt = `${activeAlbum.title} album artwork`;
  }
  const routeNumber = document.querySelector("#album-route-number");
  const routeTitle = document.querySelector("#album-route-title");
  const routeSubtitle = document.querySelector("#album-route-subtitle");
  const routeQuestion = document.querySelector("#album-route-question");
  if (routeNumber) routeNumber.textContent = `Album ${activeAlbum.number} · ${activeAlbum.tracks.length} songs`;
  if (routeTitle) routeTitle.textContent = activeAlbum.title;
  if (routeSubtitle) routeSubtitle.textContent = activeAlbum.subtitle;
  if (routeQuestion) routeQuestion.textContent = `“${activeAlbum.question}”`;
  const playlistLink = document.querySelector("#album-playlist-link");
  if (playlistLink) {
    playlistLink.hidden = !activeAlbum.playlist;
    playlistLink.href = activeAlbum.playlist || "#";
    playlistLink.setAttribute("aria-label", `Play the complete ${activeAlbum.title} playlist on YouTube`);
  }
  document.querySelector("#interactive-eyebrow").textContent = `Album ${activeAlbum.number} · ${activeAlbum.movement}`;
  document.querySelector("#interactive-title").textContent = activeAlbum.title;
  document.querySelector("#interactive-description").textContent = `“${activeAlbum.question}” Select a song to watch, listen, and read it in the context of the complete album.`;
  document.querySelector("#rail-album-title").textContent = activeAlbum.title;
  document.querySelector("#rail-album-count").textContent = `${activeAlbum.tracks.length} songs`;
  document.querySelectorAll("[data-album-route], [data-nav-album]").forEach(link => {
    const active = (link.dataset.albumRoute || link.dataset.navAlbum) === activeAlbum.slug;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function loadAlbum(slug, { scroll = false, trackSlug = "", method = "album_select" } = {}) {
  activeAlbum = albumBySlug(slug);
  const requestedIndex = trackSlug ? activeAlbum.tracks.findIndex(track => track.slug === trackSlug) : -1;
  activeIndex = requestedIndex >= 0 ? requestedIndex : 0;
  setAlbumHeader();
  buildNavigation();
  buildArchitecture();
  loadTrack(activeIndex, false, method);
  window.fsAnalytics?.track("album_select", { album_title: activeAlbum.title, album_slug: activeAlbum.slug, album_number: activeAlbum.number });
  if (scroll) document.querySelector("#album")?.scrollIntoView({ behavior: "smooth" });
}

buildAlbumJourney();
if (document.querySelector("#album")) {
  buildAlbumSwitcher();
  document.querySelector("#previous-track").addEventListener("click", () => loadTrack(activeIndex - 1, true, "previous_button"));
  document.querySelector("#next-track").addEventListener("click", () => loadTrack(activeIndex + 1, true, "next_button"));
  window.addEventListener("hashchange", () => {
    const params = new URLSearchParams(window.location.search);
    loadAlbum(window.location.hash.slice(1), { trackSlug: params.get("track") || "", method: "album_route" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  initializeYouTubeApi();
  const initialParams = new URLSearchParams(window.location.search);
  loadAlbum(activeAlbum.slug, { trackSlug: initialParams.get("track") || "", method: "initial_load" });
}
