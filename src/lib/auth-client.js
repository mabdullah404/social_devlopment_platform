"use client";

import { createAuthClient } from "better-auth/react";

// BetterAuth ক্লায়েন্ট ইন্সট্যান্স
export const authClient = createAuthClient({
  // অ্যাপের বেস ইউআরএল
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

// সরাসরি ব্যবহারের জন্য সহজ এক্সপোর্ট
export const { signIn, signUp, signOut, useSession, updateUser } = authClient;

