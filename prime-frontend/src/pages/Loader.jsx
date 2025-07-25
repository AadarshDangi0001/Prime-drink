import React, { useEffect, useState } from "react";

const Loader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // lock scroll
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) return prev + 1;
        clearInterval(interval);
        setTimeout(() => {
          // unlock scroll
          document.body.style.overflow = "auto";
          onFinish();
        }, 300);
        return 100;
      });
    }, 20);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto"; // cleanup scroll
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-white flex items-end justify-end p-6 z-[9999]">
      <span className="text-black text-xl font-semibold">{progress}%</span>
    </div>
  );
};

export default Loader;

