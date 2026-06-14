import gsap from "gsap";

// Custom char splitter — replaces gsap-trial/SplitText
function splitChars(selectors: string[]): HTMLSpanElement[] {
  const chars: HTMLSpanElement[] = [];
  selectors.forEach((selector) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      const text = el.innerText;
      el.innerHTML = text
        .split("")
        .map((c) =>
          c === " "
            ? " "
            : `<span class="split-char" style="display:inline-block;">${c}</span>`
        )
        .join("");
      chars.push(...Array.from(el.querySelectorAll<HTMLSpanElement>(".split-char")));
    });
  });
  return chars;
}

export function initialFX() {
  document.body.style.overflowY = "auto";
  // No smoother.paused(false) needed — native scroll is always active
  document.getElementsByTagName("main")[0]?.classList.add("main-active");

  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  const landingChars = splitChars([
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

  const landingInfo2Chars = splitChars([".landing-h2-info"]);
  gsap.fromTo(
    landingInfo2Chars,
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

  // Loop text animations for landing alternating text
  const h2InfoChars = splitCharsForLoop(".landing-h2-info");
  const h2Info1Chars = splitCharsForLoop(".landing-h2-info-1");
  const h21Chars = splitCharsForLoop(".landing-h2-1");
  const h22Chars = splitCharsForLoop(".landing-h2-2");

  LoopText(h2InfoChars, h2Info1Chars);
  LoopText(h21Chars, h22Chars);
}

function splitCharsForLoop(selector: string): HTMLSpanElement[] {
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

function LoopText(chars1: HTMLSpanElement[], chars2: HTMLSpanElement[]) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
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
