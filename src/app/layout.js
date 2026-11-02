import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CivicPulse | Grassroots Action & Volunteer Network",
  description:
    "A high-impact community-driven event management network where citizens unite to create, join, and track impactful social service events in their local neighborhoods.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-base-100 text-base-content selection:bg-emerald-500 selection:text-white transition-colors duration-200">
        <ThemeProvider>
          {/* গ্লোবাল নোটিফিকেশন টোস্টার */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "var(--color-base-100, #ffffff)",
                color: "var(--color-base-content, #1e293b)",
                border: "1px solid rgba(148, 163, 184, 0.2)",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                borderRadius: "1rem",
                padding: "12px 16px",
                fontWeight: 600,
                fontSize: "13px",
              },
            }}
          />

          {/* হেডার / ন্যাভবার */}
          <Navbar />

          {/* মূল কন্টেন্ট সেকশন */}
          <main className="flex-1 w-full">{children}</main>

          {/* ফুটার */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
