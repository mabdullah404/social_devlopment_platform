import React from "react";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight, Tag } from "lucide-react";

// একক ইভেন্ট কার্ড (সমান উচ্চতা ও প্রস্থ নিশ্চিত করতে flex-col h-full ব্যবহার করা হয়েছে)
const EventCard = ({ event }) => {
  // তারিখ সুন্দর ফরম্যাটে রূপান্তর
  const formatDate = (dateString) => {
    try {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(dateString).toLocaleDateString("en-US", options);
    } catch {
      return dateString;
    }
  };

  // ক্যাটাগরি অনুযায়ী ব্যাজের রঙ
  const getBadgeClass = (type) => {
    switch (type?.toLowerCase()) {
      case "donation":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      case "cleanup":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case "plantation":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
      case "healthcare":
        return "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800";
      default:
        return "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800";
    }
  };

  return (
    <div className="group flex flex-col h-full rounded-3xl border border-base-300 bg-base-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      
      {/* ১. থাম্বনেইল ছবি (সমান অ্যাসপেক্ট রেশিও) */}
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
        {/* ইভেন্ট টাইপ ব্যাজ */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border shadow-sm backdrop-blur-md ${getBadgeClass(
              event.eventType
            )}`}
          >
            <Tag className="w-3 h-3" />
            {event.eventType || "Social Service"}
          </span>
        </div>
      </div>

      {/* ২. কার্ডের বডি */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2.5">
          {/* তারিখ */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(event.eventDate)}</span>
          </div>

          {/* টাইটেল (২ লাইনে ট্রাঙ্কেট করা যাতে কার্ডের সাইজ সমান থাকে) */}
          <h3 className="font-bold text-lg text-base-content group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
            {event.title}
          </h3>

          {/* লোকেশন */}
          <div className="flex items-center gap-1.5 text-xs text-base-content/60 truncate">
            <MapPin className="w-3.5 h-3.5 text-base-content/40 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>

          {/* সংক্ষিপ্ত বর্ণনা */}
          {event.description && (
            <p className="text-xs text-base-content/70 line-clamp-2 leading-relaxed">
              {event.description}
            </p>
          )}
        </div>

        {/* ৩. View Event বাটন */}
        <div className="pt-2 border-t border-base-200">
          <Link
            href={`/events/${event._id}`}
            className="w-full py-2.5 px-4 rounded-xl bg-base-200/80 hover:bg-emerald-600 text-base-content hover:text-white font-medium text-sm flex items-center justify-center gap-2 transition-all group/btn"
          >
            <span>View Event</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
