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
        ? " "
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

  // --- Landing intro text (split once, animate in) ---
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

  // --- Looping text (split once, used for initial anim + loop) ---
  // .landing-h2-info = "ML Engineer" (visible first, loops with .landing-h2-info-1)
  // .landing-h2-info-1 = "Developer"
  const h2InfoChars = splitIntoChars(".landing-h2-info");
  const h2Info1Chars = splitIntoChars(".landing-h2-info-1");

  // .landing-h2-1 = "Developer" (visible first, loops with .landing-h2-2)
  // .landing-h2-2 = "ML Engineer"
  const h21Chars = splitIntoChars(".landing-h2-1");
  const h22Chars = splitIntoChars(".landing-h2-2");

  // Animate .landing-h2-info in on load (same as original SplitText behavior)
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

  // Start looping animations — using same char arrays (no re-split!)
  LoopText(h2InfoChars, h2Info1Chars);
  LoopText(h21Chars, h22Chars);
}

function LoopText(chars1: HTMLSpanElement[], chars2: HTMLSpanElement[]) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1; // 9

  tl
    // At timeline position 0: bring chars2 in (after 4s), send chars1 out (after 4s)
    .fromTo(
      chars2,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    .fromTo(
      chars1,
      { y: 0 },
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    // At timeline position 1: bring chars1 back (after 9s), send chars2 out (after 9s)
    .fromTo(
      chars1,
      { y: 80 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .to(
      chars2,
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}
