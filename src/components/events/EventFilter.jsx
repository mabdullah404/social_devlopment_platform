import React from "react";
import { 
  Search, 
  X, 
  MapPin, 
  SlidersHorizontal, 
  Heart, 
  Sparkles, 
  Trees, 
  Stethoscope, 
  GraduationCap, 
  Layers 
} from "lucide-react";

// আধুনিক কমান্ড-হাব স্টাইল ফিল্টার কম্পোনেন্ট (ThemeForest / Airbnb Experiences স্ট্যান্ডার্ড)
const EventFilter = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  sortBy,
  setSortBy,
  eventsCount = 0,
}) => {
  const causes = [
    { label: "All Initiatives", value: "All", icon: Layers, count: "All" },
    { label: "Winter & Relief Aid", value: "Donation", icon: Heart, count: "Priority" },
    { label: "Civic Sanitation", value: "Cleanup", icon: Sparkles, count: "Active" },
    { label: "Urban Afforestation", value: "Plantation", icon: Trees, count: "Weekly" },
    { label: "Medical & Health", value: "Healthcare", icon: Stethoscope, count: "Camps" },
    { label: "Youth Workshop", value: "Education", icon: GraduationCap, count: "Skills" },
  ];

  const locations = [
    "All Areas",
    "Mirpur 10, Dhaka",
    "Mohammadpur, Dhaka",
    "Dhanmondi, Dhaka",
    "Uttara, Dhaka",
    "Old Dhaka",
  ];

  return (
    <div className="space-y-6 mb-12">
      
      {/* ১. টপ ভিজুয়াল কজ সিলেক্টর কার্ডস (সাধারণ পিলের চেয়ে সম্পূর্ণ আলাদা) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {causes.map((cause) => {
          const Icon = cause.icon;
          const isSelected = selectedCategory.toLowerCase() === cause.value.toLowerCase();

          return (
            <button
              key={cause.value}
              onClick={() => setSelectedCategory(cause.value)}
              className={`relative flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition-all duration-200 group ${
                isSelected
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/30 scale-105"
                  : "bg-base-100 hover:bg-base-200/70 border-base-300 dark:border-slate-800 text-base-content/80"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 transition-transform group-hover:scale-110 ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold leading-tight line-clamp-1">
                {cause.label}
              </span>
              <span
                className={`text-[10px] font-semibold mt-1 px-2 py-0.5 rounded-full ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-base-200 dark:bg-slate-800 text-base-content/60"
                }`}
              >
                {cause.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ২. ইন্টারেক্টিভ সার্চ ও এরিয়া ড্রপডাউন বার */}
      <div className="p-3.5 rounded-3xl bg-base-100 border border-base-300 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
        
        {/* কীওয়ার্ড সার্চ ইনপুট */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search drives by name, purpose, or street keyword..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-base-200/50 text-base-content text-sm placeholder:text-base-content/40 focus:outline-none focus:bg-base-100 focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
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

        {/* এরিয়া / নেবারহুড ফিল্টার ড্রপডাউন */}
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-base-200/50 border border-base-300/80 shrink-0">
          <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
          <span className="text-xs font-bold text-base-content/60 hidden sm:inline">Area:</span>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="bg-transparent text-xs font-bold text-base-content focus:outline-none cursor-pointer py-1"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc} className="bg-base-100 text-base-content">
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* সর্ট সিলেক্টর */}
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-base-200/50 border border-base-300/80 shrink-0">
          <SlidersHorizontal className="w-4 h-4 text-indigo-600 shrink-0" />
          <span className="text-xs font-bold text-base-content/60 hidden sm:inline">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-xs font-bold text-base-content focus:outline-none cursor-pointer py-1"
          >
            <option value="date-asc" className="bg-base-100 text-base-content">
              Soonest Scheduled First
            </option>
            <option value="date-desc" className="bg-base-100 text-base-content">
              Furthest Date First
            </option>
            <option value="title-asc" className="bg-base-100 text-base-content">
              Alphabetical (A to Z)
            </option>
          </select>
        </div>

      </div>

    </div>
  );
};

export default EventFilter;
