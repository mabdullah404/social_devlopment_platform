"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { 
  Activity, 
  CalendarDays, 
  PlusCircle, 
  FolderKanban, 
  CheckCircle2, 
  User, 
  LogOut, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles 
} from "lucide-react";
import toast from "react-hot-toast";

// ইউনিক এবং প্রফেশনাল ন্যাভবার (CivicPulse)
const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // লগআউট হ্যান্ডলার
  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Successfully logged out!");
      router.push("/login");
    } catch {
      toast.error("Failed to log out. Please try again.");
    }
  };

  const isActive = (path) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-base-300 bg-base-100/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* ১. ইউনিক লোগো ও ব্র্যান্ড নেম (CivicPulse) */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-all">
              <Activity className="w-6 h-6 animate-pulse" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-base-100" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-base-content">
                  Civic<span className="text-emerald-600">Pulse</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-300/40">
                  RELIEF
                </span>
              </div>
              <span className="text-[11px] text-base-content/60 font-semibold tracking-wide hidden sm:block">
                Grassroots Action & Volunteer Network
              </span>
            </div>
          </Link>

          {/* ২. সেন্টার নেভিগেশন লিংকস */}
          <nav className="hidden md:flex items-center gap-2 p-1.5 rounded-2xl bg-base-200/60 border border-base-300">
            <Link
              href="/"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                isActive("/")
                  ? "bg-base-100 text-emerald-600 shadow-sm"
                  : "text-base-content/70 hover:text-base-content"
              }`}
            >
              Home
            </Link>
            <Link
              href="/events"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                isActive("/events")
                  ? "bg-base-100 text-emerald-600 shadow-sm"
                  : "text-base-content/70 hover:text-base-content"
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              <span>Upcoming Events</span>
            </Link>
          </nav>

          {/* ৩. ডান পাশের অ্যাকশনস */}
          <div className="flex items-center gap-3">
            
            {/* থিম পরিবর্তন বাটন */}
            <ThemeToggle />

            {/* হোস্ট ইভেন্ট কুইক বাটন (ডেস্কটপ) */}
            <Link
              href="/create-event"
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-950 transition-all"
            >
              <PlusCircle className="w-4 h-4 text-emerald-600" />
              <span>Host a Drive</span>
            </Link>

            {/* লোডিং অবস্থা */}
            {isPending ? (
              <div className="w-9 h-9 rounded-full bg-base-300 animate-pulse" />
            ) : session?.user ? (
              /* ৪. লগইন থাকা অবস্থায় ইউজার প্রফাইল ড্রপডাউন */
              <div className="relative">
                {/* হোভার করলে নাম প্রদর্শনের টুলটিপ (PDF রিকোয়ারমেন্ট) */}
                <div
                  className="tooltip tooltip-bottom cursor-pointer"
                  data-tip={`Logged in as ${session.user.name || "User"}`}
                >
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    type="button"
                    className="relative flex items-center p-0.5 rounded-full ring-2 ring-emerald-500/40 hover:ring-emerald-500 transition-all focus:outline-none"
                    aria-label="User account"
                  >
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || "User avatar"}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-black text-sm">
                        {(session.user.name || "C").charAt(0).toUpperCase()}
                      </div>
                    )}
                    {/* অনলাইন গ্রিন ডট */}
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-base-100" />
                  </button>
                </div>

                {/* ইউনিক ড্রপডাউন মেনু */}
                {dropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-3 w-64 rounded-3xl bg-base-100 border border-base-300 shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                      
                      {/* টপ হেডার কার্ড */}
                      <div className="p-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
                        <div className="flex items-center gap-2 mb-1">
                          <ShieldCheck className="w-4 h-4 text-emerald-200" />
                          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-100">
                            Verified Volunteer
                          </span>
                        </div>
                        <p className="font-bold text-sm truncate">{session.user.name}</p>
                        <p className="text-xs text-emerald-100/80 truncate mt-0.5">
                          {session.user.email}
                        </p>
                      </div>

                      {/* ড্রপডাউন লিংকসমূহ (PDF রিকোয়ারমেন্ট: Create, Manage, Joined) */}
                      <div className="p-2 space-y-1">
                        <Link
                          href="/create-event"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-base-content/80 hover:bg-base-200 hover:text-emerald-600 transition-colors"
                        >
                          <PlusCircle className="w-4 h-4 text-emerald-600" />
                          <span>Create Event</span>
                        </Link>
                        <Link
                          href="/manage-events"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-base-content/80 hover:bg-base-200 hover:text-emerald-600 transition-colors"
                        >
                          <FolderKanban className="w-4 h-4 text-indigo-500" />
                          <span>Manage Events</span>
                        </Link>
                        <Link
                          href="/joined-events"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-base-content/80 hover:bg-base-200 hover:text-emerald-600 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4 text-teal-500" />
                          <span>Joined Events</span>
                        </Link>
                        <Link
                          href="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-base-content/80 hover:bg-base-200 hover:text-emerald-600 transition-colors"
                        >
                          <User className="w-4 h-4 text-amber-500" />
                          <span>My Profile</span>
                        </Link>
                      </div>

                      {/* লগআউট বাটন */}
                      <div className="p-2 border-t border-base-200">
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            handleLogout();
                          }}
                          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>

                    </div>
                  </>
                )}
              </div>
            ) : (
              /* ৫. লগআউট থাকলে সাইন ইন / রেজিস্টার বাটন */
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-xs font-bold text-base-content/80 hover:text-emerald-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* মোবাইল মেনু বাটন */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-base-content hover:bg-base-200"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* মোবাইল ন্যাভিগেশন মেনু */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-base-300 bg-base-100 p-4 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-base-content hover:bg-base-200"
          >
            Home
          </Link>
          <Link
            href="/events"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-base-content hover:bg-base-200"
          >
            Upcoming Events
          </Link>
          {session?.user && (
            <>
              <div className="border-t border-base-200 pt-2 text-[10px] font-bold uppercase tracking-wider text-base-content/50 px-3">
                My Workspace
              </div>
              <Link
                href="/create-event"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-semibold text-base-content hover:bg-base-200"
              >
                Create Event
              </Link>
              <Link
                href="/manage-events"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-semibold text-base-content hover:bg-base-200"
              >
                Manage Events
              </Link>
              <Link
                href="/joined-events"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-semibold text-base-content hover:bg-base-200"
              >
                Joined Events
              </Link>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-semibold text-base-content hover:bg-base-200"
              >
                My Profile
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
