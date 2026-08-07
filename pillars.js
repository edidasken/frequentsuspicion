(() => {
  const pillars = {
    honesty: {
      number: "01",
      title: "Radical Honesty",
      lead: "Healing begins when the edited testimony ends.",
      story: [
        "Radical honesty is the decision to stop managing the evidence. It names sin as sin, trauma as trauma, harm as harm, and grief as grief. It refuses both self-exaltation and self-erasure. The goal is not public humiliation; it is to stand uncovered before God, where confession can become repentance instead of performance.",
        "Within this journey, honesty is the doorway through which every later movement must pass. What remains concealed keeps directing the story from the shadows. What is brought into the light can finally be grieved, confronted, forgiven, and changed."
      ],
      verses: [
        { reference: "Proverbs 28:13", excerpt: "“confesses and forsakes them”", note: "Confession is joined to turning away, and mercy meets the person who stops hiding.", url: "https://www.esv.org/verses/Proverbs+28:13/" },
        { reference: "Psalm 139:23–24", note: "David asks God to search the hidden heart, expose what is grievous, and lead him in the everlasting way.", url: "https://www.esv.org/verses/Psalm+139:23-24/" },
        { reference: "1 John 1:9", note: "God is faithful and just to forgive confessed sin and cleanse His people from unrighteousness.", url: "https://www.esv.org/verses/1+John+1:9/" }
      ]
    },
    grace: {
      number: "02",
      title: "Grace & Truth",
      lead: "Biblical mercy never requires reality to disappear.",
      story: [
        "Grace without truth becomes permission to continue what destroys people. Truth without grace becomes a weapon that can identify a wound while refusing to help carry it. In Christ, these are not rivals. He sees completely, speaks truthfully, and moves toward sinners and sufferers with redemptive love.",
        "This pillar protects both repentance and the wounded. Forgiveness is not denial, reconciliation is not pretending, and mercy does not call evil peace. Grace creates room to tell the whole truth because the purpose of truth is restoration—not spectacle or revenge."
      ],
      verses: [
        { reference: "John 1:14", excerpt: "“grace and truth”", note: "Jesus embodies both perfectly; Christian love must not divide what is united in Him.", url: "https://www.esv.org/verses/John+1:14/" },
        { reference: "Ephesians 4:15", note: "Speaking truth in love is part of growing together into the maturity and character of Christ.", url: "https://www.esv.org/verses/Ephesians+4:15/" },
        { reference: "Zechariah 7:9", note: "God joins true judgment with kindness and mercy toward one another.", url: "https://www.esv.org/verses/Zechariah+7:9/" }
      ]
    },
    accountability: {
      number: "03",
      title: "Accountability",
      lead: "Authority is stewardship, and stewardship answers to God.",
      story: [
        "Accountability means that influence, leadership, and spiritual language never place a person beyond examination. The greater the trust, the greater the responsibility to protect, tell the truth, receive correction, and answer for the fruit produced under that authority.",
        "Silence is not always neutral. When leaders protect comfort, image, or institution while wounded people remain exposed, passivity becomes part of the harm. Biblical accountability is not a hunger for punishment; it is the courageous work of correction, protection, repentance, and faithful restoration."
      ],
      verses: [
        { reference: "James 3:1", excerpt: "“judged with greater strictness”", note: "Those who teach carry heightened responsibility for what their words and example produce.", url: "https://www.esv.org/verses/James+3:1/" },
        { reference: "Ezekiel 34:2–4", note: "God confronts shepherds who feed themselves while neglecting, exploiting, and failing to strengthen the flock.", url: "https://www.esv.org/verses/Ezekiel+34:2-4/" },
        { reference: "Galatians 6:1–2", note: "Restoration should be gentle, watchful, and willing to bear another person’s burden.", url: "https://www.esv.org/verses/Galatians+6:1-2/" }
      ]
    },
    legacy: {
      number: "04",
      title: "Redemptive Legacy",
      lead: "The past cannot be rewritten, but it does not have to be repeated.",
      story: [
        "Redemptive legacy is what happens when suffering becomes responsibility rather than inheritance. The scars remain honest, but they no longer point only backward. They become warnings, testimonies, boundaries, compassion, and a different pattern offered to children and to everyone who comes after.",
        "Redemption does not rename evil as good. It declares that God can work through what was meant for destruction without approving the destruction itself. Comfort received becomes comfort given. Lessons learned in the wreckage become truth carried forward."
      ],
      verses: [
        { reference: "Genesis 50:20", excerpt: "“God meant it for good”", note: "Joseph distinguishes human evil from God’s sovereign ability to preserve life through it.", url: "https://www.esv.org/verses/Genesis+50:20/" },
        { reference: "2 Corinthians 1:3–4", note: "The comfort received from God equips sufferers to comfort others in their affliction.", url: "https://www.esv.org/verses/2+Corinthians+1:3-4/" },
        { reference: "Psalm 78:4", note: "God’s works are to be told to the coming generation rather than hidden from them.", url: "https://www.esv.org/verses/Psalm+78:4/" }
      ]
    }
  };

  const layer = document.querySelector(".pillar-layer");
  const dialog = document.querySelector(".pillar-dialog");
  if (!layer || !dialog) return;
  let returnFocus = null;

  function closePillar() {
    layer.hidden = true;
    document.body.classList.remove("dialog-open");
    document.body.classList.remove("pillar-open");
    returnFocus?.focus();
  }

  function openPillar(key, trigger) {
    const pillar = pillars[key];
    if (!pillar) return;
    returnFocus = trigger;
    document.querySelector("#pillar-dialog-number").textContent = `Pillar ${pillar.number}`;
    document.querySelector("#pillar-dialog-title").textContent = pillar.title;
    document.querySelector("#pillar-dialog-lead").textContent = pillar.lead;
    document.querySelector("#pillar-story").innerHTML = pillar.story.map(paragraph => `<p>${paragraph}</p>`).join("");
    document.querySelector("#pillar-verses").innerHTML = pillar.verses.map(verse => `<article><div><span>Supporting Scripture</span><h3>${verse.reference}</h3></div>${verse.excerpt ? `<blockquote>${verse.excerpt} <small>ESV</small></blockquote>` : ""}<p>${verse.note}</p><a href="${verse.url}" target="_blank" rel="noreferrer">Read ${verse.reference} in the ESV →</a></article>`).join("");
    layer.hidden = false;
    document.body.classList.add("dialog-open");
    document.body.classList.add("pillar-open");
    dialog.focus();
    window.fsAnalytics?.track("pillar_open", { pillar_name: pillar.title, pillar_number: pillar.number });
  }

  document.querySelectorAll("[data-pillar]").forEach(button => button.addEventListener("click", () => openPillar(button.dataset.pillar, button)));
  document.querySelectorAll("[data-pillar-close]").forEach(button => button.addEventListener("click", closePillar));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !layer.hidden) closePillar();
  });
  dialog.addEventListener("keydown", event => {
    if (event.key !== "Tab") return;
    const focusable = [...dialog.querySelectorAll("a[href], button:not([disabled])")];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
})();
