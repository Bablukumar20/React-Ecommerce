import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { initialProducts } from "../data/product";

const SearchFilter = ({ searchTerm, setSearchTerm }) => {
  // ✅ FIXED STATE (VERY IMPORTANT)
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const wrapperRef = useRef(null);

  // OUTSIDE CLICK CLOSE
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // SEARCH LOGIC
  useEffect(() => {
    if (!searchTerm || searchTerm.trim() === "") {
      setSuggestions([]); // ✅ THIS MUST WORK
      return;
    }

    const filtered = (initialProducts || [])
      .filter((p) =>
        p?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 6);

    setSuggestions(filtered); // ✅ FIXED HERE
  }, [searchTerm]);

  return (
    <div ref={wrapperRef} className="relative mb-6">

      {/* INPUT */}
      <div className="flex items-center border rounded-lg bg-white dark:bg-slate-800">
        <Search className="w-5 h-5 text-gray-400 ml-3" />

        <input
          type="text"
          value={searchTerm}
          placeholder="Search products..."
          className="w-full p-3 bg-transparent outline-none"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowDropdown(true);
          }}
        />
      </div>

      {/* DROPDOWN */}
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-800 border rounded-lg shadow">

          {suggestions.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSearchTerm(item.name);
                setShowDropdown(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
            >
              {item.name}
            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default SearchFilter;