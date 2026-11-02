import React from "react";
import BannerSection from "@/components/home/BannerSection";
import FeatureSection from "@/components/home/FeatureSection";
import RecentEvents from "@/components/home/RecentEvents";
import GallerySection from "@/components/home/GallerySection";
import NewsletterSection from "@/components/home/NewsletterSection";

// হোম পেজ - ৫টি সেকশনের সমন্বয়ে গঠিত (PDF রিকোয়ারমেন্ট অনুযায়ী)
export default function HomePage() {
  return (
    <div className="w-full space-y-0">
      {/* ১. ব্যানার সেকশন */}
      <BannerSection />

      {/* ২. ফিচার সেকশন */}
      <FeatureSection />

      {/* ৩. সাম্প্রতিক ৬টি আসন্ন ইভেন্ট সেকশন (ডায়নামিক) */}
      <RecentEvents />

      {/* ৪. গ্যালারি সেকশন (বাস্তব মানবিক কাজের ছবি) */}
      <GallerySection />

      {/* ৫. নিউজলেটার সেকশন */}
      <NewsletterSection />
    </div>
  );
}
