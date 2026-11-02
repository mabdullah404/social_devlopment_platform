"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "@/lib/auth-client";
import { HeartHandshake, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

// লগইন পেজ
const LoginPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  // স্টেট
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // ইতিমধ্যে লগইন থাকলে হোমে পাঠানো
  if (session?.user) {
    router.push("/");
    return null;
  }

  // ইমেইল ও পাসওয়ার্ড লগইন হ্যান্ডলার
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }
    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await signIn.email({
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password.");
        setLoading(false);
        return;
      }

      toast.success("Welcome back! Login successful.");
      router.push("/");
    } catch {
      toast.error("Failed to sign in. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // গুগল লগইন হ্যান্ডলার
  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      toast.loading("Connecting to Google...", { id: "google-auth" });

      const res = await signIn.social({
        provider: "google",
        callbackURL: typeof window !== "undefined" ? window.location.origin + "/" : "/",
      });

      if (res?.error) {
        toast.dismiss("google-auth");
        console.error("Google login error:", res.error);
        toast.error(res.error.message || "Google sign in failed. Please check Authorized Redirect URIs in Google Console.");
        setGoogleLoading(false);
        return;
      }

      // যদি রিডাইরেক্ট ইউআরএল থাকে তবে ব্রাউজারকে সেখানে পাঠানো
      if (res?.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      toast.dismiss("google-auth");
      console.error("Google sign in exception:", error);
      toast.error("Google sign in error. Check Google credentials & redirect URI.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-base-100">
      <div className="w-full max-w-md space-y-8 p-8 bg-base-100 rounded-3xl border border-base-300 dark:border-slate-800 shadow-2xl">
        
        {/* হেডার */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20 mb-3">
            <HeartHandshake className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-base-content tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-base-content/60 mt-1">
            Sign in to continue making an impact in your neighborhood
          </p>
        </div>

        {/* ফর্ম */}
        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          
          {/* ইমেইল */}
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-base-300 dark:border-slate-800 bg-base-200/50 text-base-content text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all font-medium"
              />
            </div>
          </div>

          {/* পাসওয়ার্ড */}
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
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-base-300 dark:border-slate-800 bg-base-200/50 text-base-content text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content/70"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* লগইন বাটন */}
          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* ডিভাইডার */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-base-300 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-base-100 px-3 text-base-content/50 font-semibold">
              Or continue with
            </span>
          </div>
        </div>

        {/* গুগল লগইন বাটন */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          disabled={loading || googleLoading}
          className="w-full py-3 px-4 rounded-xl border border-base-300 dark:border-slate-800 bg-base-100 hover:bg-base-200 text-base-content font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-sm active:scale-[0.98] disabled:opacity-50"
        >
          {googleLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
              <span>Redirecting to Google...</span>
            </>
          ) : (
            <>
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
              <span>Continue with Google</span>
            </>
          )}
        </button>

        {/* রেজিস্টার লিংক */}
        <p className="text-center text-sm text-base-content/70 pt-2 font-medium">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-4"
          >
            Create an Account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;
