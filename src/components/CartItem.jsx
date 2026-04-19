import React from "react";
import { useCart } from "../context/CartContext";
import { X } from "lucide-react";

const CartItem = ({ item }) => {
  const { addToCart, removeFromCart } = useCart();

  const increaseQ = () => addToCart(item);
  const decreaseQ = () => removeFromCart(item.id);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-5 p-5 bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl hover:border-orange-500/40 transition-all duration-300 shadow-lg">

      {/* IMAGE */}
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-contain rounded-lg bg-white p-2"
      />

      {/* INFO */}
      <div className="flex-1 w-full">
        <h3 className="text-base font-semibold text-white line-clamp-1">
          {item.name}
        </h3>
        <p className="text-sm text-gray-400 mt-1">
          ₹{item.price.toFixed(2)}
        </p>
      </div>

      {/* CONTROLS */}
      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">

        {/* QUANTITY */}
        <div className="flex items-center bg-gray-800/70 border border-gray-700 rounded-full overflow-hidden">
          <button
            onClick={decreaseQ}
            className="w-9 h-9 flex items-center justify-center text-gray-300 hover:bg-gray-700"
          >
            −
          </button>

          <span className="px-4 text-white font-semibold">
            {item.quantity}
          </span>

          <button
            onClick={increaseQ}
            className="w-9 h-9 flex items-center justify-center text-gray-300 hover:bg-gray-700"
          >
            +
          </button>
        </div>

        {/* TOTAL */}
        <div className="text-right">
          <p className="text-sm text-gray-400">Total</p>
          <p className="text-lg font-bold text-orange-400">
            ₹{(item.price * item.quantity).toFixed(2)}
          </p>
        </div>

        {/* REMOVE */}
        <button
          onClick={() => removeFromCart(item.id, true)}
          className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;