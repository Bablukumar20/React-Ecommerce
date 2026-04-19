import React, { useState } from "react";
import SearchFilter from "../components/SearchFilter";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

const ProductList = () => {
  const { products } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // FILTER LOGIC
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 md:px-8 py-6">

      {/* SEARCH */}
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* CATEGORY */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* HEADER */}
      <div className="flex items-center justify-between mt-6 mb-4">
        <h2 className="text-xl font-bold">
          Featured Products
        </h2>

        <span className="text-sm text-gray-500">
          {filteredProducts.length} items
        </span>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
};

export default ProductList;