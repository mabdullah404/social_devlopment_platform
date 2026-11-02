import React from "react";
import { Tag } from "lucide-react";

// পুনঃব্যবহারযোগ্য ও সহজ ব্যাজ কম্পোনেন্ট
const Badge = ({ type = "default", children, className = "" }) => {
  const getStyles = () => {
    switch (type.toLowerCase()) {
      case "donation":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      case "cleanup":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case "plantation":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
      case "healthcare":
        return "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800";
      case "education":
        return "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      case "success":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
      default:
        return "bg-base-200 text-base-content/80 border-base-300";
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border shadow-sm transition-colors ${getStyles()} ${className}`}
    >
      <Tag className="w-3 h-3" />
      <span>{children}</span>
    </span>
  );
};

export default Badge;

