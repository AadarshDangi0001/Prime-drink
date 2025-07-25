import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollVideo = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const frames = useRef({ currentIndex: 1, maxIndex: 514 });
  const images = useRef([]);
  const imagesLoaded = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    function preloadImages() {
      for (let i = 1; i <= frames.current.maxIndex; i++) {
        const img = new Image();
        img.src = `./Prime-master/frame_${i.toString().padStart(4, '0')}.jpeg`;

        img.onload = () => {
          imagesLoaded.current++;
          if (imagesLoaded.current === frames.current.maxIndex) {
            loadImage(frames.current.currentIndex);
            playScrollAnimation();
            animateStickyContainer();
          }
        };

        img.onerror = () => {
          console.error('Image failed to load:', img.src);
        };

        images.current[i] = img;
      }
    }

    function loadImage(index) {
      const img = images.current[index];
      if (!img) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const scaleX = canvas.width / img.width;
      const scaleY = canvas.height / img.height;
      const scale = Math.max(scaleX, scaleY);

      const newWidth = img.width * scale;
      const newHeight = img.height * scale;
      const offsetX = (canvas.width - newWidth) / 2;
      const offsetY = (canvas.height - newHeight) / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
    }

    function playScrollAnimation() {
      gsap.to(frames.current, {
        currentIndex: frames.current.maxIndex,
        ease: 'none',
        scrollTrigger: {
          trigger: '.parent',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
        onUpdate: () => {
          loadImage(Math.floor(frames.current.currentIndex));
        },
      });
    }

    function animateStickyContainer() {
      gsap.fromTo(containerRef.current,
        {
          width: '40%',
          height: '40vh',
          borderRadius: '30px',
           top:200,
        },
        {
          width: '100%',
          height: '100vh',
          borderRadius: '0px',
          ease: 'none',
           top:0,
          scrollTrigger: {
            trigger: '.parent',
            start: 'top 70%',
            end: '+=400%',
            scrub: true,
            // markers: true, // For debugging
          },
        }
      );
    }

    preloadImages();
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <div
        className="parent bg-white "
        style={{
          position: 'relative',
          width: '100%',
          height: '500vh',
        }}
      >
        <div
          ref={containerRef}
          className="sticky-container"
          style={{
            position: 'sticky',
            top:200,
            left: 0,
            width: '40%',
            height: '40vh',
            margin: '0 auto',
            borderRadius: '30px',
            overflow: 'hidden',
            zIndex: 10,
          }}
        >
          <canvas
            id="frame"
            ref={canvasRef}
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
            }}
          ></canvas>
        </div>

      
      </div>
    </div>
  );
};

export default ScrollVideo;
