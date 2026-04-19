import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { initialProducts } from "../data/product";
import {
  ShoppingCart,
  ChevronLeft,
  Tag,
  Star,
  ShieldCheck,
  Truck,
  Zap
} from "lucide-react";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const found = initialProducts.find((p) => p.id == id);
    setProduct(found);
  }, [id]);

  if (!product) {
    return (
      <div className="text-center py-24 text-gray-400 text-lg">
        Loading product...
      </div>
    );
  }

  const oldPrice = Math.round(product.price * 1.25);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      {/* BACK */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-500 mb-8 transition"
      >
        <ChevronLeft className="w-5 h-5" />
        Back to Products
      </Link>

      {/* MAIN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* IMAGE */}
        <div className="bg-white rounded-3xl p-8 min-h-[520px] flex items-center justify-center shadow-xl">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[420px] object-contain hover:scale-105 transition duration-500"
          />
        </div>

        {/* DETAILS */}
        <div className="bg-[#0d1a33] border border-white/10 rounded-3xl p-8 shadow-xl">
          {/* CATEGORY */}
          <div className="flex items-center gap-2 text-orange-400 text-sm font-semibold uppercase tracking-widest">
            <Tag className="w-4 h-4" />
            {product.category}
          </div>

          {/* TITLE */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-3 leading-tight">
            {product.name}
          </h1>

          {/* RATING */}
          <div className="flex items-center gap-1 mt-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <Star
                key={item}
                className="w-5 h-5 fill-orange-400 text-orange-400"
              />
            ))}
            <span className="text-gray-400 ml-2">(245 Reviews)</span>
          </div>

          {/* PRICE */}
          <div className="mt-6">
            <div className="flex items-end gap-4 flex-wrap">
              <span className="text-5xl font-extrabold text-orange-500">
                ₹{product.price.toLocaleString()}
              </span>

              <span className="text-xl text-gray-500 line-through">
                ₹{oldPrice.toLocaleString()}
              </span>

              <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                Save 20%
              </span>
            </div>

            <p className="text-green-400 mt-2 flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Free Delivery Available
            </p>
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-300 leading-relaxed mt-8">
            {product.description}
          </p>

          {/* FEATURES */}
          <div className="mt-8 grid gap-4">
            <div className="bg-[#08111f] border border-white/10 rounded-2xl p-4 flex items-center gap-3">
              <ShieldCheck className="text-green-400 w-5 h-5" />
              <span className="text-gray-300">
                1 Year Warranty Included
              </span>
            </div>

            <div className="bg-[#08111f] border border-white/10 rounded-2xl p-4 flex items-center gap-3">
              <Truck className="text-orange-400 w-5 h-5" />
              <span className="text-gray-300">
                Fast Shipping Across India
              </span>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <button
              onClick={() => addToCart(product)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl transition flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>

            <button
              onClick={() => addToCart(product)}
              className="bg-white/10 hover:bg-white/15 text-white font-bold py-4 rounded-2xl transition flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Buy Now
            </button>
          </div>

          <Link
            to="/"
            className="block text-center mt-6 text-gray-400 hover:text-orange-400 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;