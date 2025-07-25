import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Particles from '../ReactBitcomponents/Particles';
import Galaxy from '../ReactBitcomponents/Galaxy';
import './Typetext.css'; // Assuming you have a CSS file for styles

gsap.registerPlugin(ScrollTrigger);


const para1 =
  "THE";
const para2 =
  "ULTIMATE  COLLECTORS";
const para3 = 
" TAKE HOME"
const para4 = "$1M  USD";

function splitWords(text) {
  return text.split(" ").map((word, i) => (
    <span key={i} className="inline-block opacity-0 mr-2">
      {word}
    </span>
  ));
}

const Typetext = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const words = sectionRef.current.querySelectorAll(".inline-block");
    gsap.set(words, { opacity: 0 });

    gsap.to(words, {
      opacity: 1,
      stagger: 0.08,
      ease: "power1.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 97%",
        scrub: true,
       
       
      },
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    
    <div className='mt-30  overflow-hidden mainhome-section-2'>
      <div ref={sectionRef} className="home-section-2 flex relative flex-col justify-center items-center h-full">
     <Particles
    particleColors={['#ffffff', '#ffffff']}
    particleCount={200}
    particleSpread={10}
    speed={0.1}
    particleBaseSize={100}
    moveParticlesOnHover={false}
    alphaParticles={false}
    disableRotation={false}
  />

    <Galaxy 
    mouseRepulsion={true}
    mouseInteraction={true}
    density={0.1}
    glowIntensity={0.5}
    saturation={0.8}
    hueShift={240}
  />

        <h3 className="text-[12vh] sec2text z-10 font-bold text-center text-black text-stroke-red">{splitWords(para1)}</h3>
        <h3 className="text-[12vh] sec2text z-10 font-bold text-center text-black text-stroke-red">{splitWords(para2)}</h3>
        <h3 className="text-[12vh] sec2text z-10 font-bold text-center text-black text-stroke-red">{splitWords(para3)}</h3>
        <h3 className="text-[20vh] sec2text z-10 font-extrabold text-center opacity-[1] ">{splitWords(para4)}</h3>

      </div>
    </div>
  );
};

export default Typetext;