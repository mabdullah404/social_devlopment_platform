"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { fetchEventDetails, joinCommunityEvent, fetchUserJoinedEvents } from "@/lib/api";
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
  Loader2, 
  Users 
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
    const loadDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchEventDetails(eventId);
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
      loadDetails();
    }
  }, [eventId]);

  // ২. ব্যবহারকারী ইতিমধ্যে এই ইভেন্টে জয়েন করেছে কিনা চেক করা
  useEffect(() => {
    const checkJoinedStatus = async () => {
      if (!session?.user?.email || !eventId) return;

      try {
        const list = await fetchUserJoinedEvents(session.user.email);
        if (Array.isArray(list)) {
          const match = list.some((item) => item.eventId === eventId);
          if (match) setAlreadyJoined(true);
        }
      } catch {
        // নীরব হ্যান্ডলিং
      }
    };

    checkJoinedStatus();
  }, [session, eventId]);

  // ৩. Join Event বাটন ক্লিক হ্যান্ডলার
  const handleJoinEvent = async () => {
    // লগইন চেক
    if (!session?.user) {
      Swal.fire({
        icon: "info",
        title: "Volunteer Login Required",
        text: "Please sign in to register as a verified volunteer for this community initiative.",
        showCancelButton: true,
        confirmButtonText: "Log In",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#4f46e5",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
      return;
    }

    if (alreadyJoined) {
      toast("You are already enrolled as a volunteer for this initiative!", { icon: "ℹ️" });
      return;
    }

    setJoining(true);

    try {
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

      await joinCommunityEvent(payload, session.user.email);
      setAlreadyJoined(true);

      // সফলতার SweetAlert2 পপআপ
      Swal.fire({
        icon: "success",
        title: "Registration Confirmed!",
        text: `You have successfully enrolled for "${event.title}". See you on the field!`,
        confirmButtonColor: "#4f46e5",
        confirmButtonText: "View My Commitments",
        showCancelButton: true,
        cancelButtonText: "Stay on Page",
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

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Initiative link copied to clipboard!");
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
        <p className="text-sm text-base-content/60 font-medium">Loading initiative details...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 p-4 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center">
          <Calendar className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-base-content">Initiative Not Found</h2>
        <p className="text-sm text-base-content/60 max-w-md">
          {error || "The initiative you are looking for may have concluded or been removed."}
        </p>
        <Link
          href="/events"
          className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Drives</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 md:py-16 bg-base-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ব্যাক লিংক */}
        <div className="mb-6">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-base-content/70 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Initiatives</span>
          </Link>
        </div>

        {/* প্রধান কন্টেন্ট কার্ড */}
        <div className="rounded-3xl border border-base-300 dark:border-slate-800 bg-base-100 overflow-hidden shadow-2xl">
          
          {/* ব্যানার ইমেজ */}
          <div className="relative w-full aspect-[21/9] min-h-[280px] max-h-[440px] bg-slate-900 overflow-hidden">
            <img
              src={
                event.thumbnail ||
                "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80"
              }
              alt={event.title}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/30" />

            {/* টপ ক্যাটাগরি ও শেয়ার */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
              <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-600 text-white shadow-xl flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                <span>{event.eventType || "Social Service"}</span>
              </span>

              <button
                onClick={handleShare}
                type="button"
                className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors shadow-lg"
                title="Share initiative"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* টাইটেল */}
            <div className="absolute bottom-6 left-6 right-6 text-white z-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight drop-shadow-lg">
                {event.title}
              </h1>
            </div>
          </div>

          {/* মেটা ইনফো গ্রিড */}
          <div className="p-6 sm:p-10 space-y-8">
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-3xl bg-base-200/50 dark:bg-slate-900/60 border border-base-300 dark:border-slate-800">
              
              {/* ডেট */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-base-content/50">
                    Execution Date
                  </p>
                  <p className="text-sm font-bold text-base-content mt-0.5">
                    {formatDate(event.eventDate)}
                  </p>
                </div>
              </div>

              {/* লোকেশন */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-base-content/50">
                    Meeting Location
                  </p>
                  <p className="text-sm font-bold text-base-content mt-0.5">
                    {event.location}
                  </p>
                </div>
              </div>

              {/* অর্গানাইজার */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-base-content/50">
                    Initiator / Host
                  </p>
                  <p className="text-sm font-bold text-base-content mt-0.5 truncate">
                    {event.userName || event.userEmail || "Civic Collective"}
                  </p>
                </div>
              </div>

            </div>

            {/* পূর্ণ বিবরণী */}
            <div className="space-y-4">
              <h2 className="text-xl font-black text-base-content tracking-tight">
                About this Humanitarian Drive
              </h2>
              <div className="prose dark:prose-invert max-w-none text-base-content/80 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
                {event.description}
              </div>
            </div>

            {/* ফিল্ড গাইডলাইন */}
            <div className="p-5 rounded-2xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-950/20 flex items-start gap-3 text-xs sm:text-sm text-indigo-900 dark:text-indigo-300">
              <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-indigo-600" />
              <div>
                <p className="font-bold">Volunteer Deployment Instructions</p>
                <p className="mt-0.5 text-indigo-800/80 dark:text-indigo-400">
                  Please assemble at {event.location} 15 minutes before start. Wear sensible outdoor clothes. Hand sanitizers and disposable gloves will be provided by the host team.
                </p>
              </div>
            </div>

            {/* অ্যাকশন বার */}
            <div className="pt-6 border-t border-base-300 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-xs text-base-content/60 font-medium">
                  Direct Field Volunteering
                </p>
                <p className="text-sm font-bold text-base-content">
                  {alreadyJoined
                    ? "You are registered as a confirmed participant."
                    : "Ready to join hands with fellow citizens?"}
                </p>
              </div>

              {alreadyJoined ? (
                <button
                  disabled
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-default border border-indigo-300 dark:border-indigo-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  <span>Enrolled as Volunteer</span>
                </button>
              ) : (
                <button
                  onClick={handleJoinEvent}
                  disabled={joining}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 active:scale-95 transition-all disabled:opacity-50"
                >
                  {joining ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Registering...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
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
