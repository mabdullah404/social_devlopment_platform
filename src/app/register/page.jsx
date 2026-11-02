"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn, useSession } from "@/lib/auth-client";
import PasswordRequirement from "@/components/forms/PasswordRequirement";
import { HeartHandshake, Mail, Lock, User, Image as ImageIcon, Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

// রেজিস্ট্রেশন পেজ
const RegisterPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  // ফর্মের স্টেট
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ইতিমধ্যে লগইন থাকলে রিডাইরেক্ট করা
  if (session?.user) {
    router.push("/");
    return null;
  }

  // ফর্ম সাবমিট হ্যান্ডলার
  const handleRegister = async (e) => {
    e.preventDefault();

    // ১. নাম ভ্যালিডেশন
    if (!name.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    // ২. ইমেইল ভ্যালিডেশন
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // ৩. পাসওয়ার্ড ভ্যালিডেশন (PDF রিকোয়ারমেন্ট: বড় হাতের অক্ষর, ছোট হাতের অক্ষর এবং কমপক্ষে ৬ অক্ষর)
    const hasMinLength = password.length >= 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    if (!hasMinLength) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (!hasUppercase) {
      toast.error("Password must contain at least one uppercase letter (A-Z).");
      return;
    }
    if (!hasLowercase) {
      toast.error("Password must contain at least one lowercase letter (a-z).");
      return;
    }

    setLoading(true);

    try {
      // BetterAuth দিয়ে রেজিস্ট্রেশন সম্পন্ন করা
      const { data, error } = await signUp.email({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password,
        image: photoURL.trim() || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      });

      if (error) {
        toast.error(error.message || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      // সফল রেজিস্ট্রেশনের পর SweetAlert2 প্রদর্শন
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: `Welcome to ImpactSphere, ${name}! Your account has been created.`,
        confirmButtonColor: "#059669",
        confirmButtonText: "Get Started",
      }).then(() => {
        router.push("/");
      });
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // গুগল লগইন হ্যান্ডলার
  const handleGoogleLogin = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-base-100">
      <div className="w-full max-w-md space-y-8 p-8 bg-base-100 rounded-3xl border border-base-300 shadow-xl">
        
        {/* হেডার */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-500/20 mb-3">
            <HeartHandshake className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-base-content tracking-tight">
            Join the Community
          </h2>
          <p className="text-sm text-base-content/60 mt-1">
            Create an account to host and join impactful social service events
          </p>
        </div>

        {/* রেজিস্ট্রেশন ফর্ম */}
        <form onSubmit={handleRegister} className="mt-8 space-y-4">
          
          {/* নাম ফিল্ড */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-base-content/70">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tanvir Ahmed"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-base-300 bg-base-200/50 text-base-content text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
              />
            </div>
          </div>

          {/* ইমেইল ফিল্ড */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-base-content/70">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-base-300 bg-base-200/50 text-base-content text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
              />
            </div>
          </div>

          {/* ফটো URL ফিল্ড */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-base-content/70">
              Photo URL
            </label>
            <div className="relative">
              <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
              <input
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-base-300 bg-base-200/50 text-base-content text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
              />
            </div>
          </div>

          {/* পাসওয়ার্ড ফিল্ড */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-base-content/70">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-base-300 bg-base-200/50 text-base-content text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content/70"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* পাসওয়ার্ড রুলসের লাইভ ভিউ */}
            <PasswordRequirement password={password} />
          </div>

          {/* সাবমিট বাটন */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* ডিভাইডার */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-base-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-base-100 px-3 text-base-content/50">
              Or continue with
            </span>
          </div>
        </div>

        {/* সোশ্যাল লগইন বাটন (Google) */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full py-2.5 px-4 rounded-xl border border-base-300 bg-base-100 hover:bg-base-200 text-base-content font-medium text-sm flex items-center justify-center gap-2.5 transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Continue with Google
        </button>

        {/* লগইন লিংক */}
        <p className="text-center text-sm text-base-content/70 pt-2">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-emerald-600 hover:text-emerald-700 underline-offset-4 hover:underline"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
};

export default RegisterPage;

