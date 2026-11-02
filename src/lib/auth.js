import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const dbUrl = process.env.BETTER_AUTH_DB_URL || "mongodb://localhost:27017/better-auth-db";
const client = new MongoClient(dbUrl);
const db = client.db();

// BetterAuth কনফিগারেশন (শুধুমাত্র ইমেইল/পাসওয়ার্ড এবং গুগল লগইন)
export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET || "default-dev-secret-key-for-social-app",

  // ইমেইল এবং পাসওয়ার্ড ভিত্তিক লগইন
  emailAndPassword: {
    enabled: true,
  },

  // সোশ্যাল প্রোভাইডার: শুধুমাত্র Google
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET || "",
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
