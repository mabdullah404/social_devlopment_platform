import React from "react";
import Link from "next/link";
import { HeartHandshake, ArrowLeft, Home } from "lucide-react";

// কাস্টম ৪০৪ পেজ (রুট না পাওয়া গেলে প্রদর্শন)
export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center bg-base-100">
      <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-6 shadow-sm">
        <HeartHandshake className="w-8 h-8" />
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 mb-3">
        404 - Not Found
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-base-content tracking-tight mb-2">
        Looking for a Community Initiative?
      </h1>

      <p className="text-sm sm:text-base text-base-content/70 max-w-md mx-auto mb-8">
        The page or event you requested does not exist or may have been relocated.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/"
          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/events"
          className="px-6 py-3 rounded-2xl border border-base-300 text-base-content hover:bg-base-200 font-medium text-sm flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore Upcoming Events</span>
        </Link>
      </div>
    </div>
  );
}

