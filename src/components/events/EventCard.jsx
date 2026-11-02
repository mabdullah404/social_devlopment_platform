import React from "react";
import Link from "next/link";
import { 
  MapPin, 
  ArrowUpRight, 
  Users, 
  Calendar, 
  Clock, 
  Heart, 
  Sparkles, 
  Trees, 
  Stethoscope, 
  GraduationCap, 
  ShieldCheck 
} from "lucide-react";

// পেশাদার, আধুনিক এবং ক্লিন ইভেন্ট কার্ড
const EventCard = ({ event }) => {
  // ক্যাটাগরি অনুসারে সঠিক আইকন ও ব্যাজ স্টাইল
  const getCategoryMeta = (type) => {
    const key = (type || "").toLowerCase();
    switch (key) {
      case "donation":
        return {
          icon: Heart,
          label: type || "Donation",
          badgeClass: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900",
        };
      case "cleanup":
        return {
          icon: Sparkles,
          label: type || "Cleanup",
          badgeClass: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-900",
        };
      case "plantation":
        return {
          icon: Trees,
          label: type || "Plantation",
          badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900",
        };
      case "healthcare":
        return {
          icon: Stethoscope,
          label: type || "Healthcare",
          badgeClass: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-900",
        };
      case "education":
        return {
          icon: GraduationCap,
          label: type || "Education",
          badgeClass: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900",
        };
      default:
        return {
          icon: ShieldCheck,
          label: type || "Community",
          badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-900",
        };
    }
  };

  const meta = getCategoryMeta(event.eventType);
  const CategoryIcon = meta.icon;

  // তারিখ ফরম্যাটিং
  const eventDateObj = new Date(event.eventDate);
  const isValidDate = !isNaN(eventDateObj.getTime());
  
  const formattedDate = isValidDate
    ? eventDateObj.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Date TBA";

  const calculateDaysRemaining = () => {
    if (!isValidDate) return "Upcoming";
    const diffTime = eventDateObj.getTime() - new Date().getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    return `In ${diffDays} days`;
  };

  // ভলান্টিয়ার এনরোলমেন্ট মেট্রিক
  const enrolled = event.volunteerCount || 18;
  const target = event.targetVolunteers || 35;
  const percent = Math.min(Math.round((enrolled / target) * 100), 100);

  const organizerName =
    event.userName ||
    (event.userEmail ? event.userEmail.split("@")[0] : "Community Lead");
  const initial = organizerName.charAt(0).toUpperCase();

  return (
    <div className="group relative flex flex-col h-full rounded-2xl bg-base-100 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      
      {/* ১. ক্লিন ইমেজ হেডার */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={
            event.thumbnail ||
            "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"
          }
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* টপ-লেফট: ক্যাটাগরি ব্যাজ */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-sm backdrop-blur-md border ${meta.badgeClass}`}>
            <CategoryIcon className="w-3.5 h-3.5" />
            <span>{meta.label}</span>
          </span>
        </div>

        {/* টপ-রাইট: কাউন্টডাউন পিল */}
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-950/75 text-slate-200 backdrop-blur-md border border-white/10 shadow-sm">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>{calculateDaysRemaining()}</span>
          </span>
        </div>
      </div>

      {/* ২. কার্ড বডি */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4 bg-base-100">
        
        <div className="space-y-2.5">
          
          {/* তারিখ */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>{formattedDate}</span>
          </div>

          {/* ইভেন্ট টাইটেল */}
          <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug tracking-tight">
            {event.title}
          </h3>

          {/* লোকেশন */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span className="truncate">{event.location}</span>
          </div>

          {/* ডেসক্রিপশন */}
          {event.description && (
            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed pt-0.5">
              {event.description}
            </p>
          )}

          {/* ভলান্টিয়ার এনরোলমেন্ট বার (ক্লিন ও প্রফেশনাল সলিড ডিজাইন) */}
          <div className="pt-2 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <Users className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span>Volunteers Enrolled</span>
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {enrolled} <span className="text-slate-400 dark:text-slate-500 font-normal">/ {target}</span>
              </span>
            </div>
            
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

        </div>

        {/* ৩. কার্ড ফুটার ও বাটন */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
          
          {/* অর্গানাইজার */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0">
              {initial}
            </div>
            <div className="truncate">
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Organized by</p>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                {organizerName}
              </p>
            </div>
          </div>

          {/* ভিউ ইভেন্ট বাটন (PDF রিকোয়ারমেন্ট: View Event) */}
          <Link
            href={`/events/${event._id}`}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white dark:bg-slate-800 dark:hover:bg-indigo-600 text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all shrink-0"
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
