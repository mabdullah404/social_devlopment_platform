"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

// প্রাইভেট রুট প্রটেক্ট করার জন্য সহজ কম্পোনেন্ট
// পেজ রিলোড দিলে যেন ইউজারের সেশন চেক চলাকালীন লগইন পেজে রিডাইরেক্ট না হয়
const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    // লোডিং শেষ হওয়ার পর যদি ইউজার সেশন না পায় তবেই রিডাইরেক্ট করবে
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  // সেশন চেক চলাকালীন সুন্দর লোডার দেখানো
  if (isPending) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
        <p className="text-sm text-base-content/70 font-medium animate-pulse">
          Verifying authorization...
        </p>
      </div>
    );
  }

  // যদি ইউজার লগইন না থাকে
  if (!session?.user) {
    return null;
  }

  // ইউজার অনুমোদিত হলে কন্টেন্ট রেন্ডার করা
  return <>{children}</>;
};

export default ProtectedRoute;

