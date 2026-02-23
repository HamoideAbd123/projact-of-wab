"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getPhones } from "@/lib/api";
import { Phone } from "@/types";
import PhoneCard from "@/components/PhoneCard";
import FilterBar from "@/components/FilterBar";
import { Smartphone, RefreshCcw } from "lucide-react";

export default function Home() {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  const brands = [
    "Apple", "Samsung", "Google", "OnePlus", "Xiaomi",
    "Sony", "Motorola", "Asus", "Nothing", "Oppo",
    "Vivo", "Realme", "Huawei", "Honor", "ZTE"
  ];

  const fetchPhones = async (currentFilters: any) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (currentFilters.brand) params.append("brand", currentFilters.brand);
      if (currentFilters.minPrice) params.append("price_min", currentFilters.minPrice);
      if (currentFilters.maxPrice) params.append("price_max", currentFilters.maxPrice);

      const data = await getPhones(params);
      setPhones(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhones(filters);
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white mb-12 p-8 md:p-16">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Find Your Next <br /> Perfect Smartphone
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-lg">
            Compare specs, prices, and features of the world's best phones in one clean, minimal interface.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/compare"
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Start Comparing
            </Link>
            <Link
              href="/samsung"
              className="bg-blue-500/20 backdrop-blur-md text-white border border-white/30 px-8 py-3 rounded-xl font-bold hover:bg-blue-500/30 transition-colors"
            >
              Samsung Store
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-1/4">
          <FilterBar brands={brands} onFilterChange={setFilters} />
        </aside>

        {/* Main Content */}
        <main className="lg:w-3/4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Latest Devices</h2>
              <p className="text-gray-500">Discover recently added smartphones</p>
            </div>
            {loading && <RefreshCcw className="h-5 w-5 text-blue-600 animate-spin" />}
          </div>

          {!loading && phones.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {phones.map((phone) => (
                <PhoneCard key={phone.id} phone={phone} />
              ))}
            </div>
          ) : !loading && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="h-10 w-10 text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium">No phones found matching your filters.</p>
              <button
                onClick={() => setFilters({})}
                className="mt-4 text-blue-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-gray-100 animate-pulse rounded-xl h-96" />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
