"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import EventCard from "@/components/events/EventCard";
import EventSkeleton from "@/components/events/EventSkeleton";
import { fetchRecentEvents } from "@/lib/api";
import { ArrowRight, Sparkles, AlertCircle, Layers } from "lucide-react";

// হোম পেজের সাম্প্রতিক ৬টি আসন্ন ইভেন্ট সেকশন (ডায়নামিক - ডাটাবেজ থেকে .limit(6) অনুযায়ী)
const RecentEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ব্যাকএন্ড থেকে সাম্প্রতিক ৬টি ইভেন্ট লোড করা
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const data = await fetchRecentEvents();
        setEvents(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error("Error loading events:", err);
        setError("Unable to connect to the events database. Please ensure the server is running.");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <section className="py-20 md:py-28 bg-base-100 border-b border-base-300 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* সেকশন হেডার */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-700 dark:text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Upcoming Initiatives</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-base-content tracking-tight">
              Upcoming Events
            </h2>
            <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
              Join hands with fellow volunteers. Explore upcoming social development drives and community initiatives.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-base-200 hover:bg-indigo-600 hover:text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm shrink-0"
          >
            <span>Explore All Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ১. লোডিং অবস্থা: ৬টি স্কেলিটন কার্ড */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <EventSkeleton key={n} />
            ))}
          </div>
        )}

        {/* ২. সার্ভার সংযোগ সমস্যা নোটিশ */}
        {!loading && error && events.length === 0 && (
          <div className="p-8 rounded-3xl border border-dashed border-amber-300 bg-amber-50/50 dark:bg-amber-950/20 text-center max-w-lg mx-auto">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-base-content mb-1">
              Events Database Connecting...
            </h3>
            <p className="text-sm text-base-content/70 mb-4">{error}</p>
            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase transition-colors"
            >
              <span>Create an Event</span>
            </Link>
          </div>
        )}

        {/* ৩. ইভেন্ট ডাটা থাকলে ৩ কলাম টিকিট গ্রিডে প্রদর্শন */}
        {!loading && events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.slice(0, 6).map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}

        {/* ৪. কোনো ইভেন্ট না থাকলে খালি অবস্থা */}
        {!loading && !error && events.length === 0 && (
          <div className="p-14 rounded-3xl border border-dashed border-base-300 dark:border-slate-800 text-center max-w-md mx-auto">
            <Layers className="w-12 h-12 text-base-content/30 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-base-content mb-1">
              No Drives Scheduled Yet
            </h3>
            <p className="text-sm text-base-content/60 mb-5">
              Be the first community organizer to schedule a winter relief or cleanup drive!
            </p>
            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>Publish First Drive</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};

export default RecentEvents;
