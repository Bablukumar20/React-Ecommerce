import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { ShoppingCart, ChevronLeft } from "lucide-react";

const Cart = () => {
  const { cart, cartTotal, cartCount } = useCart();

  return (
    <div className="container mx-auto px-4 md:px-8 pt-8">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <Link
          to={"/"}
          className="flex items-center text-gray-400 hover:text-orange-400 transition"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Store
        </Link>
      </div>

      <h2 className="text-4xl font-extrabold text-white mb-8">
        Your Cart <span className="text-orange-500">({cartCount})</span>
      </h2>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-gray-900/50 border border-gray-800 rounded-2xl">
          <ShoppingCart className="mx-auto w-12 h-12 text-gray-600 mb-4" />
          <p className="text-gray-400 mb-4">Your cart is empty</p>
          <Link
            to="/"
            className="bg-orange-500 px-6 py-3 rounded-full text-white font-semibold hover:bg-orange-600 transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ITEMS */}
          <div className="lg:col-span-2 space-y-5">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* SUMMARY */}
          <div className="lg:col-span-1 sticky top-24">
            <div className="p-6 bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-xl">

              <h3 className="text-xl font-bold text-white mb-6">
                Order Summary
              </h3>

              <div className="space-y-3 text-gray-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">
                    ₹{cartTotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-400 font-semibold">Free</span>
                </div>

                <div className="border-t border-gray-800 pt-4 flex justify-between">
                  <span className="text-lg font-bold text-white">Total</span>
                  <span className="text-xl font-bold text-orange-500">
                    ₹{cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="mt-6 block text-center py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold transition shadow-lg"
              >
                Proceed to Checkout ⚡
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;