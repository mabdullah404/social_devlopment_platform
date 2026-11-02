import React from "react";

// ইভেন্ট কার্ডের লোডিং স্কেলিটন কম্পোনেন্ট
const EventSkeleton = () => {
  return (
    <div className="flex flex-col h-full rounded-3xl border border-base-300 bg-base-100 overflow-hidden shadow-sm animate-pulse">
      {/* ইমেজের স্কেলিটন */}
      <div className="w-full aspect-[16/10] bg-base-300" />
      
      {/* বডি সেকশন */}
      <div className="p-5 flex flex-col flex-1 space-y-4">
        {/* ক্যাটাগরি ও তারিখ */}
        <div className="flex items-center justify-between">
          <div className="w-20 h-5 bg-base-300 rounded-full" />
          <div className="w-24 h-4 bg-base-300 rounded" />
        </div>

        {/* টাইটেল */}
        <div className="space-y-2">
          <div className="w-full h-5 bg-base-300 rounded" />
          <div className="w-2/3 h-5 bg-base-300 rounded" />
        </div>

        {/* লোকেশন */}
        <div className="w-1/2 h-4 bg-base-300 rounded" />

        {/* বাটন */}
        <div className="pt-2 mt-auto">
          <div className="w-full h-10 bg-base-300 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default EventSkeleton;

