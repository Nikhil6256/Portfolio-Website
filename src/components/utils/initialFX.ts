import gsap from "gsap";

// Custom char splitter — replaces gsap-trial/SplitText
// Splits element text into individual <span> chars and returns them.
// Call ONCE per element — do NOT call again on the same element.
function splitIntoChars(selector: string): HTMLSpanElement[] {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return [];
  const text = el.innerText;
  el.innerHTML = text
    .split("")
    .map((c) =>
      c === " "
        ? "&nbsp;"
        : `<span class="split-char" style="display:inline-block;">${c}</span>`
    )
    .join("");
  return Array.from(el.querySelectorAll<HTMLSpanElement>(".split-char"));
}

function splitMultipleIntoChars(selectors: string[]): HTMLSpanElement[] {
  return selectors.flatMap((s) => splitIntoChars(s));
}

export function initialFX() {
  document.body.style.overflowY = "auto";
  document.getElementsByTagName("main")[0]?.classList.add("main-active");

  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  // ── Landing intro chars (split ONCE, animate in) ──────────────────────
  const landingChars = splitMultipleIntoChars([
    ".landing-info h3",
    ".landing-intro h2",
    ".landing-intro h1",
  ]);
  gsap.fromTo(
    landingChars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  // ── Looping text (split ONCE each, reuse for loop) ────────────────────
  //   .landing-h2-info   = first text shown (inside plain h2)
  //   .landing-h2-info-1 = second text (absolutely positioned on top)
  //   .landing-h2-1      = first text shown (inside .landing-info-h2)
  //   .landing-h2-2      = second text (absolutely positioned on top)

  const h2InfoChars  = splitIntoChars(".landing-h2-info");   // chars1 – visible first
  const h2Info1Chars = splitIntoChars(".landing-h2-info-1"); // chars2 – starts hidden
  const h21Chars     = splitIntoChars(".landing-h2-1");       // chars1 – visible first
  const h22Chars     = splitIntoChars(".landing-h2-2");       // chars2 – starts hidden

  // Immediately hide "second" texts so they don't flash before loop brings them in
  gsap.set([h2Info1Chars, h22Chars], { opacity: 0, y: 80 });

  // Animate the first visible texts in on load
  gsap.fromTo(
    h2InfoChars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  // Start looping — using the SAME char arrays (no re-split)
  LoopText(h2InfoChars, h2Info1Chars);
  LoopText(h21Chars, h22Chars);
}

/**
 * Creates an infinite loop that alternates between chars1 (visible first)
 * and chars2 (hidden first, comes in after delay seconds).
 */
function LoopText(chars1: HTMLSpanElement[], chars2: HTMLSpanElement[]) {
  const switchDelay = 4;   // seconds before first switch
  const cycleGap   = 1;    // repeatDelay between cycles

  const tl = gsap.timeline({ repeat: -1, repeatDelay: cycleGap });

  // Phase 1: chars1 exits ↑, chars2 enters ↑ (after switchDelay)
  tl.to(chars1, {
      y: -80,
      opacity: 0,
      duration: 0.8,
      ease: "power2.in",
      stagger: 0.04,
      delay: switchDelay,
    }, 0)
    .to(chars2, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.04,
      delay: switchDelay + 0.2,   // slight offset so it feels like a swap
    }, 0)

  // Phase 2: chars2 exits ↑, chars1 comes back ↑ (another switchDelay later)
    .to(chars2, {
      y: -80,
      opacity: 0,
      duration: 0.8,
      ease: "power2.in",
      stagger: 0.04,
      delay: switchDelay,
    }, switchDelay + 1.5)   // start this phase after chars2 is fully in
    .to(chars1, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.04,
      delay: switchDelay + 0.2,
    }, switchDelay + 1.5)

  // Reset positions for next cycle
    .set(chars1, { y: 80, opacity: 0 }, 0)
    .set(chars1, { y: 0, opacity: 1 }, "<+=0.9");

  return tl;
}
