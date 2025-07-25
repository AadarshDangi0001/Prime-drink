import React from "react";

const Navbarpage = ({ onNavigate }) => {
  return (
    <div className="w-full h-screen z-999 bg-black flex flex-col justify-center items-center p-10">
      <h3
        className="text-[10vh] mb-10 cursor-pointer text-white font-bold"
        onClick={() => onNavigate && onNavigate("/")}
      >
        HOME
      </h3>
      <h3
        className="text-[10vh] mb-10 cursor-pointer text-white font-bold"
        onClick={() => onNavigate && onNavigate("/product")}
      >
        PRODUCTS
      </h3>
      <h3
        className="text-[10vh] mb-10 cursor-pointer text-white font-bold"
        onClick={() => onNavigate && onNavigate("/about")}
      >
        ABOUT
      </h3>
    </div>
  );
};

export default Navbarpage;
