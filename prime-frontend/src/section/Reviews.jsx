import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cards } from "../constants/index";

gsap.registerPlugin(ScrollTrigger);

const Reviews = () => {
  const containerRef = useRef();
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Move headings on scroll
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "200% top",
          scrub: true,
        },
      })
        .to(".first-title", { xPercent: 70 }, 0)
        .to(".sec-title", { xPercent: 25 }, 0)
        .to(".third-title", { xPercent: -50 }, 0);

      // Pin and animate cards in
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "10% top",
          end: "200% top",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      }).from(cardsRef.current, {
        yPercent: 150,
        stagger: 0.2,
        ease: "power1.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handlePlay = (index) => {
    const video = cardsRef.current[index];
    if (video) video.play();
  };

  const handlePause = (index) => {
    const video = cardsRef.current[index];
    if (video) video.pause();
  };

  return (
    <section ref={containerRef} className="testimonials-section overflow-hidden">
      <div className="absolute size-full flex flex-col items-center pt-[5vw]">
        <h1 className="text-white first-title">What's</h1>
        <h1 className="text-green-500 sec-title">Everyone</h1>
        <h1 className="text-white third-title">Talking</h1>
      </div>

      <div className="pin-box">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`vd-card ${card.translation} ${card.rotation}`}
            onMouseEnter={() => handlePlay(index)}
            onMouseLeave={() => handlePause(index)}
          >
            <video
              ref={(el) => (cardsRef.current[index] = el)}
              src={card.src}
              playsInline
              muted
              loop
              className="size-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
