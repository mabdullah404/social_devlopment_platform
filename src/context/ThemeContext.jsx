"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// থিম শেয়ার করার জন্য সাধারণ Context
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  // ব্রাউজার লোড হলে সংরক্ষিত থিম চেক করা
  useEffect(() => {
    const savedTheme = localStorage.getItem("app_theme") || "light";
    setTheme(savedTheme);
    applyTheme(savedTheme);
    setMounted(true);
  }, []);

  // HTML এ থিম ক্লাস ও DaisyUI data-theme অ্যাপ্লাই করার সাধারণ ফাংশন
  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    if (newTheme === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
  };

  // থিম পরিবর্তনের টগল ফাংশন
  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("app_theme", nextTheme);
    applyTheme(nextTheme);
  };

  // মাউন্ট হওয়ার আগে রেন্ডার না করে হাইড্রেশন সমস্যা এড়ানো
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
};

// কাস্টম হুক যাতে যেকোনো কম্পোনেন্ট থেকে থিম পাওয়া যায়
export const useTheme = () => useContext(ThemeContext);

