import React, { useState } from "react";
import { FaBars, FaShoppingCart, FaCog, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbarpage from "../components/Navbarpage";
import { getMe } from "../api";
import SplashCursor from "../ReactBitcomponents/SplashCursor";
import Cursor from "../components/cursor/Cursor";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [magicCursor, setMagicCursor] = useState(false);

  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getMe(token)
        .then((res) => {
          setIsLoggedIn(true);
          setUsername(res.user?.username || "User");
        })
        .catch(() => {
          setIsLoggedIn(false);
          setUsername("");
        });
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername("");
    setSettingsOpen(false);
    navigate("/login");
  };

  const handleBuyAll = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty");
    } else {
      alert("Proceeding to buy all items...");
      clearCart();
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = parseFloat(item.price.replace("₹", ""));
      return acc + price * item.quantity;
    }, 0);
  };

  return (
    <>
      <div className="fixed z-[5000]  w-[100vw] px-6 py-4 flex justify-between items-center bg-white shadow">
        <div
          className="text-xl font-bold text-black cursor-pointer"
          onClick={() => window.location.href = "/"}
        >
          PRIME
        </div>

        {magicCursor ? <SplashCursor /> : <Cursor />}

        <div className="flex items-center gap-6 relative">
          {!isLoggedIn ? (
            <>
              <button
                className="text-black border px-4 py-1 rounded hover:bg-black hover:text-white transition"
                onClick={() => window.location.href = "/login"}
              >
                Login
              </button>
              <FaCog className="text-xl cursor-pointer" onClick={() => setSettingsOpen((prev) => !prev)} />
            </>
          ) : (
            <>
              <span className="text-black font-semibold">Hey, {username}</span>
              <div className="relative">
                <FaShoppingCart
                  className="text-xl cursor-pointer"
                  onClick={() => setCartOpen((prev) => !prev)}
                />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <FaCog className="text-xl cursor-pointer" onClick={() => setSettingsOpen((prev) => !prev)} />
            </>
          )}

          {cartOpen && (
            <div className="absolute right-0 top-12 w-80 max-h-[500px] bg-white border rounded shadow-lg p-4 overflow-y-auto z-[9999]">
              <h3 className="text-lg font-semibold text-black mb-3">Your Cart</h3>
              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-sm">Cart is empty</p>
              ) : (
                <>
                  <ul className="space-y-4">
                    {cartItems.map((item) => (
                      <li key={item.id} className="flex gap-3 items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 object-contain rounded"
                        />
                        <div className="flex-1">
                          <p className="text-black font-medium text-sm">{item.name}</p>
                          <p className="text-gray-600 text-xs">{item.price}</p>
                          <div className="flex items-center mt-1 gap-2">
                            <button onClick={() => decreaseQuantity(item.id)} className="px-2 py-0.5 border rounded text-xs">-</button>
                            <span className="text-sm">{item.quantity}</span>
                            <button onClick={() => increaseQuantity(item.id)} className="px-2 py-0.5 border rounded text-xs">+</button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Remove"
                        >
                          <FaTrash />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-right text-sm text-black font-medium">
                    Total: ₹{calculateTotal().toFixed(2)}
                  </div>
                  <button
                    className="w-full mt-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition"
                    onClick={handleBuyAll}
                  >
                    Buy All
                  </button>
                </>
              )}
            </div>
          )}

          {settingsOpen && (
            <div className="absolute right-0 top-12 bg-white border rounded shadow-md p-3 z-[9998] min-w-[160px] flex flex-col gap-2">
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="text-left px-2 py-1 hover:bg-gray-100 rounded"
                >
                  Logout
                </button>
              )}
              <button
                onClick={() => {
                  setMagicCursor((prev) => !prev);
                  setSettingsOpen(false);
                }}
                className="text-left px-2 py-1 hover:bg-gray-100 rounded"
              >
                Magic Cursor: <span className={magicCursor ? "text-green-600" : "text-gray-400"}>{magicCursor ? "On" : "Off"}</span>
              </button>
            </div>
          )}

          <FaBars
            className="text-xl cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
          />
        </div>
      </div>

      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black z-40">
          <Navbarpage onNavigate={(route) => {
            window.location.href = route;
            setMenuOpen(false);
          }} />
        </div>
      )}
    </>
  );
};

export default Navbar;