import React from "react";
import Link from "next/link";
import DateBadge from "@/components/events/DateBadge";
import { 
  MapPin, 
  ArrowUpRight, 
  Users, 
  Heart, 
  Sparkles, 
  Trees, 
  Stethoscope, 
  GraduationCap, 
  ShieldAlert 
} from "lucide-react";

// আধুনিক ও ইউনিক ডিজাইন সমৃদ্ধ ইভেন্ট কার্ড (ThemeForest স্টাইল)
const EventCard = ({ event }) => {
  // ক্যাটাগরি আইকন ও কালার স্কিম
  const getCategoryMeta = (type) => {
    switch (type?.toLowerCase()) {
      case "donation":
        return {
          icon: Heart,
          text: "Donation Drive",
          chip: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800",
          bar: "bg-rose-500",
        };
      case "cleanup":
        return {
          icon: Sparkles,
          text: "Cleanliness Campaign",
          chip: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800",
          bar: "bg-blue-500",
        };
      case "plantation":
        return {
          icon: Trees,
          text: "Urban Afforestation",
          chip: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
          bar: "bg-emerald-500",
        };
      case "healthcare":
        return {
          icon: Stethoscope,
          text: "Free Medical Care",
          chip: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800",
          bar: "bg-teal-500",
        };
      case "education":
        return {
          icon: GraduationCap,
          text: "Youth Workshop",
          chip: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
          bar: "bg-amber-500",
        };
      default:
        return {
          icon: ShieldAlert,
          text: type || "Social Service",
          chip: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800",
          bar: "bg-indigo-500",
        };
    }
  };

  const meta = getCategoryMeta(event.eventType);
  const CategoryIcon = meta.icon;

  // তারিখ ফরম্যাটিং
  const formatFullDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  // ডেমো ভলান্টিয়ার প্রোগ্রেস (ইউনিক ও প্রফেশনাল লুকের জন্য)
  const registeredCount = event.volunteerCount || 18;
  const targetCount = event.targetVolunteers || 30;
  const progressPercent = Math.min(Math.round((registeredCount / targetCount) * 100), 100);

  return (
    <div className="group relative flex flex-col h-full rounded-3xl border border-base-300 bg-base-100 overflow-hidden shadow-sm hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300">
      
      {/* ১. থাম্বনেইল ছবি ও টিকিট ব্যাজ */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-base-200">
        <img
          src={
            event.thumbnail ||
            "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"
          }
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* গ্রেডিয়েন্ট ফিল্টার */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 opacity-70 group-hover:opacity-60 transition-opacity" />

        {/* ইউনিক ক্যালেন্ডার ডেট ব্যাজ (টপ-লেফট) */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <DateBadge dateString={event.eventDate} />
        </div>

        {/* ক্যাটাগরি চিপ (টপ-রাইট) */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md shadow-md ${meta.chip}`}
          >
            <CategoryIcon className="w-3.5 h-3.5" />
            <span>{meta.text}</span>
          </span>
        </div>

        {/* ছবির নিচের বার: ফুল ডেট */}
        <div className="absolute bottom-3 left-3.5 right-3.5 text-white/90 text-xs font-medium drop-shadow-md">
          <span>{formatFullDate(event.eventDate)}</span>
        </div>
      </div>

      {/* ২. কার্ডের বডি */}
      <div className="p-6 flex flex-col flex-1 justify-between gap-5">
        
        <div className="space-y-3">
          {/* লোকেশন পিন */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
            <span className="truncate">{event.location}</span>
          </div>

          {/* টাইটেল */}
          <h3 className="font-bold text-lg text-base-content group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
            {event.title}
          </h3>

          {/* সংক্ষিপ্ত বর্ণনা */}
          {event.description && (
            <p className="text-xs text-base-content/70 line-clamp-2 leading-relaxed">
              {event.description}
            </p>
          )}

          {/* ইউনিক প্রোগ্রেস বার (ভলান্টিয়ার ক্যাপাসিটি নির্দেশক) */}
          <div className="pt-2 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-base-content/70">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3 text-base-content/50" />
                <span>Volunteers Enrolled</span>
              </span>
              <span className="text-emerald-600 font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-base-200 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${meta.bar}`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* ৩. কার্ড ফুটার ও বাটন */}
        <div className="pt-4 border-t border-base-200/80 flex items-center justify-between gap-3">
          
          {/* হোস্ট / অর্গানাইজার ইনফো */}
          <div className="flex items-center gap-2 truncate">
            <div className="w-7 h-7 rounded-full bg-base-300 text-base-content flex items-center justify-center font-bold text-xs shrink-0">
              {(event.userName || event.userEmail || "C").charAt(0).toUpperCase()}
            </div>
            <div className="truncate">
              <p className="text-[10px] text-base-content/50 uppercase font-semibold">Organized by</p>
              <p className="text-xs font-medium text-base-content truncate">
                {event.userName || (event.userEmail ? event.userEmail.split("@")[0] : "Civic Lead")}
              </p>
            </div>
          </div>

          {/* View Details বাটন */}
          <Link
            href={`/events/${event._id}`}
            className="px-4 py-2.5 rounded-xl bg-base-200 hover:bg-emerald-600 text-base-content hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all group-hover:bg-emerald-600 group-hover:text-white shadow-sm shrink-0"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

        </div>

      </div>

    </div>
  );
};

export default EventCard;
