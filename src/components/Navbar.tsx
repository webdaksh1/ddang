import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

// Exporting the variable for use in other components like initialFX.ts
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    // 1. Initialize ScrollSmoother
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    // 2. Handle Click Navigation
    const links = document.querySelectorAll(".header ul a");
    const handleLinkClick = (e: Event) => {
      if (window.innerWidth > 1024) {
        e.preventDefault();
        const elem = e.currentTarget as HTMLAnchorElement;
        const section = elem.getAttribute("data-href");
        if (section && smoother) {
          smoother.scrollTo(section, true, "top top");
        }
      }
    };

    links.forEach((elem) => {
      elem.addEventListener("click", handleLinkClick);
    });

    // 3. Handle Window Resize
    const handleResize = () => {
      ScrollSmoother.refresh(true);
    };
    window.addEventListener("resize", handleResize);

    // 4. CLEANUP: This runs when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
      links.forEach((elem) => {
        elem.removeEventListener("click", handleLinkClick);
      });
      if (smoother) {
        smoother.kill(); // Destroys instance to prevent memory leaks
      }
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          DDANG
        </a>
        <a
          href="mailto:rajeshchittyal21@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          webdaksh1@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;