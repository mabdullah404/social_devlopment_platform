"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

// লাইট এবং ডার্ক মোড টগল করার সহজ বাটন কম্পোনেন্ট
const ThemeToggle = () => {
  const { theme, toggleTheme, mounted } = useTheme();

  // যদি মাউন্ট না হয়, খালি বাটন রেন্ডার রাখা
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full border border-base-300 opacity-50" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle theme"
      className="btn btn-ghost btn-circle text-base-content hover:bg-base-200 transition-colors"
      title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 text-slate-700" />
      ) : (
        <Sun className="w-5 h-5 text-amber-400" />
      )}
    </button>
  );
};

export default ThemeToggle;

