import React from "react";
import { X, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartDrawer = ({ isOpen, setIsOpen }) => {
  const { cart, cartTotal, addToCart, removeFromCart } = useCart();

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#071224] border-l border-white/10 shadow-2xl z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-orange-500" />
            Your Cart
          </h2>

          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <ShoppingCart className="w-12 h-12 text-gray-600 mb-3" />
              <p className="text-gray-400 text-lg">Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="bg-[#0d1a33] border border-white/10 rounded-2xl p-4 flex gap-4 hover:border-orange-500/40 transition"
              >
                {/* IMAGE */}
                <div className="w-20 h-20 bg-white rounded-xl p-2 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* INFO */}
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-base line-clamp-1">
                    {item.name}
                  </h3>

                  <p className="text-orange-500 font-bold mt-1">
                    ₹{item.price.toLocaleString()}
                  </p>

                  {/* QTY */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center bg-[#1b2a47] rounded-full border border-white/10 overflow-hidden">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-9 h-9 flex items-center justify-center text-white hover:bg-white/10"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span className="px-4 text-white font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => addToCart(item)}
                        className="w-9 h-9 flex items-center justify-center text-white hover:bg-white/10"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* DELETE */}
                <button
                  onClick={() => removeFromCart(item.id, true)}
                  className="text-red-400 hover:text-red-500 transition self-start"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="p-5 border-t border-white/10 bg-[#08111f]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-lg">Total</span>
            <span className="text-3xl font-bold text-orange-500">
              ₹{cartTotal.toLocaleString()}
            </span>
          </div>

          <Link
            to="/checkout"
            onClick={() => setIsOpen(false)}
            className={`block w-full text-center py-4 rounded-2xl font-bold text-lg transition ${
              cart.length === 0
                ? "bg-gray-700 text-gray-400 cursor-not-allowed pointer-events-none"
                : "bg-orange-500 hover:bg-orange-600 text-white shadow-lg"
            }`}
          >
            {cart.length === 0 ? "Cart is Empty" : "Checkout ⚡"}
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;