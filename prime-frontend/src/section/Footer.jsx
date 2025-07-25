import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-10 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-2">PRIME</h2>
          <p className="text-sm text-gray-400">
            Prime Hydration is a better-for-you hydration option created by Logan Paul and KSI — made for the next generation of athletes, creators, and dreamers.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/about" className="hover:text-white transition">About</a></li>
            <li><a href="/products" className="hover:text-white transition">Products</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Connect with Us</h3>
          <p className="text-sm text-gray-400 mb-3">Follow Prime on social media to stay updated on new drops and exclusive offers.</p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/drinkprime" target="_blank" rel="noopener noreferrer">
              <img src="/icons/insta.webp" alt="Instagram" className="h-5 w-5" />
            </a>
            <a href="https://www.twitter.com/drinkprime" target="_blank" rel="noopener noreferrer">
              <img src="/icons/x.webp" alt="Twitter" className="h-5 w-5" />
            </a>
            <a href="mailto:support@prime.com">
              <img src="/icons/Mail.webp" alt="Email" className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Prime Hydration. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
