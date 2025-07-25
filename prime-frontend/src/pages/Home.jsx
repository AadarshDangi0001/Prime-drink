import React, { useEffect, useRef } from "react";
import "./Home.css";
import Typetext from "../components/Typetext";
import Section1 from "../section/Section1";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollImgs from "../section/ScrollImg";
import Section4 from "../section/Section4";
import Reviews from "../section/Reviews";
import MessageSection from "../section/Messageseciton";
import ScrollVideo from "../section/ScrollVideo";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const typetextRef = useRef(null);

  useEffect(() => {
    const section2 = section2Ref.current;
    const section3 = section3Ref.current;
    const typetext = typetextRef.current;

    if (section2 && section3 && typetext) {
      gsap.to(section2, {
        scrollTrigger: {
          trigger: section3,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
        scale: 0.99,
        rotate: 20,
        transformOrigin: "center center",
        ease: "none",
      });

      gsap.to(typetext, {
        y: 400,

        scrollTrigger: {
          trigger: section3,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
        ease: "power1.out",
      });
    }
  }, []);

  return (
    <div className="main w-full text-white relative">
      <Section1 />

      <div
        ref={section2Ref}
        className="section2 w-full h-screen flex justify-center items-center bg-black z-10 relative"
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      >
        <div ref={typetextRef}>
          <Typetext />
        </div>
      </div>

      <div
        ref={section3Ref}
        className="section3 h-full w-full bg-white  pt-20 pb-30 z-20 relative"
      >
        <ScrollImgs />
      </div>

      {/* <div className="section4 h-screen flex justify-center items-center z-999  w-full bg-[#CEE593]  ">
        <Section4 />
      </div>
       */}
      <ScrollVideo/>
      <MessageSection />
      <Reviews />
    </div>
  );
};

export default Home;
