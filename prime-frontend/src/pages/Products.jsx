import React from "react";
import CircularGallery from "../ReactBitcomponents/CircularGallery.jsx";
import CircularGallery2 from "../ReactBitcomponents/CircularGallery2.jsx";
import CircularGallery3 from "../ReactBitcomponents/CircularGallery3.jsx";


const Products = () => {
  return (
    
    <div className="w-full h-full pt-20 bg-white overflow-hidden">
        <h1 className="text-[20vh] mb-20 font-bold">PRODUCTS</h1>

       


      <h3 className="text-[10vh] mt-20  font-bold">HYDRATION</h3>
      <div style={{ height: "600px", position: "relative" }}>
        <CircularGallery
          bend={0}
          textColor="#000"
          borderRadius={0.05}
          scrollEase={0.02}
        />
      </div>


        <h3 className="text-[10vh] mt-20 font-bold">RAPID REHYDRATION</h3>
       <div style={{ height: "600px", position: "relative" }}>
        <CircularGallery2
          bend={0}
          textColor="#000"
          borderRadius={0.05}
          scrollEase={0.02}
        />
      </div>


  <h3 className="text-[10vh] mt-20 font-bold">ENERGY</h3>
       <div style={{ height: "600px", position: "relative" }}>
        <CircularGallery3
          bend={0}
          textColor="#000"
          borderRadius={0.05}
          scrollEase={0.02}
        />
      </div>
    </div>
  );
};

export default Products;
