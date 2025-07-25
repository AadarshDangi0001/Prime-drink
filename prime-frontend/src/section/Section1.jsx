import bg from "../assets/parallexImg/bg.png";
import bottle from "../assets/parallexImg/1.png";
import grass1 from "../assets/parallexImg/3.png";
import grass2 from "../assets/parallexImg/4.png";
import stone from "../assets/parallexImg/5.png";
import tree1 from "../assets/parallexImg/2.png";
import tree2 from "../assets/parallexImg/2.2.png";
import primebg from "../assets/parallexImg/primebg.webp";

import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

import React, { useRef, useEffect } from "react";


const parallaxConfig = [
  {
    key: "bg",
    src: bg,
    className: "bg",
    factor: 10,
    lerp: 0.08,
    scrollY: 0,
    scrollX: 0,
  },
  {
    key: "bottle",
    src: bottle,
    className: "bottle",
    factor: 18,
    lerp: 0.12,
    scrollY: 300,
    scrollX: 0,
  },
  {
    key: "grass1",
    src: grass1,
    className: "grass1",
    factor: 32,
    lerp: 0.15,
    scrollY: 1000,
    scrollX: 0,
  },
  {
    key: "grass2",
    src: grass2,
    className: "grass2",
    factor: 25,
    lerp: 0.18,
    scrollY: 1000,
    scrollX: 0,
  },
  {
    key: "tree1",
    src: tree1,
    className: "tree1",
    factor: 30,
    lerp: 0.22,
    scrollY: 500,
    scrollX: 0,
  },
  {
    key: "tree2",
    src: tree2,
    className: "tree2",
    factor: 50,
    lerp: 0.25,
    scrollY: 500,
    scrollX: 0,
  },
  {
    key: "stone",
    src: stone,
    className: "stone",
    factor: 10,
    lerp: 0.3,
    scrollY: 200,
    scrollX: 0,
  },
];

const Section1 = () => {
  const imageRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Each element has its own current position for smoothness
    let currents = parallaxConfig.map(() => ({ x: 0, y: 0, scroll: 0 }));
    let animationFrame;

    const lerp = (a, b, n) => a + (b - a) * n;

    let globalTarget = { x: 0, y: 0 };
    let globalScroll = { y: 0, x: 0 };

    const animate = () => {
      parallaxConfig.forEach((item, idx) => {
        // Each element lerps at its own speed
        currents[idx].x = lerp(currents[idx].x, globalTarget.x, item.lerp);
        currents[idx].y = lerp(currents[idx].y, globalTarget.y, item.lerp);
        // Scroll effect lerp
        currents[idx].scrollY = lerp(
          currents[idx].scrollY || 0,
          globalScroll.y,
          0.12
        );
        currents[idx].scrollX = lerp(
          currents[idx].scrollX || 0,
          globalScroll.x,
          0.12
        );
        const ref = imageRefs.current[idx];
        if (ref) {
          // Calculate scroll-based left/top offset
          const scrollLeft = (currents[idx].scrollX || 0) * (item.scrollX || 0);
          const scrollTop = (currents[idx].scrollY || 0) * (item.scrollY || 0);
          // Mouse parallax
          const moveX = -currents[idx].x * item.factor;
          const moveY = -currents[idx].y * item.factor;
          ref.style.transform = `translate(${moveX + scrollLeft}px, ${
            moveY + scrollTop
          }px)`;
        }
      });
      animationFrame = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      globalTarget.x = (x - centerX) / centerX;
      globalTarget.y = (y - centerY) / centerY;
    };

    const handleMouseLeave = () => {
      globalTarget.x = 0;
      globalTarget.y = 0;
    };

    const handleScroll = () => {
      // Get scroll progress for the landing section (0 to 1)
      const landing = containerRef.current;
      if (!landing) return;
      const rect = landing.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Vertical progress
      let progressY = 1 - Math.max(0, Math.min(1, rect.bottom / windowH));

      // Horizontal scroll progress based on window.scrollX and document width
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;
      let maxScrollX = docWidth - winWidth;
      let progressX = 0;
      if (maxScrollX > 0) {
        progressX = window.scrollX / maxScrollX;
      }
      globalScroll = { y: progressY, x: progressX };
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }
    window.addEventListener("scroll", handleScroll);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  

  return (
    <div className="main2  w-full  text-white">
      <div className="landing  overflow-hidden w-full h-screen bg-[#040901]">
        <div ref={containerRef} className="imagesdiv relative w-full h-screen">
          {/* Gradient overlay at the bottom */}
          <div
            className="absolute left-0 bottom-0 w-full"
            style={{
              height: "10vh",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))",
              pointerEvents: "none",
              zIndex: 50,
            }}
          />
          <img
            ref={(el) => (imageRefs.current[0] = el)}
            src={bg}
            alt="Landing"
            className="bg w-full h-full  object-contain"
            style={{ willChange: "transform" }}
          />
          <img
            ref={(el) => (imageRefs.current[1] = el)}
            src={bottle}
            alt="Landing"
            className="bottle w-full h-full z-10 absolute top-0 left-0 object-contain"
            style={{ willChange: "transform" }}
          />
          <img
            ref={(el) => (imageRefs.current[2] = el)}
            src={grass1}
            alt="Landing"
            className="grass1 w-full h-full absolute top-[5%] z-10 left-0 object-contain"
            style={{ willChange: "transform" }}
          />
          <img
            ref={(el) => (imageRefs.current[3] = el)}
            src={grass2}
            alt="Landing"
            className="grass2 w-full h-full absolute top-[5%]  z-10 left-0 object-contain"
            style={{ willChange: "transform" }}
          />
          <img
            ref={(el) => (imageRefs.current[4] = el)}
            src={tree1}
            alt="Landing"
            className="tree1 w-full h-full absolute top-[-5%] left-0 object-contain"
            style={{ willChange: "transform" }}
          />
          <img
            ref={(el) => (imageRefs.current[5] = el)}
            src={tree2}
            alt="Landing"
            className="tree2 w-full h-full absolute top-[-5%] left-0 object-contain"
            style={{ willChange: "transform" }}
          />
          <img
            ref={(el) => (imageRefs.current[6] = el)}
            src={stone}
            alt="Landing"
            className="stone w-full h-full absolute top-0 left-0 object-contain"
            style={{ willChange: "transform" }}
          />
        </div>
      </div>
      <div className="landing2 relative overflow-hidden w-full h-full bg-[#040901]">

         <div
            className="absolute left-0 bottom-0 w-full"
            style={{
              height: "10vh",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))",
              pointerEvents: "none",
              zIndex: 50,
            }}
          />
        <img
          src={primebg}
          alt="Landing"
          className="bg w-full h-full  object-cover"
          style={{ willChange: "transform" }}
        />
      </div>
    
    </div>
  );
};

export default Section1;