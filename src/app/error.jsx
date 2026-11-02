"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

// গ্লোবাল এরর বাউন্ডারি কম্পোনেন্ট
export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Unhandled Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center bg-base-100">
      <div className="w-16 h-16 rounded-3xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mb-6 shadow-sm">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content tracking-tight mb-2">
        Something went wrong
      </h1>

      <p className="text-sm text-base-content/70 max-w-md mx-auto mb-8">
        An unexpected error occurred while loading this section. You can retry the request or return to the home page.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        <Link
          href="/"
          className="px-6 py-3 rounded-2xl border border-base-300 text-base-content hover:bg-base-200 font-medium text-sm flex items-center gap-2 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
