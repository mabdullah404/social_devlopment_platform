import React from "react";

// ইভেন্ট টিকিটের মতো আধুনিক ও ইউনিক ডেট ব্যাজ (ThemeForest / Eventbrite স্টাইল)
const DateBadge = ({ dateString, className = "" }) => {
  const dateObj = new Date(dateString);
  const isValid = !isNaN(dateObj.getTime());

  const month = isValid
    ? dateObj.toLocaleDateString("en-US", { month: "short" }).toUpperCase()
    : "TBD";
  const day = isValid ? dateObj.getDate() : "--";

  return (
    <div
      className={`flex flex-col items-center justify-center w-12 h-14 rounded-2xl bg-base-100/95 dark:bg-slate-900/90 backdrop-blur-md border border-base-300 dark:border-slate-700 shadow-md text-center shrink-0 ${className}`}
    >
      <span className="text-[10px] font-extrabold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase leading-none pt-1">
        {month}
      </span>
      <span className="text-lg font-black text-base-content leading-none mt-0.5">
        {day}
      </span>
    </div>
  );
};

export default DateBadge;

