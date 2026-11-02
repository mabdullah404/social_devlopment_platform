"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import ProtectedRoute from "@/components/ui/ProtectedRoute";
import { 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  CalendarDays, 
  Loader2, 
  Sparkles, 
  Tag 
} from "lucide-react";
import toast from "react-hot-toast";

// ব্যবহারকারীর জয়েন করা ইভেন্টের তালিকা পেজ (তারিখ অনুযায়ী সাজানো)
const JoinedEventsPage = () => {
  const { data: session } = useSession();

  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // জয়েন করা ইভেন্টসমূহ লোড করা
  useEffect(() => {
    const fetchJoinedEvents = async () => {
      if (!session?.user?.email) return;

      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const res = await fetch(
          `${apiUrl}/events/joined/${encodeURIComponent(session.user.email)}`
        );

        if (!res.ok) {
          throw new Error("Failed to load joined events");
        }

        const data = await res.json();
        const list = Array.isArray(data) ? data : data.events || [];
        
        // তারিখ অনুযায়ী ক্রমানুসারে সাজানো (Sorted by event date - PDF রিকোয়ারমেন্ট)
        const sorted = list.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
        setJoinedEvents(sorted);
      } catch (err) {
        console.error("Error fetching joined events:", err);
        toast.error("Could not fetch joined events.");
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [session]);

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen py-10 md:py-16 bg-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* হেডার */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Volunteer Dashboard</span>
              </div>
              <h1 className="text-3xl font-extrabold text-base-content tracking-tight">
                My Joined Events
              </h1>
              <p className="text-sm text-base-content/70 mt-1">
                All community drives you have signed up for as an active volunteer, sorted chronologically.
              </p>
            </div>

            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-base-200 hover:bg-base-300 text-base-content font-medium text-sm transition-colors shrink-0"
            >
              <CalendarDays className="w-4 h-4 text-emerald-600" />
              <span>Explore More Events</span>
            </Link>
          </div>

          {/* লোডিং অবস্থা */}
          {loading && (
            <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
              <p className="text-sm text-base-content/60">Loading your volunteer commitments...</p>
            </div>
          )}

          {/* ইভেন্ট কার্ড গ্রিড */}
          {!loading && joinedEvents.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {joinedEvents.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col h-full rounded-3xl border border-base-300 bg-base-100 overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  {/* থাম্বনেইল */}
                  <div className="relative w-full aspect-[16/10] bg-base-200 overflow-hidden">
                    <img
                      src={
                        item.thumbnail ||
                        "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"
                      }
                      alt={item.eventTitle || "Event"}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow-sm flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {item.eventType || "Social Service"}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-base-100/90 dark:bg-base-900/90 text-emerald-600 border border-emerald-500/30 backdrop-blur-md shadow-sm flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Confirmed
                      </span>
                    </div>
                  </div>

                  {/* বডি */}
                  <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                    <div className="space-y-2.5">
                      {/* ডেট */}
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(item.eventDate)}</span>
                      </div>

                      {/* টাইটেল */}
                      <h3 className="font-bold text-lg text-base-content line-clamp-2 leading-snug">
                        {item.eventTitle}
                      </h3>

                      {/* লোকেশন */}
                      <div className="flex items-center gap-1.5 text-xs text-base-content/60 truncate">
                        <MapPin className="w-3.5 h-3.5 text-base-content/40 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                    </div>

                    {/* অ্যাকশন বাটন */}
                    <div className="pt-3 border-t border-base-200">
                      <Link
                        href={`/events/${item.eventId}`}
                        className="w-full py-2.5 px-4 rounded-xl bg-base-200/80 hover:bg-emerald-600 text-base-content hover:text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-all"
                      >
                        <span>View Event Details</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* কোনো ইভেন্ট না থাকলে এম্পটি স্টেট */}
          {!loading && joinedEvents.length === 0 && (
            <div className="p-12 rounded-3xl border border-dashed border-base-300 text-center max-w-md mx-auto my-8">
              <CheckCircle2 className="w-12 h-12 text-base-content/30 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-base-content mb-1">
                No Joined Events Yet
              </h3>
              <p className="text-sm text-base-content/60 mb-5">
                You haven&apos;t joined any social initiatives yet. Discover upcoming drives and volunteer today!
              </p>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
              >
                <span>Browse Upcoming Events</span>
              </Link>
            </div>
          )}

        </div>
      </div>
    </ProtectedRoute>
  );
};

export default JoinedEventsPage;
