"use client";

import React, { useState, useEffect, useMemo } from "react";
import EventCard from "@/components/events/EventCard";
import EventSkeleton from "@/components/events/EventSkeleton";
import EventFilter from "@/components/events/EventFilter";
import { CalendarDays, PlusCircle, AlertCircle, Sparkles } from "lucide-react";
import Link from "next/link";

// পাবলিক আসন্ন ইভেন্ট তালিকা পেজ
const UpcomingEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Donation", "Cleanup", "Plantation", "Healthcare", "Education"];

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
        console.error("Error fetching upcoming events:", err);
        setError("Could not load events from server. Please check backend connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // শুধুমাত্র আসন্ন ইভেন্ট ফিল্টার করা (যেগুলোর তারিখ পেরিয়ে যায়নি) এবং সার্চ/ক্যাটাগরি ফিল্টার প্রয়োগ
  const filteredEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return events.filter((event) => {
      // ১. তারিখ ফিল্টার: শুধুমাত্র ভবিষ্যৎ বা আজকের ইভেন্ট
      const eventDate = new Date(event.eventDate);
      const isUpcoming = eventDate >= today;
      if (!isUpcoming) return false;

      // ২. ক্যাটাগরি ফিল্টার
      if (
        selectedCategory !== "All" &&
        event.eventType?.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }

      // ৩. সার্চ ফিল্টার (টাইটেল এবং লোকেশন)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleMatch = event.title?.toLowerCase().includes(query);
        const locationMatch = event.location?.toLowerCase().includes(query);
        const descMatch = event.description?.toLowerCase().includes(query);
        return titleMatch || locationMatch || descMatch;
      }

      return true;
    });
  }, [events, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen py-10 md:py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* হেডার সেকশন */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Community Initiatives</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-base-content tracking-tight">
              Upcoming Social Events
            </h1>
            <p className="text-sm sm:text-base text-base-content/70 mt-1">
              Browse upcoming community service opportunities. Find an event in your area and join as a volunteer.
            </p>
          </div>

          <Link
            href="/create-event"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-md shadow-emerald-600/20 active:scale-95 transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Event</span>
          </Link>
        </div>

        {/* সার্চ ও ক্যাটাগরি ফিল্টার কম্পোনেন্ট */}
        <EventFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />

        {/* ১. লোডিং স্কেলিটন গ্রিড */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <EventSkeleton key={n} />
            ))}
          </div>
        )}

        {/* ২. ত্রুটি বার্তা */}
        {!loading && error && (
          <div className="p-8 rounded-3xl border border-dashed border-rose-300 bg-rose-50/50 dark:bg-rose-950/20 text-center max-w-lg mx-auto">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-base-content mb-1">
              Connection Notice
            </h3>
            <p className="text-sm text-base-content/70 mb-4">{error}</p>
          </div>
        )}

        {/* ৩. ইভেন্ট গ্রিড */}
        {!loading && !error && filteredEvents.length > 0 && (
          <div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-base-content/50">
              Showing {filteredEvents.length} upcoming {filteredEvents.length === 1 ? "event" : "events"}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* ৪. কোনো ম্যাচ না পাওয়ার অবস্থা */}
        {!loading && !error && filteredEvents.length === 0 && (
          <div className="p-12 rounded-3xl border border-dashed border-base-300 text-center max-w-md mx-auto my-8">
            <CalendarDays className="w-12 h-12 text-base-content/30 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-base-content mb-1">
              No Upcoming Events Found
            </h3>
            <p className="text-sm text-base-content/60 mb-5">
              {searchQuery || selectedCategory !== "All"
                ? "Try adjusting your search criteria or category filter."
                : "No future events are currently scheduled. Be the first to create one!"}
            </p>
            {searchQuery || selectedCategory !== "All" ? (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-4 py-2 rounded-xl bg-base-200 text-xs font-semibold text-base-content hover:bg-base-300 transition-colors"
              >
                Clear All Filters
              </button>
            ) : (
              <Link
                href="/create-event"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Host an Event</span>
              </Link>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default UpcomingEventsPage;
