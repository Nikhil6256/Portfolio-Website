import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`,
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);

  const projects = [
    {
      name: "Insurance Cost Prediction System",
      category: "Machine Learning Web App",
      tools: "FastAPI, Streamlit, Scikit-learn, Python",
      image: "/images/insurance-preview.webp",
      link: "https://insurance-predictor-vnyn48uakqkpda9fxccm5z.streamlit.app/#insurance-premium-category-predictor"
    },
    {
      name: "Chemical Product E-commerce",
      category: "E-commerce Website",
      tools: "Web Development, Responsive Design",
      image: "/images/chemical-preview.webp",
      link: "https://vbjbuildingchemicals.com/"
    },
    {
      name: "Social Media Agency",
      category: "Agency Website",
      tools: "React, CSS Animations, GSAP, Responsive Design, Multi-page Layout, SEO Optimization, Contact Form Integration",
      image: "/images/agency-preview.webp",
      link: "https://www.cybronixprojects.com/"
    }
  ];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-live-link"
                  data-cursor="disable"
                >
                  View Live Site ↗
                </a>
              </div>
              <WorkImage image={project.image} alt={project.name} link={project.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
