import React from "react";
import Link from "next/link";
import { 
  MapPin, 
  ArrowUpRight, 
  Users, 
  Clock, 
  Heart, 
  Sparkles, 
  Trees, 
  Stethoscope, 
  GraduationCap, 
  Flame, 
  ShieldCheck 
} from "lucide-react";

// আন্তর্জাতিক ও সম্পূর্ণ ইউনিক টিকিট-স্টাব স্টাইল ইভেন্ট কার্ড (ThemeForest / Eventbrite স্ট্যান্ডার্ড)
const EventCard = ({ event }) => {
  // ক্যাটাগরি তথ্য ও কালার স্কিম (রয়েল ইন্ডিগো এবং সানসেট কোরাল থিম)
  const getCategoryMeta = (type) => {
    switch (type?.toLowerCase()) {
      case "donation":
        return {
          icon: Heart,
          label: "Winter & Relief Aid",
          badgeColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
          progressColor: "bg-gradient-to-r from-rose-500 to-amber-500",
          urgency: "High Priority",
        };
      case "cleanup":
        return {
          icon: Sparkles,
          label: "Civic Sanitation",
          badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
          progressColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
          urgency: "Eco Action",
        };
      case "plantation":
        return {
          icon: Trees,
          label: "Urban Afforestation",
          badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
          progressColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
          urgency: "Green Drive",
        };
      case "healthcare":
        return {
          icon: Stethoscope,
          label: "Medical & Health",
          badgeColor: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
          progressColor: "bg-gradient-to-r from-teal-500 to-indigo-500",
          urgency: "Health Camp",
        };
      case "education":
        return {
          icon: GraduationCap,
          label: "Youth Empowerment",
          badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
          progressColor: "bg-gradient-to-r from-amber-500 to-orange-500",
          urgency: "Skills Drive",
        };
      default:
        return {
          icon: Heart,
          label: type || "Community Drive",
          badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
          progressColor: "bg-gradient-to-r from-indigo-500 to-violet-500",
          urgency: "Community First",
        };
    }
  };

  const meta = getCategoryMeta(event.eventType);
  const CategoryIcon = meta.icon;

  // তারিখ এবং দিন গণনা (Countdown)
  const eventDateObj = new Date(event.eventDate);
  const isValidDate = !isNaN(eventDateObj.getTime());
  
  const monthName = isValidDate
    ? eventDateObj.toLocaleDateString("en-US", { month: "short" }).toUpperCase()
    : "DATE";
  const dayNumber = isValidDate ? eventDateObj.getDate() : "--";
  const weekday = isValidDate
    ? eventDateObj.toLocaleDateString("en-US", { weekday: "short" })
    : "";

  const calculateDaysRemaining = () => {
    if (!isValidDate) return "Upcoming";
    const diffTime = eventDateObj.getTime() - new Date().getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return "Happening Today";
    if (diffDays === 1) return "Starts Tomorrow";
    return `In ${diffDays} days`;
  };

  // ভলান্টিয়ার এনরোলমেন্ট প্রোগ্রেস
  const enrolled = event.volunteerCount || 24;
  const target = event.targetVolunteers || 40;
  const percent = Math.min(Math.round((enrolled / target) * 100), 100);

  return (
    <div className="group relative flex flex-col h-full rounded-3xl bg-base-100 border border-base-300 dark:border-slate-800 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      
      {/* ১. টপ ভিজুয়াল টিকিট হেডার */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={
            event.thumbnail ||
            "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"
          }
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
          loading="lazy"
        />

        {/* ডার্ক গ্রেডিয়েন্ট মাস্ক */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/40" />

        {/* টপ-লেফট: ক্যালেন্ডার টিকিট স্টাব (Eventbrite স্টাইল) */}
        <div className="absolute top-3.5 left-3.5 z-10 flex flex-col items-center justify-center w-12 h-14 rounded-2xl bg-base-100/95 dark:bg-slate-900/95 backdrop-blur-md border border-white/20 shadow-xl text-center">
          <span className="text-[10px] font-black tracking-widest text-indigo-600 dark:text-indigo-400 uppercase leading-none pt-1">
            {monthName}
          </span>
          <span className="text-lg font-black text-base-content leading-tight mt-0.5">
            {dayNumber}
          </span>
        </div>

        {/* টপ-রাইট: কাউন্টডাউন ও প্রায়োরিটি পিল */}
        <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-900/80 backdrop-blur-md text-amber-300 border border-amber-400/30 shadow-lg">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>{calculateDaysRemaining()}</span>
          </span>
        </div>

        {/* ছবির বটম ওভারলে: ক্যাটাগরি ও সপ্তাহের দিন */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs z-10">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border backdrop-blur-md bg-white/10 ${meta.badgeColor}`}>
            <CategoryIcon className="w-3.5 h-3.5" />
            <span>{meta.label}</span>
          </span>
          <span className="text-slate-300 font-semibold text-[11px]">
            {weekday}, {eventDateObj.getFullYear() || 2026}
          </span>
        </div>
      </div>

      {/* ২. কার্ডের বডি */}
      <div className="p-6 flex flex-col flex-1 justify-between gap-5 bg-base-100">
        
        <div className="space-y-3">
          
          {/* লোকেশন ব্যাজ */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>

          {/* টাইটেল */}
          <h3 className="font-extrabold text-lg text-base-content group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug tracking-tight">
            {event.title}
          </h3>

          {/* ডেসক্রিপশন */}
          {event.description && (
            <p className="text-xs text-base-content/70 line-clamp-2 leading-relaxed">
              {event.description}
            </p>
          )}

          {/* ভলান্টিয়ার ক্যাপাসিটি প্রোগ্রেস বার (ইউনিক ফিচার) */}
          <div className="pt-2 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-base-content/70">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-500" />
                <span>Volunteers Enrolled</span>
              </span>
              <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">
                {enrolled} / {target} ({percent}%)
              </span>
            </div>
            
            <div className="w-full h-2 rounded-full bg-base-200 dark:bg-slate-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${meta.progressColor}`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

        </div>

        {/* ৩. কার্ড ফুটার ও অ্যাকশন */}
        <div className="pt-4 border-t border-base-200 dark:border-slate-800/80 flex items-center justify-between gap-3">
          
          {/* অর্গানাইজার ব্যাজ */}
          <div className="flex items-center gap-2 truncate">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
              {(event.userName || event.userEmail || "H").charAt(0).toUpperCase()}
            </div>
            <div className="truncate">
              <p className="text-[10px] uppercase font-bold tracking-wider text-base-content/40">Initiator</p>
              <p className="text-xs font-semibold text-base-content truncate">
                {event.userName || (event.userEmail ? event.userEmail.split("@")[0] : "Verified Civic Lead")}
              </p>
            </div>
          </div>

          {/* ভিউ ডিটেইলস বাটন (PDF রিকোয়ারমেন্ট: View Event button) */}
          <Link
            href={`/events/${event._id}`}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white dark:bg-base-200 dark:hover:bg-indigo-600 dark:text-base-content dark:hover:text-white text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all shrink-0"
          >
            <span>View Event</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

        </div>

      </div>

    </div>
  );
};

export default EventCard;
