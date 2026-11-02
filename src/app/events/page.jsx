"use client";

import React, { useState, useEffect, useMemo } from "react";
import EventCard from "@/components/events/EventCard";
import EventSkeleton from "@/components/events/EventSkeleton";
import EventFilter from "@/components/events/EventFilter";
import { PlusCircle, CalendarDays, AlertCircle, Sparkles, FilterX } from "lucide-react";
import Link from "next/link";

// আসন্ন ইভেন্ট তালিকা পেজ (CivicPulse - সম্পূর্ণ ইউনিক ও প্রফেশনাল ডিজাইন)
const UpcomingEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
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
        setError("Could not connect to the events database. Please ensure the backend server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // শুধুমাত্র আসন্ন ইভেন্ট ফিল্টার (PDF: অতীতের কোনো ইভেন্ট দেখানো যাবে না) + সার্চ ও ক্যাটাগরি
  const filteredAndSortedEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const filtered = events.filter((event) => {
      // ১. শুধুমাত্র ভবিষ্যৎ ও আজকের ইভেন্ট
      const eventDate = new Date(event.eventDate);
      if (eventDate < today) return false;

      // ২. ক্যাটাগরি ফিল্টার
      if (
        selectedCategory !== "All" &&
        event.eventType?.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }

      // ৩. সার্চ ফিল্টার (টাইটেল, লোকেশন, ডেসক্রিপশন)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleMatch = event.title?.toLowerCase().includes(query);
        const locationMatch = event.location?.toLowerCase().includes(query);
        const descMatch = event.description?.toLowerCase().includes(query);
        return titleMatch || locationMatch || descMatch;
      }

      return true;
    });

    // সর্টিং লজিক
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
  }, [events, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen py-10 md:py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ইউনিক হেডার ব্যানার */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 mb-10 border border-base-300 bg-gradient-to-br from-base-200/90 via-base-100 to-emerald-500/5 shadow-sm">
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Grassroots Campaigns</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-base-content tracking-tight">
                Upcoming Community Drives
              </h1>
              <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
                Explore urgent volunteer drives organized across local neighborhoods. Filter by cause, search by area, and sign up with one click.
              </p>
            </div>

            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 active:scale-95 transition-all shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Host an Initiative</span>
            </Link>
          </div>

        </div>

        {/* ফিল্টার ও সার্চ কম্পোনেন্ট */}
        <EventFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* রেজাল্ট হেডার ও কাউন্টার */}
        {!loading && !error && (
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-base-300 text-xs font-bold uppercase tracking-wider text-base-content/60">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>
                Showing {filteredAndSortedEvents.length} Active {filteredAndSortedEvents.length === 1 ? "Drive" : "Drives"}
              </span>
            </div>

            {(selectedCategory !== "All" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="flex items-center gap-1 text-emerald-600 hover:underline capitalize"
              >
                <FilterX className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
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
            <h3 className="text-lg font-bold text-base-content mb-1">Database Connection Notice</h3>
            <p className="text-sm text-base-content/70 mb-4">{error}</p>
          </div>
        )}

        {/* ৩. ইভেন্ট কার্ড গ্রিড */}
        {!loading && !error && filteredAndSortedEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}

        {/* ৪. খালি অবস্থা */}
        {!loading && !error && filteredAndSortedEvents.length === 0 && (
          <div className="p-14 rounded-3xl border border-dashed border-base-300 text-center max-w-lg mx-auto my-12 bg-base-100">
            <CalendarDays className="w-14 h-14 text-base-content/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-base-content mb-2">No Matching Initiatives Found</h3>
            <p className="text-sm text-base-content/60 mb-6">
              {searchQuery || selectedCategory !== "All"
                ? "Try broadening your search query or switching categories."
                : "No upcoming drives are currently posted. Take the lead and launch one!"}
            </p>
            {searchQuery || selectedCategory !== "All" ? (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-5 py-2.5 rounded-xl bg-base-200 text-xs font-bold text-base-content hover:bg-base-300 transition-colors"
              >
                Clear All Search Filters
              </button>
            ) : (
              <Link
                href="/create-event"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create First Drive</span>
              </Link>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default UpcomingEventsPage;
