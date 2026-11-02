"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, 
  PlusCircle, 
  Users, 
  MapPin, 
  Sparkles, 
  Search, 
  HeartHandshake, 
  ShieldCheck, 
  Flame, 
  Heart 
} from "lucide-react";

// সম্পূর্ণ ইউনিক ও দৃষ্টিনন্দন হিরো ব্যানার সেকশন (Royal Indigo & Sunset Amber প্যালেট)
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
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950/5 via-base-100 to-base-100 py-16 md:py-24 border-b border-base-300 dark:border-slate-800">
      
      {/* ব্যাকগ্রাউন্ড অরা গ্লো (ইন্ডিগো এবং অ্যাম্বার) */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* বাম কলাম: টেক্সট এবং কুইক সার্চ */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* টপ ব্যাজ */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-700 dark:text-indigo-300 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>CivicPulse • Grassroots Social Action Network</span>
            </div>

            {/* প্রধান শিরোনাম */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-base-content tracking-tight leading-[1.12]">
              Empower Citizens. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-rose-500">
                Transform Neighborhoods.
              </span>
            </h1>

            {/* সাবটেক্সট */}
            <p className="text-base sm:text-lg text-base-content/75 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Mobilizing conscious volunteers for verified community drives—from winter warmth and blanket distribution in Mirpur & Mohammadpur to urban tree plantations and clean water drives.
            </p>

            {/* কুইক অ্যাকশন সার্চ হাব */}
            <form
              onSubmit={handleSearchSubmit}
              className="p-2.5 rounded-3xl bg-base-100 border border-base-300 dark:border-slate-800 shadow-2xl max-w-xl mx-auto lg:mx-0 flex flex-col sm:flex-row gap-2"
            >
              <div className="relative flex-1 flex items-center">
                <Search className="absolute left-4 w-4 h-4 text-indigo-600" />
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
                className="px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 active:scale-95 transition-all shrink-0"
              >
                <span>Find Drives</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* বাটন লিংকস */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
              <Link
                href="/create-event"
                className="px-6 py-3 rounded-2xl bg-base-200/80 hover:bg-base-300 text-base-content font-bold text-xs flex items-center gap-2 border border-base-300 transition-all"
              >
                <PlusCircle className="w-4 h-4 text-indigo-600" />
                <span>Host a Community Initiative</span>
              </Link>
              <div className="flex items-center gap-2 text-xs font-semibold text-base-content/60">
                <ShieldCheck className="w-4 h-4 text-indigo-500" />
                <span>100% Volunteer Powered</span>
              </div>
            </div>

            {/* লাইভ কাউন্টার স্ট্যাটস */}
            <div className="pt-6 border-t border-base-300 dark:border-slate-800 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="p-3.5 rounded-2xl bg-base-200/40 border border-base-300/60 dark:border-slate-800">
                <p className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">14k+</p>
                <p className="text-[11px] text-base-content/60 font-bold uppercase tracking-wider">Lives Touched</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-base-200/40 border border-base-300/60 dark:border-slate-800">
                <p className="text-2xl sm:text-3xl font-black text-rose-500">92+</p>
                <p className="text-[11px] text-base-content/60 font-bold uppercase tracking-wider">Active Drives</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-base-200/40 border border-base-300/60 dark:border-slate-800">
                <p className="text-2xl sm:text-3xl font-black text-amber-500">4.2k+</p>
                <p className="text-[11px] text-base-content/60 font-bold uppercase tracking-wider">Volunteers</p>
              </div>
            </div>

          </div>

          {/* ডান কলাম: প্রিমিয়াম শোকেস কার্ড */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-base-300 dark:border-slate-800 bg-base-100 shadow-2xl">
              
              {/* ছবির অংশ */}
              <div className="relative w-full aspect-[4/3] bg-slate-900 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=80"
                  alt="Winter clothes distribution"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/40" />

                {/* টিকিট স্টাইল ডেট ব্যাজ */}
                <div className="absolute top-4 left-4 z-10 flex flex-col items-center justify-center w-12 h-14 rounded-2xl bg-base-100/95 dark:bg-slate-900/95 backdrop-blur-md border border-white/20 shadow-xl text-center">
                  <span className="text-[10px] font-black tracking-widest text-indigo-600 dark:text-indigo-400 uppercase leading-none pt-1">
                    NOV
                  </span>
                  <span className="text-lg font-black text-base-content leading-tight mt-0.5">
                    15
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-rose-600 text-white shadow-lg flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 animate-pulse" />
                    <span>Urgent Relief</span>
                  </span>
                </div>

                {/* ছবির নিচের কন্টেন্ট */}
                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <span className="text-[11px] uppercase tracking-wider text-indigo-300 font-bold">
                    Featured Drive
                  </span>
                  <h3 className="text-xl font-black mt-0.5 leading-snug">
                    Winter Warmth & Blanket Distribution 2026
                  </h3>
                  <p className="text-xs text-white/80 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Mirpur 10 & Mohammadpur Town Hall, Dhaka</span>
                  </p>
                </div>
              </div>

              {/* নিচের প্রোগ্রেস ও পার্টিসিপেশন কার্ড */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-base-content/70 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-indigo-600" />
                    <span>Volunteer Enrollment</span>
                  </span>
                  <span className="text-indigo-600 font-black">42 / 50 Joined (84%)</span>
                </div>

                <div className="w-full h-2 rounded-full bg-base-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-600 to-rose-500 rounded-full" style={{ width: "84%" }} />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex -space-x-2">
                    {["T", "A", "R", "S"].map((initial, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 ring-2 ring-base-100 flex items-center justify-center text-[10px] font-bold"
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
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1"
                  >
                    <span>View All Drives</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>

            {/* ফ্লোটিং স্যাটিসফ্যাকশন ব্যাজ */}
            <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-base-100 border border-base-300 dark:border-slate-800 shadow-xl">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-black text-base-content">100% Volunteer Driven</p>
                <p className="text-[10px] text-base-content/60">Direct community tracking</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default BannerSection;
