import React from "react";
import FeatureCard from "./FeatureCard";
import { Sparkles, Compass, CalendarCheck2, ShieldCheck, BarChart3 } from "lucide-react";

// হোম পেজের ফিচার সেকশন
const FeatureSection = () => {
  const features = [
    {
      icon: Compass,
      title: "Discover Local Needs",
      description:
        "Locate urgent volunteer drives and community service events happening directly in your vicinity.",
      colorClass:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
    },
    {
      icon: CalendarCheck2,
      title: "Effortless Event Hosting",
      description:
        "Create community events in minutes with full date protection, location tags, and categorized agendas.",
      colorClass:
        "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
    },
    {
      icon: ShieldCheck,
      title: "One-Click Join & Tracking",
      description:
        "Join events as an active volunteer with instant confirmation, and track all your contributions in one place.",
      colorClass:
        "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    },
    {
      icon: BarChart3,
      title: "Impact & Management",
      description:
        "Keep total control over events you organize with real-time updates, participant rosters, and simple edits.",
      colorClass:
        "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-base-200/40 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* সেকশন হেডার */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-base-200 border border-base-300 text-xs font-semibold text-emerald-600 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Platform Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-base-content tracking-tight">
            Built for Grassroots Action
          </h2>
          <p className="text-base text-base-content/70 mt-3 leading-relaxed">
            Everything you need to mobilize volunteers, organize humanitarian drives, and build resilient, compassionate communities.
          </p>
        </div>

        {/* ৪টি ফিচার কার্ডের গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              colorClass={feature.colorClass}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeatureSection;
