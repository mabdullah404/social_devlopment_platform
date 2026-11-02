import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import dns from "node:dns";

// DNS সেটিং যাতে MongoDB SRV নিরাপদে কাজ করে
try {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch {
  // safe fallback
}

const dbUrl =
  process.env.BETTER_AUTH_DB_URL ||
  "mongodb://SocialDevelopment:nlIYFRism5X8RPDE@ac-3ww2xt0-shard-00-00.wr4odv4.mongodb.net:27017,ac-3ww2xt0-shard-00-01.wr4odv4.mongodb.net:27017,ac-3ww2xt0-shard-00-02.wr4odv4.mongodb.net:27017/better-auth-db?ssl=true&replicaSet=atlas-11txxf-shard-0&authSource=admin";

// MongoDB ক্লায়েন্ট সিঙ্গেলটন প্যাটার্ন (Next.js হট রিলোডে একাধিক কানেকশন এড়াতে)
let client;
if (process.env.NODE_ENV === "development") {
  if (!global._betterAuthMongoClient) {
    global._betterAuthMongoClient = new MongoClient(dbUrl, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
    });
  }
  client = global._betterAuthMongoClient;
} else {
  client = new MongoClient(dbUrl, {
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 8000,
  });
}

const db = client.db("better-auth-db");

// BetterAuth কনফিগারেশন (ইমেইল/পাসওয়ার্ড এবং গুগল লগইন)
export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret:
    process.env.BETTER_AUTH_SECRET || "default-dev-secret-key-for-social-app",

  // ইমেইল এবং পাসওয়ার্ড ভিত্তিক লগইন
  emailAndPassword: {
    enabled: true,
  },

  // সোশ্যাল প্রোভাইডার: শুধুমাত্র Google
  socialProviders: {
    google: {
      clientId:
        process.env.BETTER_AUTH_GOOGLE_CLIENT_ID ||
        process.env.GOOGLE_CLIENT_ID ||
        "",
      clientSecret:
        process.env.BETTER_AUTH_GOOGLE_SECRET ||
        process.env.GOOGLE_SECRET ||
        "",
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
