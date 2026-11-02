import React from "react";
import { HeartHandshake, Loader2 } from "lucide-react";

// গ্লোবাল পেজ লোডিং কম্পোনেন্ট
export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="relative">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shadow-sm">
          <HeartHandshake className="w-8 h-8 animate-pulse" />
        </div>
        <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-base-100 shadow-md">
          <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
        </div>
      </div>
      <p className="text-sm font-semibold text-base-content/70 mt-6 animate-pulse">
        Loading community initiatives...
      </p>
    </div>
  );
}
