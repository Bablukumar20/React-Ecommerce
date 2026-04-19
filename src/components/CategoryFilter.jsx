import React from "react";
import { initialProducts } from "../data/product";
import { Tag } from "lucide-react";

const availableCategories = [
  "All",
  ...new Set(initialProducts.map((p) => p.category)),
];

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="mb-6">

      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Tag className="w-5 h-5 text-orange-500" />
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
          Categories
        </h3>
      </div>

      {/* Pills */}
      <div className="flex flex-wrap gap-3">
        {availableCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-sm rounded-full border transition duration-200 ${
              selectedCategory === category
                ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:border-orange-400 hover:text-orange-500"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

    </div>
  );
};

export default CategoryFilter;