
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import SplashCursor from './ReactBitcomponents/SplashCursor';
import Lenis from '@studio-freight/lenis';
import Navbar from './section/Navbar';
import Products from './pages/Products';
import About from './pages/About';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductBuyPage from './pages/ProductBuyPage';
import Cursor from './components/cursor/Cursor';
import { CartProvider } from './context/CartContext';



function App() {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.08,
      direction: 'vertical',
      gestureOrientation: 'vertical',
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Custom wrapper to use hooks inside BrowserRouter
  function AppRoutes() {
    const location = useLocation();
    const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';
    return (
      <>
        {!hideNavbar && <Navbar />}
        {/* <SplashCursor /> */}
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Products />} />
         <Route path="/product/:id" element={<ProductBuyPage />} />

        </Routes>
      </>
    );
  }

  return (
    <AuthProvider>
      <CartProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </CartProvider>
    </AuthProvider>
  );
}

export default App

