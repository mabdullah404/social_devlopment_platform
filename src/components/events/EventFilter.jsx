import React from "react";
import { Search, Filter } from "lucide-react";

// ইভেন্ট ফিল্টার এবং সার্চ বার কম্পোনেন্ট (এক্সট্রা বোনাস ফিচার)
const EventFilter = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories = [],
}) => {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-3xl border border-base-300 bg-base-100 shadow-sm mb-8">
      
      {/* ১. সার্চ বার */}
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by event title, location, or area..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-base-300 bg-base-200/50 text-base-content text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
        />
      </div>

      {/* ২. ক্যাটাগরি ফিল্টার পিলস */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
        <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-base-content/50 pr-2">
          <Filter className="w-3.5 h-3.5" />
          <span>Category:</span>
        </div>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-base-200 text-base-content/70 hover:bg-base-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

    </div>
  );
};

export default EventFilter;

