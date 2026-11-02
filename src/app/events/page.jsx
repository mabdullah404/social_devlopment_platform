"use client";

import React, { useState, useEffect, useMemo } from "react";
import EventCard from "@/components/events/EventCard";
import EventSkeleton from "@/components/events/EventSkeleton";
import EventFilter from "@/components/events/EventFilter";
import { PlusCircle, CalendarDays, AlertCircle, Sparkles, FilterX, Flame } from "lucide-react";
import Link from "next/link";

// আসন্ন ইভেন্ট তালিকা পেজ (HumanityGrid - সম্পূর্ণ ইউনিক ও পেশাদার আর্কিটেকচার)
const UpcomingEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // ফিল্টার স্টেট
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All Areas");
  const [sortBy, setSortBy] = useState("date-asc");

  // ব্যাকএন্ড থেকে সব ইভেন্ট লোড করা
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${apiUrl}/events`);

        if (!res.ok) {
          throw new Error("Failed to load events");
        }

        const data = await res.json();
        const allEvents = Array.isArray(data) ? data : data.events || [];
        setEvents(allEvents);
        setError(null);
      } catch (err) {
        console.error("Error loading events:", err);
        setError("Could not connect to the events database. Please verify the backend server.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // শুধুমাত্র আসন্ন ইভেন্ট ফিল্টার (অতীতের তারিখ বাদ) + ক্যাটাগরি + এরিয়া + সার্চ
  const filteredAndSortedEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const filtered = events.filter((event) => {
      // ১. ভবিষ্যৎ এবং আজকের তারিখ যাচাই
      const eventDate = new Date(event.eventDate);
      if (eventDate < today) return false;

      // ২. ক্যাটাগরি ফিল্টার
      if (
        selectedCategory !== "All" &&
        event.eventType?.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }

      // ৩. লোকেশন / এলাকা ফিল্টার
      if (selectedLocation !== "All Areas") {
        const areaKeyword = selectedLocation.split(",")[0].toLowerCase().trim();
        const eventLoc = (event.location || "").toLowerCase();
        if (!eventLoc.includes(areaKeyword)) return false;
      }

      // ৪. সার্চ ফিল্টার (টাইটেল, লোকেশন, ডেসক্রিপশন)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleMatch = event.title?.toLowerCase().includes(query);
        const locationMatch = event.location?.toLowerCase().includes(query);
        const descMatch = event.description?.toLowerCase().includes(query);
        return titleMatch || locationMatch || descMatch;
      }

      return true;
    });

    // সর্টিং
    return filtered.sort((a, b) => {
      if (sortBy === "date-asc") {
        return new Date(a.eventDate) - new Date(b.eventDate);
      }
      if (sortBy === "date-desc") {
        return new Date(b.eventDate) - new Date(a.eventDate);
      }
      if (sortBy === "title-asc") {
        return (a.title || "").localeCompare(b.title || "");
      }
      return 0;
    });
  }, [events, selectedCategory, selectedLocation, searchQuery, sortBy]);

  return (
    <div className="min-h-screen py-10 md:py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* টপ এমারজেন্সি লাইভ টিকার (ইউনিক ফিচার) */}
        <div className="mb-8 p-3 rounded-2xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-indigo-500/10 border border-rose-500/20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-extrabold text-rose-600 dark:text-rose-400 truncate">
            <Flame className="w-4 h-4 shrink-0 animate-bounce" />
            <span className="uppercase tracking-wider">Active Relief Need:</span>
            <span className="text-base-content/80 font-medium truncate">
              Winter clothes & blanket collection underway in Mirpur 10 & Mohammadpur.
            </span>
          </div>
          <Link
            href="/create-event"
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0 hidden sm:block"
          >
            Launch Emergency Drive →
          </Link>
        </div>

        {/* হেডার ব্যানার */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 mb-10 border border-base-300 dark:border-slate-800 bg-gradient-to-br from-indigo-950/10 via-base-100 to-rose-500/5 shadow-sm">
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-700 dark:text-indigo-300 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Verified Humanitarian Roster</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-base-content tracking-tight">
                Grassroots Action Roster
              </h1>
              <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
                Direct community drives organized by conscious citizens. Connect with volunteers, reserve your slot, and make an immediate impact.
              </p>
            </div>

            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/25 active:scale-95 transition-all shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Initiate a Campaign</span>
            </Link>
          </div>
        </div>

        {/* কমান্ড-হাব স্টাইল ফিল্টার বার */}
        <EventFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          sortBy={sortBy}
          setSortBy={setSortBy}
          eventsCount={filteredAndSortedEvents.length}
        />

        {/* কাউন্টার ও অ্যাক্টিভ ফিল্টার স্টেট */}
        {!loading && !error && (
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-base-300 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-base-content/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>
                Showing {filteredAndSortedEvents.length} verified {filteredAndSortedEvents.length === 1 ? "initiative" : "initiatives"}
              </span>
            </div>

            {(selectedCategory !== "All" || selectedLocation !== "All Areas" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedLocation("All Areas");
                  setSearchQuery("");
                }}
                className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:underline capitalize font-semibold"
              >
                <FilterX className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        )}

        {/* ১. লোডিং স্কেলিটন গ্রিড */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <EventSkeleton key={n} />
            ))}
          </div>
        )}

        {/* ২. এরর নোটিস */}
        {!loading && error && (
          <div className="p-8 rounded-3xl border border-dashed border-rose-300 bg-rose-50/50 dark:bg-rose-950/20 text-center max-w-lg mx-auto">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-base-content mb-1">Server Connection Notice</h3>
            <p className="text-sm text-base-content/70 mb-4">{error}</p>
          </div>
        )}

        {/* ৩. ইভেন্ট টিকিট কার্ড গ্রিড */}
        {!loading && !error && filteredAndSortedEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}

        {/* ৪. কোনো রেজাল্ট না পাওয়ার অবস্থা */}
        {!loading && !error && filteredAndSortedEvents.length === 0 && (
          <div className="p-14 rounded-3xl border border-dashed border-base-300 dark:border-slate-800 text-center max-w-lg mx-auto my-12 bg-base-100">
            <CalendarDays className="w-14 h-14 text-base-content/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-base-content mb-2">No Matching Drives Found</h3>
            <p className="text-sm text-base-content/60 mb-6">
              {searchQuery || selectedCategory !== "All" || selectedLocation !== "All Areas"
                ? "Try adjusting your area, cause, or search keyword."
                : "No upcoming drives are currently posted. Take the initiative and create one!"}
            </p>
            {searchQuery || selectedCategory !== "All" || selectedLocation !== "All Areas" ? (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSelectedLocation("All Areas");
                }}
                className="px-5 py-2.5 rounded-xl bg-base-200 text-xs font-bold text-base-content hover:bg-base-300 transition-colors"
              >
                Clear Search & Area
              </button>
            ) : (
              <Link
                href="/create-event"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Host First Initiative</span>
              </Link>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default UpcomingEventsPage;
