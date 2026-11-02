"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { 
  HeartHandshake, 
  CalendarDays, 
  PlusCircle, 
  FolderKanban, 
  CheckCircle2, 
  User, 
  LogOut, 
  Menu, 
  X 
} from "lucide-react";
import toast from "react-hot-toast";

// সহজ ও রেসপনসিভ ন্যাভবার কম্পোনেন্ট
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
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
    }
  };

  // সক্রিয় লিংকের স্টাইল
  const isActive = (path) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-base-300 bg-base-100/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* ১. লোগো ও ব্র্যান্ডের নাম */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-base-content flex items-center gap-1">
                Impact<span className="text-emerald-600">Sphere</span>
              </span>
              <span className="text-[10px] text-base-content/60 font-medium -mt-1 hidden sm:block">
                Community Action
              </span>
            </div>
          </Link>

          {/* ২. ডেস্কটপ নেভিগেশন লিংকস */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                isActive("/") ? "text-emerald-600 font-semibold" : "text-base-content/80"
              }`}
            >
              Home
            </Link>
            <Link
              href="/events"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-emerald-600 ${
                isActive("/events") ? "text-emerald-600 font-semibold" : "text-base-content/80"
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              Upcoming Events
            </Link>
          </nav>

          {/* ৩. ডান পাশের বাটন ও অথেনটিকেশন স্টেট */}
          <div className="flex items-center gap-3">
            {/* থিম পরিবর্তন বাটন */}
            <ThemeToggle />

            {/* লোডিং অবস্থা */}
            {isPending ? (
              <div className="w-8 h-8 rounded-full bg-base-300 animate-pulse" />
            ) : session?.user ? (
              /* ৪. লগইন থাকা অবস্থায় ইউজার প্রফাইল ড্রপডাউন */
              <div className="relative">
                <div
                  className="tooltip tooltip-bottom cursor-pointer"
                  data-tip={session.user.name || "User Profile"}
                >
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    type="button"
                    className="flex items-center gap-2 p-1 rounded-full border-2 border-emerald-500/40 hover:border-emerald-500 transition-colors focus:outline-none"
                    aria-label="User menu"
                  >
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || "User avatar"}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-sm">
                        {(session.user.name || "U").charAt(0).toUpperCase()}
                      </div>
                    )}
                  </button>
                </div>

                {/* ড্রপডাউন মেনু */}
                {dropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setDropdownOpen(false)} 
                    />
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-base-100 border border-base-300 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      {/* ইউজার তথ্য */}
                      <div className="px-4 py-2 border-b border-base-200">
                        <p className="text-sm font-semibold text-base-content truncate">
                          {session.user.name}
                        </p>
                        <p className="text-xs text-base-content/60 truncate">
                          {session.user.email}
                        </p>
                      </div>

                      {/* ড্রপডাউন লিংকসমূহ (PDF রিকোয়ারমেন্ট অনুযায়ী) */}
                      <div className="py-1">
                        <Link
                          href="/create-event"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-base-content/90 hover:bg-base-200 hover:text-emerald-600 transition-colors"
                        >
                          <PlusCircle className="w-4 h-4 text-emerald-600" />
                          Create Event
                        </Link>
                        <Link
                          href="/manage-events"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-base-content/90 hover:bg-base-200 hover:text-emerald-600 transition-colors"
                        >
                          <FolderKanban className="w-4 h-4 text-indigo-500" />
                          Manage Events
                        </Link>
                        <Link
                          href="/joined-events"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-base-content/90 hover:bg-base-200 hover:text-emerald-600 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4 text-teal-500" />
                          Joined Events
                        </Link>
                        <Link
                          href="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-base-content/90 hover:bg-base-200 hover:text-emerald-600 transition-colors"
                        >
                          <User className="w-4 h-4 text-amber-500" />
                          My Profile
                        </Link>
                      </div>

                      {/* লগআউট বাটন */}
                      <div className="border-t border-base-200 pt-1">
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            handleLogout();
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* ৫. লগআউট থাকা অবস্থায় বাটনসমূহ */
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-base-content/80 hover:text-emerald-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all shadow-emerald-600/20 active:scale-95"
                >
                  Register
                </Link>
              </div>
            )}

            {/* মোবাইল মেনু টগল বাটন */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-base-content hover:bg-base-200"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* মোবাইল ন্যাভিগেশন মেনু */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-base-300 bg-base-100 px-4 pt-2 pb-4 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-base-content hover:bg-base-200"
          >
            Home
          </Link>
          <Link
            href="/events"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-base-content hover:bg-base-200"
          >
            Upcoming Events
          </Link>
          {session?.user && (
            <>
              <div className="border-t border-base-200 pt-2 text-xs font-semibold uppercase text-base-content/50 px-3">
                Dashboard
              </div>
              <Link
                href="/create-event"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-base-content hover:bg-base-200"
              >
                Create Event
              </Link>
              <Link
                href="/manage-events"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-base-content hover:bg-base-200"
              >
                Manage Events
              </Link>
              <Link
                href="/joined-events"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-base-content hover:bg-base-200"
              >
                Joined Events
              </Link>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-base-content hover:bg-base-200"
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

