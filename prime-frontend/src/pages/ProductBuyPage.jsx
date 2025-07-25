import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products.json";
import { useCart } from "../context/CartContext";

const ProductBuyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const product = products.find((item) => item.id === parseInt(id));
  const { addToCart } = useCart();

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
    } else {
      // Buy logic here (e.g., navigate to checkout page)
      alert("Proceeding to buy...");
    }
  };

  const handleAddToCart = () => {
    
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
    } else {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black text-xl">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12 relative">
      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white text-black rounded-xl shadow-2xl p-8 min-w-[320px] max-w-xs relative flex flex-col items-center">
            <button
              className="absolute top-2 right-2 text-xl text-gray-400 hover:text-black"
              onClick={() => setShowLoginPrompt(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="text-lg font-semibold mb-4 text-center">
              Please login first to continue
            </div>
            <button
              className="w-full py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl flex flex-col md:flex-row border border-gray-200 shadow-2xl rounded-2xl overflow-hidden">
        {/* Left: Product Image */}
        <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-10">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[400px] object-contain"
          />
        </div>

        {/* Right: Product Details */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
            {product.name}
          </h1>

          <p className="text-xl text-black font-semibold mb-6">
            {product.price}
          </p>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-10">
            {product.description}
          </p>

          <div className="flex gap-4">
            <button
              className="px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
            <button
              className="px-6 py-2 border border-black text-black rounded-lg font-medium hover:bg-black hover:text-white transition"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBuyPage;


