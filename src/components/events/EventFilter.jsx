import React from "react";
import { 
  Search, 
  X, 
  Heart, 
  Sparkles, 
  Trees, 
  Stethoscope, 
  GraduationCap, 
  LayoutGrid, 
  SlidersHorizontal 
} from "lucide-react";

// আধুনিক এবং ইউনিক ইভেন্ট ফিল্টার কম্পোনেন্ট (ক্যাটাগরি আইকন ও সর্টিং সহ)
const EventFilter = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
}) => {
  const categories = [
    { label: "All Drives", value: "All", icon: LayoutGrid },
    { label: "Donation", value: "Donation", icon: Heart },
    { label: "Cleanup", value: "Cleanup", icon: Sparkles },
    { label: "Plantation", value: "Plantation", icon: Trees },
    { label: "Healthcare", value: "Healthcare", icon: Stethoscope },
    { label: "Education", value: "Education", icon: GraduationCap },
  ];

  return (
    <div className="space-y-4 mb-10">
      
      {/* ১. টপ সার্চ এবং সর্টিং বার */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-3xl bg-base-100 border border-base-300 shadow-sm">
        
        {/* সার্চ ইনপুট */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by neighborhood, initiative name, or keyword (e.g. Mirpur, Blankets)..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-base-200/50 text-base-content text-sm placeholder:text-base-content/40 border border-transparent focus:border-emerald-500 focus:bg-base-100 focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-base-300 text-base-content/50"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* সর্ট ড্রপডাউন */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-base-200/60 border border-base-300/80 shrink-0">
          <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-semibold text-base-content/60 hidden sm:inline">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-xs font-bold text-base-content focus:outline-none cursor-pointer py-1"
          >
            <option value="date-asc">Date: Soonest First</option>
            <option value="date-desc">Date: Furthest First</option>
            <option value="title-asc">Title: A to Z</option>
          </select>
        </div>

      </div>

      {/* ২. ক্যাটাগরি চিপস উইথ আইকনস */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.value;

          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                isSelected
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25 scale-[1.02]"
                  : "bg-base-100 hover:bg-base-200 text-base-content/70 border border-base-300 hover:border-base-content/20"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-emerald-600"}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default EventFilter;
