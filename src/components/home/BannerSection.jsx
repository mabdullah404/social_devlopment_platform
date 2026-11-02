import React from "react";
import Link from "next/link";
import { ArrowRight, PlusCircle, Users, Heart, MapPin, Sparkles } from "lucide-react";

// হোম পেজের ব্যানার সেকশন (সোশ্যাল ডেভেলপমেন্ট ও কমিউনিটি সার্ভিস থিম)
const BannerSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-500/5 via-base-100 to-base-100 py-16 md:py-24 border-b border-base-300">
      
      {/* ব্যাকগ্রাউন্ড ডেকোরেশন */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* বাম পাশের টেক্সট কন্টেন্ট */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* টপ ব্যাজ */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Community-Driven Social Development Platform</span>
            </div>

            {/* প্রধান শিরোনাম (Consistent Heading Style) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-base-content tracking-tight leading-[1.15]">
              Empower Your <span className="text-emerald-600">Community</span>, Create Real Impact
            </h1>

            {/* সাবটেক্সট */}
            <p className="text-base sm:text-lg text-base-content/70 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Connect with conscious citizens in your neighborhood. Discover, organize, and participate in grassroots humanitarian drives—from winter blanket distribution in Mirpur & Mohammadpur to urban tree plantations and neighborhood cleanups.
            </p>

            {/* কল-টু-অ্যাকশন বাটনসমূহ */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/events"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 active:scale-95 transition-all"
              >
                <span>Explore Upcoming Events</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                href="/create-event"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl border border-base-300 bg-base-100 hover:bg-base-200 text-base-content font-medium text-sm flex items-center justify-center gap-2 transition-all"
              >
                <PlusCircle className="w-4 h-4 text-emerald-600" />
                <span>Host an Event</span>
              </Link>
            </div>

            {/* স্ট্যাটিস্টিক্স বার */}
            <div className="pt-6 border-t border-base-300 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-base-content">12k+</p>
                <p className="text-xs text-base-content/60 font-medium">Lives Touched</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-emerald-600">85+</p>
                <p className="text-xs text-base-content/60 font-medium">Local Drives</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-base-content">3.5k+</p>
                <p className="text-xs text-base-content/60 font-medium">Volunteers</p>
              </div>
            </div>

          </div>

          {/* ডান পাশের ফিচার ইমেজ কার্ড */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-base-300 aspect-[4/3] bg-base-200">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=80"
                alt="Community volunteers distributing clothes"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* ফ্লোটিং ইনফো কার্ড */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-base-100/90 dark:bg-base-900/90 backdrop-blur-md border border-white/20 shadow-lg text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-base-content">
                      Winter Clothes & Blanket Relief
                    </h4>
                    <p className="text-xs text-base-content/70 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      Mirpur 10 & Mohammadpur, Dhaka
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ছোট ফ্লোটিং ব্যাজ */}
            <div className="absolute -top-4 -right-4 hidden sm:flex items-center gap-2 p-3 rounded-2xl bg-base-100 border border-base-300 shadow-xl">
              <Users className="w-5 h-5 text-emerald-600" />
              <div className="text-left">
                <p className="text-xs font-bold text-base-content">Community First</p>
                <p className="text-[10px] text-base-content/60">100% Free & Open</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default BannerSection;

