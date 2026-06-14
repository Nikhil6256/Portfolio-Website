import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  _words?: HTMLSpanElement[];
  _chars?: HTMLSpanElement[];
  _originalHTML?: string;
}

// Lightweight custom word splitter (replaces gsap-trial/SplitText)
function splitIntoWords(el: ParaElement): HTMLSpanElement[] {
  el._originalHTML = el.innerHTML;
  const words = el.innerText.split(/\s+/).filter(Boolean);
  el.innerHTML = words
    .map((w) => `<span class="split-word" style="display:inline-block;overflow:hidden;"><span class="split-word-inner" style="display:inline-block;">${w}</span></span>`)
    .join(" ");
  return Array.from(el.querySelectorAll(".split-word-inner"));
}

function splitIntoChars(el: ParaElement): HTMLSpanElement[] {
  el._originalHTML = el.innerHTML;
  const text = el.innerText;
  el.innerHTML = text
    .split("")
    .map((c) =>
      c === " "
        ? " "
        : `<span class="split-char" style="display:inline-block;">${c}</span>`
    )
    .join("");
  return Array.from(el.querySelectorAll(".split-char"));
}

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;

  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");

    // Kill previous animation if any
    if (para.anim) {
      para.anim.progress(1).kill();
    }
    // Revert to original HTML if already split
    if (para._originalHTML !== undefined) {
      para.innerHTML = para._originalHTML;
    }

    const wordInners = splitIntoWords(para);

    para.anim = gsap.fromTo(
      wordInners,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });

  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
    }
    if (title._originalHTML !== undefined) {
      title.innerHTML = title._originalHTML;
    }

    const chars = splitIntoChars(title);

    title.anim = gsap.fromTo(
      chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });

  ScrollTrigger.addEventListener("refresh", () => setSplitText());
}
