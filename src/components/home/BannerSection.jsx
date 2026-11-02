"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DateBadge from "@/components/events/DateBadge";
import { 
  ArrowRight, 
  PlusCircle, 
  Users, 
  MapPin, 
  Sparkles, 
  Search, 
  HeartHandshake, 
  ShieldCheck 
} from "lucide-react";

// সম্পূর্ণ ইউনিক ও দৃষ্টিনন্দন হিরো ব্যানার সেকশন (ThemeForest স্টাইল)
const BannerSection = () => {
  const router = useRouter();
  const [quickSearch, setQuickSearch] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      router.push(`/events?search=${encodeURIComponent(quickSearch.trim())}`);
    } else {
      router.push("/events");
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-base-200/50 via-base-100 to-base-100 py-16 md:py-24 border-b border-base-300">
      
      {/* ব্যাকগ্রাউন্ড অরা গ্লো */}
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* বাম কলাম: টেক্সট এবং কুইক সার্চ */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* টপ ব্যাজ */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>CivicPulse • Grassroots Relief & Volunteer Network</span>
            </div>

            {/* প্রধান শিরোনাম */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-base-content tracking-tight leading-[1.12]">
              Where Compassion Meets <span className="text-emerald-600 underline decoration-emerald-400/40 underline-offset-8">Direct Action</span>.
            </h1>

            {/* সাবটেক্সট */}
            <p className="text-base sm:text-lg text-base-content/75 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Mobilizing neighborhood volunteers for verified humanitarian drives—winter clothes in Mirpur 10, emergency blankets in Mohammadpur, tree plantations in Uttara, and lake cleanups in Dhanmondi.
            </p>

            {/* কুইক অ্যাকশন সার্চ বার (ইউনিক ফিচার) */}
            <form
              onSubmit={handleSearchSubmit}
              className="p-2 rounded-3xl bg-base-100 border border-base-300 shadow-xl max-w-xl mx-auto lg:mx-0 flex flex-col sm:flex-row gap-2"
            >
              <div className="relative flex-1 flex items-center">
                <Search className="absolute left-4 w-4 h-4 text-emerald-600" />
                <input
                  type="text"
                  value={quickSearch}
                  onChange={(e) => setQuickSearch(e.target.value)}
                  placeholder="Find drives by cause or area (e.g. Blankets, Mirpur)..."
                  className="w-full pl-11 pr-4 py-3 text-sm bg-transparent focus:outline-none text-base-content placeholder:text-base-content/40 font-medium"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25 active:scale-95 transition-all shrink-0"
              >
                <span>Find Drives</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* বাটন লিংকস */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/create-event"
                className="px-6 py-3 rounded-2xl bg-base-200/80 hover:bg-base-300 text-base-content font-bold text-xs flex items-center gap-2 border border-base-300 transition-all"
              >
                <PlusCircle className="w-4 h-4 text-emerald-600" />
                <span>Host a Community Initiative</span>
              </Link>
              <div className="flex items-center gap-2 text-xs font-semibold text-base-content/60">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% Free & Open Platform</span>
              </div>
            </div>

            {/* লাইভ ইমপ্যাক্ট কাউন্টার বার */}
            <div className="pt-6 border-t border-base-300 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="p-3 rounded-2xl bg-base-200/40 border border-base-300/60">
                <p className="text-2xl sm:text-3xl font-black text-emerald-600">14k+</p>
                <p className="text-[11px] text-base-content/60 font-semibold uppercase">Warm Coats & Kits</p>
              </div>
              <div className="p-3 rounded-2xl bg-base-200/40 border border-base-300/60">
                <p className="text-2xl sm:text-3xl font-black text-base-content">92+</p>
                <p className="text-[11px] text-base-content/60 font-semibold uppercase">Local Drives</p>
              </div>
              <div className="p-3 rounded-2xl bg-base-200/40 border border-base-300/60">
                <p className="text-2xl sm:text-3xl font-black text-teal-600">4.2k+</p>
                <p className="text-[11px] text-base-content/60 font-semibold uppercase">Active Volunteers</p>
              </div>
            </div>

          </div>

          {/* ডান কলাম: ইউনিক শোকেস টিকিট কার্ড */}
          <div className="lg:col-span-5 relative">
            
            {/* ডেকোরেটিভ গ্লো বক্স */}
            <div className="relative rounded-3xl overflow-hidden border border-base-300 bg-base-100 shadow-2xl">
              
              {/* ছবির অংশ */}
              <div className="relative w-full aspect-[4/3] bg-base-300 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=80"
                  alt="Winter clothes distribution"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* টিকিট স্টাইল ডেট ব্যাজ */}
                <div className="absolute top-4 left-4">
                  <DateBadge dateString="2026-11-15" />
                </div>

                <div className="absolute top-4 right-4">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-rose-600 text-white shadow-lg">
                    Urgent Need
                  </span>
                </div>

                {/* ছবির নিচের কন্টেন্ট */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold">
                    Featured Initiative
                  </span>
                  <h3 className="text-xl font-black mt-0.5 leading-snug">
                    Winter Clothes & Blanket Relief 2026
                  </h3>
                  <p className="text-xs text-white/80 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Mirpur 10 & Mohammadpur Town Hall, Dhaka</span>
                  </p>
                </div>
              </div>

              {/* নিচের প্রোগ্রেস ও পার্টিসিপেশন কার্ড */}
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-base-content/70 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span>Volunteer Target</span>
                  </span>
                  <span className="text-emerald-600">42 / 50 Enrolled (84%)</span>
                </div>

                <div className="w-full h-2 rounded-full bg-base-200 overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: "84%" }} />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex -space-x-2">
                    {["A", "T", "R", "S"].map((initial, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 ring-2 ring-base-100 flex items-center justify-center text-[10px] font-bold"
                      >
                        {initial}
                      </div>
                    ))}
                    <div className="w-7 h-7 rounded-full bg-base-300 text-base-content ring-2 ring-base-100 flex items-center justify-center text-[10px] font-bold">
                      +38
                    </div>
                  </div>

                  <Link
                    href="/events"
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <span>View All Drives</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>

            {/* ফ্লোটিং স্যাটিসফ্যাকশন ব্যাজ */}
            <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-base-100 border border-base-300 shadow-xl">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-black text-base-content">100% Volunteer Driven</p>
                <p className="text-[10px] text-base-content/60">Transparent community tracking</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default BannerSection;
