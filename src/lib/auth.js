import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import dns from "node:dns";

// DNS সার্ভার সেট করা যাতে MongoDB SRV কানেকশন নির্বিঘ্নে কাজ করে
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL || "");
const db = client.db("better-auth-db");

// BetterAuth কনফিগারেশন
export const auth = betterAuth({
  // ইমেইল এবং পাসওয়ার্ড ভিত্তিক লগইন সক্ষম করা
  emailAndPassword: {
    enabled: true,
  },

  // গুগল এবং গিটহাব সোশ্যাল প্রোভাইডার
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET || "",
    },
    github: {
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID || "",
      clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET || "",
    },
  },

  // ইউজার ফাইলে অতিরিক্ত ফটো ফিল্ড সাপোর্ট
  user: {
    additionalFields: {
      photoURL: {
        type: "string",
        required: false,
        defaultValue: "",
      },
    },
  },

  // ডাটাবেজের জন্য MongoDB অ্যাডাপ্টার
  database: mongodbAdapter(db, {
    client,
  }),
});
