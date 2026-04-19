import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartDrawer from "./CartDrawer";

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-gray-950 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">

          <Link to="/" className="text-xl font-bold">
            PRIME <span className="text-orange-400">CART</span>
          </Link>

          <div className="flex items-center gap-4">

            {/* USER LOGIN SECTION */}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300">
                  Hi, {user.email.split("@")[0]}
                </span>
                <button
                  onClick={logout}
                  className="text-xs bg-red-500 px-2 py-1 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-1">
                <User size={18} />
                Login
              </Link>
            )}

            {/* CART */}
            <button onClick={() => setOpen(true)} className="relative">
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </header>

      <CartDrawer isOpen={open} setIsOpen={setOpen} />
    </>
  );
};

export default Navbar;