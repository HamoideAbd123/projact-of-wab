"use client";

import { useState, useEffect } from "react";
import { Filter, X, ChevronDown } from "lucide-react";

interface FilterBarProps {
    onFilterChange: (filters: { brand?: string; minPrice?: string; maxPrice?: string }) => void;
    brands: string[];
}

export default function FilterBar({ onFilterChange, brands }: FilterBarProps) {
    const [selectedBrand, setSelectedBrand] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleApply = () => {
        onFilterChange({
            brand: selectedBrand || undefined,
            minPrice: minPrice || undefined,
            maxPrice: maxPrice || undefined,
        });
    };

    const handleClear = () => {
        setSelectedBrand("");
        setMinPrice("");
        setMaxPrice("");
        onFilterChange({});
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                    <Filter className="h-5 w-5 mr-2 text-blue-600" />
                    Filters
                </h3>
                <button onClick={handleClear} className="text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors">
                    Reset All
                </button>
            </div>

            {/* Brands */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Brand</label>
                <div className="grid grid-cols-2 gap-2">
                    {brands.map((brand) => (
                        <button
                            key={brand}
                            onClick={() => setSelectedBrand(selectedBrand === brand ? "" : brand)}
                            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${selectedBrand === brand
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {brand}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Price Range</label>
                <div className="flex items-center space-x-2">
                    <input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="text-gray-400">—</span>
                    <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            <button
                onClick={handleApply}
                className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
            >
                Apply Filters
            </button>
        </div>
    );
}
