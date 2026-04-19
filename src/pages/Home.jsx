import React, { useEffect, useState } from "react";
import API from "../api";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await API.get("products/");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="bg-[#081120] min-h-screen px-6 py-10">
      <h1 className="text-white text-4xl font-bold mb-10 text-center">
        Trending Products 🔥
      </h1>

      {loading ? (
        <h2 className="text-white text-center text-xl">Loading...</h2>
      ) : (
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;