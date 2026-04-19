import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Star,
  Zap,
  CheckCircle
} from "lucide-react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const discountPrice = Math.round(product.price * 1.25);

  return (
    <div className="group bg-[#0d1a33] border border-white/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">

      {/* IMAGE */}
      <Link
        to={`/product/${product.id}`}
        className="relative h-60 bg-white flex items-center justify-center p-6 overflow-hidden"
      >
        {/* Badge */}
        <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          Best Seller
        </span>

        <img
          src={product.image}
          alt={product.name}
          className="h-full object-contain group-hover:scale-110 transition duration-500"
        />
      </Link>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-grow">

        {/* CATEGORY */}
        <span className="text-xs uppercase tracking-widest text-orange-400 font-semibold">
          {product.category}
        </span>

        {/* TITLE */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-white text-lg font-bold mt-2 line-clamp-2 group-hover:text-orange-400 transition">
            {product.name}
          </h3>
        </Link>

        {/* DESCRIPTION */}
        <p className="text-gray-400 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>

        {/* RATING */}
        <div className="flex items-center gap-1 mt-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <Star
              key={item}
              className="w-4 h-4 fill-orange-400 text-orange-400"
            />
          ))}

          <span className="text-sm text-gray-400 ml-2">(245)</span>
        </div>

        {/* PRICE */}
        <div className="mt-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-extrabold text-orange-500">
              ₹{product.price.toLocaleString()}
            </span>

            <span className="text-sm text-gray-500 line-through">
              ₹{discountPrice.toLocaleString()}
            </span>
          </div>

          <p className="text-green-400 text-sm mt-1 flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            Free Delivery
          </p>
        </div>

        {/* BUTTONS */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            onClick={() => addToCart(product)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-2xl transition flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>

          <Link
            to={`/product/${product.id}`}
            className="bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-2xl transition flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Buy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;