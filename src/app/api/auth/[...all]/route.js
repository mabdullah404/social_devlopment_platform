import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// BetterAuth Next.js App Router হ্যান্ডলার
export const { POST, GET } = toNextJsHandler(auth);
