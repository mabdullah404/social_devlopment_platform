"use client";

import React, { useState } from "react";
import { Mail, Sparkles, Send, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

// হোম পেজের নিউজলেটার সাবস্ক্রিপশন সেকশন (ডিজাইন আবশ্যক, ফাংশনালিটি অপশনাল)
const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Thank you for subscribing to our community impact updates!");
    setEmail("");
  };

  return (
    <section className="py-16 md:py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-8 md:p-14 shadow-2xl">
          
          {/* ব্যাকগ্রাউন্ড ডেকোরেটিভ সার্কেল */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            
            {/* ব্যাজ */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Stay Informed & Connected</span>
            </div>

            {/* হেডিং */}
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Get Notified About Urgent Community Drives
            </h2>

            {/* সাবটেক্সট */}
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              Subscribe to receive weekly highlights of volunteer drives, winter relief calls, and environmental initiatives in your neighborhood.
            </p>

            {/* ইনপুট ফর্ম */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 shadow-sm"
                />
              </div>

              <button
                type="submit"
                className="py-3 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 shrink-0"
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-center gap-2 text-xs text-emerald-100/80 pt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>We value your privacy. No spam, ever.</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
