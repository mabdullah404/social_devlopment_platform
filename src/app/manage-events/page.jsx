"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import ProtectedRoute from "@/components/ui/ProtectedRoute";
import UpdateEventModal from "@/components/events/UpdateEventModal";
import { fetchMyManageEvents, deleteCommunityEvent } from "@/lib/api";
import { 
  FolderKanban, 
  Calendar, 
  MapPin, 
  PlusCircle, 
  Pencil, 
  Trash2, 
  ExternalLink, 
  Loader2, 
  Sparkles 
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
      const data = await fetchMyManageEvents(session.user.email);
      setEvents(Array.isArray(data) ? data : []);
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
      title: "Delete Initiative?",
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
          await deleteCommunityEvent(event._id, session.user.email);
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

  // আপডেট সফল হলে লোকাল স্টেট ও ডাটাবেজ থেকে রিফ্রেশ
  const handleUpdateSuccess = (updatedEvent) => {
    setEvents((prev) =>
      prev.map((item) => (item._id === updatedEvent._id ? { ...item, ...updatedEvent } : item))
    );
    fetchMyEvents();
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
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Campaign Console</span>
              </div>
              <h1 className="text-3xl font-extrabold text-base-content tracking-tight">
                Manage My Initiatives
              </h1>
              <p className="text-sm text-base-content/70 mt-1">
                View, update, or remove community campaigns initiated under your profile.
              </p>
            </div>

            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-indigo-600/20 active:scale-95 transition-all shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Launch New Drive</span>
            </Link>
          </div>

          {/* লোডিং অবস্থা */}
          {loading && (
            <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
              <p className="text-sm text-base-content/60">Fetching your initiatives...</p>
            </div>
          )}

          {/* ডাটা থাকলে টেবিল ভিউ (ডেস্কটপ) ও কার্ড ভিউ (মোবাইল) */}
          {!loading && events.length > 0 && (
            <div className="space-y-4">
              
              {/* ১. ডেস্কটপ টেবিল ভিউ (md স্ক্রিন এবং তার বড়) */}
              <div className="hidden md:block rounded-3xl border border-base-300 dark:border-slate-800 bg-base-100 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-base-200/70 dark:bg-slate-900 border-b border-base-300 dark:border-slate-800 text-xs uppercase font-bold text-base-content/60">
                      <tr>
                        <th className="px-6 py-4">Campaign</th>
                        <th className="px-6 py-4">Cause</th>
                        <th className="px-6 py-4">Scheduled Date</th>
                        <th className="px-6 py-4">Location</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-base-200 dark:divide-slate-800/80">
                      {events.map((event) => (
                        <tr key={event._id} className="hover:bg-base-200/40 dark:hover:bg-slate-800/30 transition-colors">
                          
                          {/* থাম্বনেইল ও টাইটেল */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={
                                  event.thumbnail ||
                                  "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=200&q=80"
                                }
                                alt={event.title}
                                className="w-12 h-12 rounded-xl object-cover border border-base-300 dark:border-slate-700 shrink-0"
                              />
                              <div>
                                <p className="font-bold text-base-content line-clamp-1 max-w-xs">
                                  {event.title}
                                </p>
                                <Link
                                  href={`/events/${event._id}`}
                                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 mt-0.5 font-semibold"
                                >
                                  <span>Preview Drive</span>
                                  <ExternalLink className="w-3 h-3" />
                                </Link>
                              </div>
                            </div>
                          </td>

                          {/* টাইপ */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-base-200 dark:bg-slate-800 border border-base-300 dark:border-slate-700 text-indigo-600 dark:text-indigo-400">
                              {event.eventType || "Social Service"}
                            </span>
                          </td>

                          {/* ডেট */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-base-content/80">
                              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                              <span>{formatDate(event.eventDate)}</span>
                            </div>
                          </td>

                          {/* লোকেশন */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5 text-xs text-base-content/80 max-w-xs truncate font-medium">
                              <MapPin className="w-3.5 h-3.5 text-base-content/40 shrink-0" />
                              <span className="truncate">{event.location}</span>
                            </div>
                          </td>

                          {/* অ্যাকশনস */}
                          <td className="px-6 py-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleEditClick(event)}
                                type="button"
                                className="p-2 rounded-xl border border-base-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/40 text-base-content/80 transition-colors"
                                title="Edit Initiative"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => handleDeleteEvent(event)}
                                type="button"
                                className="p-2 rounded-xl border border-rose-200 dark:border-rose-900/40 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                                title="Delete Initiative"
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

              {/* ২. মোবাইল কার্ড ভিউ (ছোট স্ক্রিনে সহজে অ্যাকশন নেওয়ার জন্য) */}
              <div className="md:hidden space-y-4">
                {events.map((event) => (
                  <div
                    key={event._id}
                    className="p-4 rounded-3xl border border-base-300 dark:border-slate-800 bg-base-100 shadow-sm space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={
                          event.thumbnail ||
                          "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=200&q=80"
                        }
                        alt={event.title}
                        className="w-16 h-16 rounded-2xl object-cover border border-base-300 dark:border-slate-700 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300">
                            {event.eventType || "Social Service"}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-base-content line-clamp-1">
                          {event.title}
                        </h4>
                        <p className="text-xs text-base-content/60 flex items-center gap-1 mt-0.5 truncate">
                          <MapPin className="w-3 h-3 shrink-0 text-indigo-500" />
                          <span className="truncate">{event.location}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-base-200 dark:border-slate-800/80">
                      <div className="flex items-center gap-1.5 text-base-content/70 font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{formatDate(event.eventDate)}</span>
                      </div>

                      <Link
                        href={`/events/${event._id}`}
                        className="text-xs text-indigo-600 dark:text-indigo-400 font-bold inline-flex items-center gap-1 hover:underline"
                      >
                        <span>Preview</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => handleEditClick(event)}
                        type="button"
                        className="w-full py-2.5 px-3 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDeleteEvent(event)}
                        type="button"
                        className="w-full py-2.5 px-3 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/30 text-rose-600 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* খালি অবস্থা */}
          {!loading && events.length === 0 && (
            <div className="p-14 rounded-3xl border border-dashed border-base-300 dark:border-slate-800 text-center max-w-md mx-auto my-8">
              <FolderKanban className="w-12 h-12 text-base-content/30 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-base-content mb-1">
                No Campaigns Published Yet
              </h3>
              <p className="text-sm text-base-content/60 mb-5">
                Take the lead in your neighborhood and start your first humanitarian drive.
              </p>
              <Link
                href="/create-event"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Launch First Initiative</span>
              </Link>
            </div>
          )}

        </div>

        {/* আপডেট ইভেন্ট মডাল */}
        <UpdateEventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          event={selectedEvent}
          userEmail={session?.user?.email}
          onUpdateSuccess={handleUpdateSuccess}
        />
      </div>
    </ProtectedRoute>
  );
};

export default ManageEventsPage;
