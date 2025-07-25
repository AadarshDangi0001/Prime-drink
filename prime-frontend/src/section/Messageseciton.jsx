import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

const MessageSection = () => {
  const containerRef = useRef();
  const firstMessageRef = useRef();
  const secondMessageRef = useRef();
  const msgTextRef = useRef();

  useEffect(() => {
    // Split the text into words
    const firstMsgSplit = new SplitText(firstMessageRef.current, { type: "words" });
    const secMsgSplit = new SplitText(secondMessageRef.current, { type: "words" });

    // First message animation
    gsap.to(firstMsgSplit.words, {
      color: "#faeade",
      ease: "power1.in",
      stagger: 1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        end: "20% center",
        scrub: true,
         
      },
    });

    // Second message animation
    gsap.to(secMsgSplit.words, {
      color: "#faeade",
      ease: "power1.in",
      stagger: 1,
      scrollTrigger: {
        trigger: secondMessageRef.current,
        start: "top 80%",
        end: "bottom 80%",
        scrub: true,

      },
    });

    // ClipPath reveal animation
    gsap.to(msgTextRef.current, {
      duration: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "circ.inOut",
      scrollTrigger: {
        trigger: msgTextRef.current,
        start: "top 60%",
      },
    });

    // Cleanup on unmount
    return () => {
      firstMsgSplit.revert();
      secMsgSplit.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh(); // Fix layout issues
  }, []);

  return (
    <section className="message-content" ref={containerRef}>
      <div className="container mx-auto flex-center py-28 relative">
        <div className="w-full h-full">
          <div className="msg-wrapper">
            <h1 className="first-message" ref={firstMessageRef}>
              Stir up your fearless past and
            </h1>

            <div
              ref={msgTextRef}
              style={{
                clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
              }}
              className="msg-text-scroll"
            >
              <div className="bg-light-brown md:pb-5 pb-3 px-5">
                <h2 className="text-red-brown">Fuel Up</h2>
              </div>
            </div>

            <h1 className="second-message" ref={secondMessageRef}>
              your future with every gulp of Perfect Protein
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessageSection;

