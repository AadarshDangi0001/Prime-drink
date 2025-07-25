import React, { useEffect } from 'react';
import './ScrollImg.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import bottle11 from '../assets/bottle/bottle1/bottle11.png';
import bottle12 from '../assets/bottle/bottle1/bottle12.png';
import bottle13 from '../assets/bottle/bottle1/bottle13.png';


import bottle21 from '../assets/bottle/bottle2/bottle21.png';
import bottle22 from '../assets/bottle/bottle2/bottle22.png';
import bottle23 from '../assets/bottle/bottle2/bottle23.png';


import bottle31 from '../assets/bottle/bottle3/bottle31.png';
import bottle32 from '../assets/bottle/bottle3/bottle32.png';
import bottle33 from '../assets/bottle/bottle3/bottle33.png';


import bottle41 from '../assets/bottle/bottle4/bottle41.png';
import bottle42 from '../assets/bottle/bottle4/bottle42.png';
import bottle43 from '../assets/bottle/bottle4/bottle43.png';


import bottle51 from '../assets/bottle/bottle5/bottle51.png';
import bottle52 from '../assets/bottle/bottle5/bottle52.png';
import bottle53 from '../assets/bottle/bottle5/bottle53.png';


import bottle61 from '../assets/bottle/bottle6/bottle61.png';
import bottle62 from '../assets/bottle/bottle6/bottle62.png';
import bottle63 from '../assets/bottle/bottle6/bottle63.png';

gsap.registerPlugin(ScrollTrigger);

const ScrollImgs = () => {
  useEffect(() => {
    // Scroll animation
    gsap.to('.imgscollor .box', {
      x: '-70%',
      scrollTrigger: {
        trigger: '.imgscollor',
        scroller: 'body',
        start: 'top 10%',
        end: 'top -150%',
        scrub: 2,
        pin: true,
        markers: false,
      },
    });

    // Parallax hover effect
    const imgContainers = document.querySelectorAll('.imgs');

    imgContainers.forEach((container) => {
      const bottle11El = container.querySelector('.bottle11');
      const bottle12El = container.querySelector('.bottle12');

      if (!bottle11El || !bottle12El) return;

      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = x / rect.width - 0.5;
        const moveAmount = 30 * percent; // stronger effect

        gsap.to(bottle11El, {
          x: moveAmount,
          duration: 0.4,
          ease: 'power2.out',
        });

        gsap.to(bottle12El, {
          x: -moveAmount,
          duration: 0.4,
          ease: 'power2.out',
        });
      });

      container.addEventListener('mouseleave', () => {
        gsap.to([bottle11El, bottle12El], {
          x: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="imgscollor overflow-hidden">
      <div className="box">
      
        <div className="imgs flex items-center text-center">
             <h1 className='text-[13vh] pl-20 mt-40 text-white scrollimgtext text-stroke-black uppercase font-extrabold'>We have  <br />
                 
                delicious <br /> flavors</h1>
        </div>
        <div className="imgs img1 relative">
        
           <img className='absolute left-0 top-0' src={bottle13} alt=""/>
           <img className=' absolute left-0 top-0 bottle11' src={bottle11} alt=""/>
            <img className='absolute left-0 top-0 bottle12' src={bottle12} alt=""/>
            

        </div>
        <div className="imgs img2">
            <img className='absolute left-0 top-0' src={bottle23} alt=""/>
           <img className=' absolute left-0 top-0 bottle11' src={bottle21} alt=""/>
            <img className='absolute left-0 top-0 bottle12' src={bottle22} alt=""/>
        </div>
        <div className="imgs img3">
         <img className='absolute left-0 top-0' src={bottle33} alt=""/>
           <img className=' absolute left-0 top-0 bottle11' src={bottle31} alt=""/>
            <img className='absolute left-0 top-0 bottle12' src={bottle32} alt=""/>
        </div>
        <div className="imgs img4">
         <img className='absolute left-0 top-0' src={bottle43} alt=""/>
           <img className=' absolute left-0 top-0 bottle11' src={bottle41} alt=""/>
            <img className='absolute left-0 top-0 bottle12' src={bottle42} alt=""/>
        </div>
        <div className="imgs img5">
         <img className='absolute left-0 top-0' src={bottle53} alt=""/>
           <img className=' absolute left-0 top-0 bottle11' src={bottle51} alt=""/>
            <img className='absolute left-0 top-0 bottle12' src={bottle52} alt=""/>
        </div>
        <div className="imgs img6">
         <img className='absolute left-0 top-0' src={bottle63} alt=""/>
           <img className=' absolute left-0 top-0 bottle11' src={bottle61} alt=""/>
            <img className='absolute left-0 top-0 bottle12' src={bottle62} alt=""/>
        </div>
      
      
      </div>
    </div>
  );
};

export default ScrollImgs;

