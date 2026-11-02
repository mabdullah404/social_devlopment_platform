"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { 
  Calendar, 
  MapPin, 
  User, 
  Tag, 
  ArrowLeft, 
  CheckCircle2, 
  Share2, 
  Clock, 
  ShieldCheck, 
  Loader2 
} from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

// ইভেন্ট বিস্তারিত পেজ (পাবলিক পেজ, তবে জয়েন করতে লগইন থাকা আবশ্যক)
const EventDetailsPage = ({ params }) => {
  const router = useRouter();
  const resolvedParams = use(params);
  const eventId = resolvedParams.id;

  const { data: session } = useSession();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [error, setError] = useState(null);

  // ১. ইভেন্ট ডাটা ব্যাকএন্ড থেকে লোড করা
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${apiUrl}/events/${eventId}`);

        if (!res.ok) {
          throw new Error("Event not found");
        }

        const data = await res.json();
        setEvent(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching event details:", err);
        setError("Could not find or load the requested event.");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  // ২. ব্যবহারকারী ইতিমধ্যে এই ইভেন্টে জয়েন করেছে কিনা চেক করা
  useEffect(() => {
    const checkUserJoined = async () => {
      if (!session?.user?.email || !eventId) return;

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const res = await fetch(
          `${apiUrl}/events/check-join/${eventId}/${encodeURIComponent(session.user.email)}`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.joined) {
            setAlreadyJoined(true);
          }
        }
      } catch {
        // নীরব হ্যান্ডলিং
      }
    };

    checkUserJoined();
  }, [session, eventId]);

  // ৩. Join Event বাটন ক্লিক হ্যান্ডলার
  const handleJoinEvent = async () => {
    // লগইন চেক (লগইন না থাকলে লগইন পেজে পাঠানোর প্রম্পট)
    if (!session?.user) {
      Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "You must be logged in to join this community event as a volunteer.",
        showCancelButton: true,
        confirmButtonText: "Log In",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#059669",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
      return;
    }

    // ইতিমধ্যে জয়েন থাকলে ফিরতি অ্যালার্ট
    if (alreadyJoined) {
      toast("You are already registered for this event!", { icon: "ℹ️" });
      return;
    }

    setJoining(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const payload = {
        eventId: event._id,
        eventTitle: event.title,
        eventType: event.eventType,
        eventDate: event.eventDate,
        location: event.location,
        thumbnail: event.thumbnail,
        userEmail: session.user.email,
        userName: session.user.name,
        joinedAt: new Date().toISOString(),
      };

      const res = await fetch(`${apiUrl}/events/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to join event");
      }

      setAlreadyJoined(true);

      // সফলতার SweetAlert2 পপআপ
      Swal.fire({
        icon: "success",
        title: "Joined Successfully!",
        text: `You have successfully registered for "${event.title}". See you there!`,
        confirmButtonColor: "#059669",
        confirmButtonText: "View Joined Events",
        showCancelButton: true,
        cancelButtonText: "Stay Here",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/joined-events");
        }
      });
    } catch (err) {
      toast.error(err.message || "Could not complete registration.");
    } finally {
      setJoining(false);
    }
  };

  // ৪. ইভেন্ট শেয়ার হ্যান্ডলার
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Event link copied to clipboard!");
    }
  };

  // তারিখ ফরম্যাটিং
  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  // লোডিং ভিউ
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
        <p className="text-sm text-base-content/60">Loading event details...</p>
      </div>
    );
  }

  // এরর ভিউ
  if (error || !event) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 p-4 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center">
          <Calendar className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-base-content">Event Not Found</h2>
        <p className="text-sm text-base-content/60 max-w-md">
          {error || "The event you are looking for may have ended or been removed."}
        </p>
        <Link
          href="/events"
          className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Upcoming Events</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 md:py-16 bg-base-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ব্যাক বাটন */}
        <div className="mb-6">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-medium text-base-content/70 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Upcoming Events</span>
          </Link>
        </div>

        {/* প্রধান কন্টেন্ট কার্ড */}
        <div className="rounded-3xl border border-base-300 bg-base-100 overflow-hidden shadow-xl">
          
          {/* থাম্বনেইল ব্যানার */}
          <div className="relative w-full aspect-[21/9] min-h-[260px] max-h-[420px] bg-base-300 overflow-hidden">
            <img
              src={
                event.thumbnail ||
                "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80"
              }
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* থাম্বনেইলের ওপর ক্যাটাগরি ও শেয়ার */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow-md flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                {event.eventType || "Social Service"}
              </span>

              <button
                onClick={handleShare}
                type="button"
                className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors"
                title="Share event link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* থাম্বনেইলের ওপর টাইটেল ও সাবটেক্সট */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-md">
                {event.title}
              </h1>
            </div>
          </div>

          {/* বিস্তারিত বিবরণী ও অ্যাকশন বার */}
          <div className="p-6 sm:p-8 md:p-10 space-y-8">
            
            {/* মূল তথ্যের মেটা গ্রিড */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-base-200/60 border border-base-300">
              
              {/* তারিখ */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-semibold text-base-content/50">
                    Event Date
                  </p>
                  <p className="text-sm font-bold text-base-content mt-0.5">
                    {formatDate(event.eventDate)}
                  </p>
                </div>
              </div>

              {/* লোকেশন */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-semibold text-base-content/50">
                    Location
                  </p>
                  <p className="text-sm font-bold text-base-content mt-0.5">
                    {event.location}
                  </p>
                </div>
              </div>

              {/* অর্গানাইজার */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <p className="text-xs uppercase font-semibold text-base-content/50">
                    Organizer
                  </p>
                  <p className="text-sm font-bold text-base-content mt-0.5 truncate">
                    {event.userEmail || "Community Organizer"}
                  </p>
                </div>
              </div>

            </div>

            {/* ইভেন্টের পূর্ণ বর্ণনা */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-base-content tracking-tight">
                About this Initiative
              </h2>
              <div className="prose dark:prose-invert max-w-none text-base-content/80 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {event.description}
              </div>
            </div>

            {/* স্বেচ্ছাসেবকদের জন্য নির্দেশনা */}
            <div className="p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20 flex items-start gap-3 text-xs sm:text-sm text-emerald-800 dark:text-emerald-300">
              <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
              <div>
                <p className="font-bold">Volunteer Guidelines</p>
                <p className="mt-0.5 text-emerald-700 dark:text-emerald-400">
                  Please arrive 15 minutes prior to the scheduled start time at {event.location}. Wear comfortable clothing suitable for humanitarian fieldwork.
                </p>
              </div>
            </div>

            {/* বটম জয়েন অ্যাকশন বার */}
            <div className="pt-6 border-t border-base-300 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-xs text-base-content/60">
                  Ready to make a tangible difference?
                </p>
                <p className="text-sm font-semibold text-base-content">
                  {alreadyJoined
                    ? "You are registered as a confirmed participant."
                    : "Join your fellow neighbors today."}
                </p>
              </div>

              {alreadyJoined ? (
                <button
                  disabled
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-sm flex items-center justify-center gap-2 cursor-default border border-emerald-300 dark:border-emerald-800"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Already Joined</span>
                </button>
              ) : (
                <button
                  onClick={handleJoinEvent}
                  disabled={joining}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 active:scale-95 transition-all disabled:opacity-50"
                >
                  {joining ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Registering...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Join Event</span>
                    </>
                  )}
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default EventDetailsPage;
