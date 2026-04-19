import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetail";
import Footer from "./components/Footer";
import PhoneLogin from "./pages/PhoneLogin"; // ✅ ADDED ONLY

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthProvider from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

/* CLEAN PREMIUM HERO */
const HeroSection = () => {
  return (
    <section className="px-4 md:px-6 lg:px-8 pt-6 pb-6">
      <div className="w-full bg-[#0d1a33] border border-white/10 rounded-3xl px-6 md:px-10 py-10 shadow-xl">

        <div className="grid lg:grid-cols-2 gap-8 items-center">

          <div>
            <p className="text-orange-500 text-sm font-semibold tracking-wider uppercase">
              Trusted Ecommerce Store
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-white mt-3 leading-tight">
              Premium Shopping <br />
              Made Simple
            </h1>

            <p className="text-gray-400 mt-4 text-base max-w-lg leading-relaxed">
              Discover quality products, secure checkout and a smooth shopping
              experience built for smart buyers.
            </p>

            <div className="flex flex-wrap gap-4 mt-7">
              <a
                href="#products"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Shop Now
              </a>

              <a
                href="#products"
                className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Explore
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="bg-[#08111f] rounded-2xl p-4 border border-white/10">
              <p className="text-orange-500 font-semibold">Fast Delivery</p>
              <p className="text-gray-400 text-sm mt-1">Across India</p>
            </div>

            <div className="bg-[#08111f] rounded-2xl p-4 border border-white/10">
              <p className="text-orange-500 font-semibold">Secure Payment</p>
              <p className="text-gray-400 text-sm mt-1">Trusted checkout</p>
            </div>

            <div className="bg-[#08111f] rounded-2xl p-4 border border-white/10">
              <p className="text-orange-500 font-semibold">Best Prices</p>
              <p className="text-gray-400 text-sm mt-1">Daily deals</p>
            </div>

            <div className="bg-[#08111f] rounded-2xl p-4 border border-white/10">
              <p className="text-orange-500 font-semibold">Top Products</p>
              <p className="text-gray-400 text-sm mt-1">Premium quality</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

const Layout = ({ theme, setTheme }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#06111f] text-white overflow-x-hidden">

      <Navbar theme={theme} setTheme={setTheme} />

      {location.pathname === "/" && <HeroSection />}

      <main
        id="products"
        className="w-full px-4 md:px-6 lg:px-8 pb-14"
      >
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ✅ ONLY ADDED (NO CHANGE ELSEWHERE) */}
          <Route path="/phone-login" element={<PhoneLogin />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

const App = () => {
  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return "dark";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Router>
      <AuthProvider>

        <ToastContainer
          position="top-right"
          autoClose={1500}
          theme={theme}
          transition={Bounce}
        />

        <Layout theme={theme} setTheme={setTheme} />

      </AuthProvider>
    </Router>
  );
};

export default App;