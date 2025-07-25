
import ScrollReveal from "../ReactBitcomponents/ScrollReveal";

const About = () => {
  return (
    <div className="w-full h-[200vh] p-10 md:p-20 bg-white">
      <div className="banner pt-10 ">
        <img
          src="https://img-cdn.inc.com/image/upload/f_webp,c_fit,w_1920,q_auto/images/panoramic/logan-paul-ksi-prime-inc-1763507513_540455_pmmbkq.jpg"
          alt=""
        />
      </div>
       <h1 className="text-3xl mt-10 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center my-8">About Prime Hydration</h1>
      <ScrollReveal
        baseOpacity={0}
        enableBlur={true}
        baseRotation={5}
        blurStrength={10}
      >

Prime Hydration was created to fill the gap between great taste and real functionality. Launched by global icons KSI and Logan Paul, Prime isn’t just a drink — it’s a movement. Built by creators for their fans, athletes, and everyday people, Prime delivers a refreshing hydration experience with bold flavors, low sugar, and essential electrolytes. Whether you’re hitting the gym, grinding through your day, or just need a pick-me-up, Prime keeps you fueled.





      </ScrollReveal>
    </div>
  );
};

export default About;
