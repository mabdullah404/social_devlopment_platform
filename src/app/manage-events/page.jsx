"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import ProtectedRoute from "@/components/ui/ProtectedRoute";
import UpdateEventModal from "@/components/events/UpdateEventModal";
import { 
  FolderKanban, 
  Calendar, 
  MapPin, 
  PlusCircle, 
  Pencil, 
  Trash2, 
  ExternalLink, 
  Loader2, 
  Sparkles, 
  AlertCircle 
} from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

// নিজের তৈরি করা ইভেন্ট ম্যানেজ করার পেজ (প্রাইভেট রুট)
const ManageEventsPage = () => {
  const { data: session } = useSession();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ব্যবহারকারীর তৈরি করা ইভেন্টসমূহ লোড করা
  const fetchMyEvents = async () => {
    if (!session?.user?.email) return;

    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(
        `${apiUrl}/events/created/${encodeURIComponent(session.user.email)}`
      );

      if (!res.ok) {
        throw new Error("Failed to load your events");
      }

      const data = await res.json();
      setEvents(Array.isArray(data) ? data : data.events || []);
    } catch (err) {
      console.error("Error loading created events:", err);
      toast.error("Could not fetch your events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, [session]);

  // ইভেন্ট ডিলিট হ্যান্ডলার (SweetAlert2 কনফার্মেশন সহ)
  const handleDeleteEvent = (event) => {
    Swal.fire({
      title: "Delete Event?",
      text: `Are you sure you want to permanently delete "${event.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete It",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
          const res = await fetch(
            `${apiUrl}/events/${event._id}?email=${encodeURIComponent(session.user.email)}`,
            {
              method: "DELETE",
            }
          );

          if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.message || "Failed to delete event");
          }

          setEvents((prev) => prev.filter((item) => item._id !== event._id));
          toast.success("Event deleted successfully!");
        } catch (err) {
          toast.error(err.message || "Could not delete event.");
        }
      }
    });
  };

  // এডিট বাটনে ক্লিক
  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // আপডেট সফল হলে লোকাল স্টেট রিফ্রেশ
  const handleUpdateSuccess = (updatedEvent) => {
    setEvents((prev) =>
      prev.map((item) => (item._id === updatedEvent._id ? updatedEvent : item))
    );
  };

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
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
                <span>Event Management Console</span>
              </div>
              <h1 className="text-3xl font-extrabold text-base-content tracking-tight">
                Manage Your Events
              </h1>
              <p className="text-sm text-base-content/70 mt-1">
                You can view, edit, or delete events created under your account.
              </p>
            </div>

            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-md shadow-emerald-600/20 active:scale-95 transition-all shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Another Event</span>
            </Link>
          </div>

          {/* লোডিং অবস্থা */}
          {loading && (
            <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
              <p className="text-sm text-base-content/60">Fetching your events...</p>
            </div>
          )}

          {/* ডাটা থাকলে টেবিল / রেসপনসিভ কার্ড ভিউ */}
          {!loading && events.length > 0 && (
            <div className="rounded-3xl border border-base-300 bg-base-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-base-200/70 border-b border-base-300 text-xs uppercase font-semibold text-base-content/60">
                    <tr>
                      <th className="px-6 py-4">Event</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">Event Date</th>
                      <th className="px-6 py-4">Location</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-base-200">
                    {events.map((event) => (
                      <tr key={event._id} className="hover:bg-base-200/40 transition-colors">
                        
                        {/* ১. থাম্বনেইল ও টাইটেল */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                event.thumbnail ||
                                "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=200&q=80"
                              }
                              alt={event.title}
                              className="w-12 h-12 rounded-xl object-cover border border-base-300 shrink-0"
                            />
                            <div>
                              <p className="font-bold text-base-content line-clamp-1 max-w-xs">
                                {event.title}
                              </p>
                              <Link
                                href={`/events/${event._id}`}
                                className="text-xs text-emerald-600 hover:underline inline-flex items-center gap-1 mt-0.5"
                              >
                                <span>View Details</span>
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                            </div>
                          </div>
                        </td>

                        {/* ২. টাইপ */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-base-200 border border-base-300">
                            {event.eventType || "Social Service"}
                          </span>
                        </td>

                        {/* ৩. ডেট */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-xs text-base-content/80">
                            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{formatDate(event.eventDate)}</span>
                          </div>
                        </td>

                        {/* ৪. লোকেশন */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-xs text-base-content/80 max-w-xs truncate">
                            <MapPin className="w-3.5 h-3.5 text-base-content/40 shrink-0" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        </td>

                        {/* ৫. অ্যাকশনস */}
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEditClick(event)}
                              type="button"
                              className="p-2 rounded-xl border border-base-300 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/30 text-base-content/80 transition-colors"
                              title="Edit Event"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleDeleteEvent(event)}
                              type="button"
                              className="p-2 rounded-xl border border-rose-200 dark:border-rose-900/40 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                              title="Delete Event"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* কোনো ইভেন্ট না থাকলে এম্পটি স্টেট */}
          {!loading && events.length === 0 && (
            <div className="p-12 rounded-3xl border border-dashed border-base-300 text-center max-w-md mx-auto my-8">
              <FolderKanban className="w-12 h-12 text-base-content/30 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-base-content mb-1">
                You haven&apos;t created any events yet
              </h3>
              <p className="text-sm text-base-content/60 mb-5">
                Host a humanitarian drive in your locality and invite volunteers to make an impact.
              </p>
              <Link
                href="/create-event"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create Your First Event</span>
              </Link>
            </div>
          )}

        </div>

        {/* আপডেট ইভেন্ট মডাল */}
        <UpdateEventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          event={selectedEvent}
          onUpdateSuccess={handleUpdateSuccess}
        />
      </div>
    </ProtectedRoute>
  );
};

export default ManageEventsPage;
