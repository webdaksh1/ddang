import { useState, useCallback, useRef, useEffect } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "Zolist",
    category: "Dream Drive",
    tools: "React",
    image: "/images/Zolist.png",
  },
  {
    title: "Dawnseas",
    category: "Manga",
    tools: "React",
    image: "/images/Dawnseas.png",
  },
  {
    title: "3d Friction",
    category: "Animation",
    tools: "HTML, CSS, JAVASCRIPT",
    image: "/images/Animation.png",
  },
  {
    title: "Social Hover",
    category: "Social",
    tools: "HTML, CSS",
    image: "/images/social.png",
  },
  {
    title: "Another Portfolio",
    category: "Introducing Myslef",
    tools: "HTML, CSS, Javascript",
    image: "/images/portfolio.png",
  },
];

// Clone last + all originals + first for infinite loop
// Layout: [last, ...originals, first]
// Real index offset = 1
const OFFSET = 1;
const clonedSlides = [
  projects[projects.length - 1],
  ...projects,
  projects[0],
];

const Work = () => {
  // Start at offset 1 (first real slide)
  const [trackIndex, setTrackIndex] = useState(OFFSET);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const isAnimating = useRef(false);

  // Real dot index (0-based)
  const dotIndex =
    trackIndex === 0
      ? projects.length - 1
      : trackIndex === clonedSlides.length - 1
      ? 0
      : trackIndex - OFFSET;

  const slideTo = useCallback((index: number, animate = true) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setIsTransitioning(animate);
    setTrackIndex(index);
    setTimeout(() => {
      isAnimating.current = false;
    }, 500);
  }, []);

  const goToPrev = useCallback(() => {
    slideTo(trackIndex - 1);
  }, [trackIndex, slideTo]);

  const goToNext = useCallback(() => {
    slideTo(trackIndex + 1);
  }, [trackIndex, slideTo]);

  // After sliding to a clone, silently jump to the real counterpart
  useEffect(() => {
    if (trackIndex === 0) {
      // Was at clone of last → jump to real last
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setTrackIndex(projects.length); // real last = index projects.length
      }, 500);
      return () => clearTimeout(timer);
    }
    if (trackIndex === clonedSlides.length - 1) {
      // Was at clone of first → jump to real first
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setTrackIndex(1); // real first = index 1
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [trackIndex]);

  // Re-enable transition after silent jump
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const goToDot = useCallback(
    (dotIdx: number) => {
      slideTo(dotIdx + OFFSET);
    },
    [slideTo]
  );

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${trackIndex * 100}%)`,
                transition: isTransitioning
                  ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                  : "none",
              }}
            >
              {clonedSlides.map((project, index) => {
                // Display number: use real project index
                const realIdx =
                  index === 0
                    ? projects.length - 1
                    : index === clonedSlides.length - 1
                    ? 0
                    : index - OFFSET;

                return (
                  <div className="carousel-slide" key={index}>
                    <div className="carousel-content">
                      <div className="carousel-info">
                        <div className="carousel-number">
                          <h3>0{realIdx + 1}</h3>
                        </div>
                        <div className="carousel-details">
                          <h4>{project.title}</h4>
                          <p className="carousel-category">
                            {project.category}
                          </p>
                          <div className="carousel-tools">
                            <span className="tools-label">Tools & Features</span>
                            <p>{project.tools}</p>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-image-wrapper">
                        <WorkImage image={project.image} alt={project.title} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  index === dotIndex ? "carousel-dot-active" : ""
                }`}
                onClick={() => goToDot(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
