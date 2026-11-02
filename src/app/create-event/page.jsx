"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import ProtectedRoute from "@/components/ui/ProtectedRoute";
import { 
  PlusCircle, 
  Calendar, 
  MapPin, 
  Image as ImageIcon, 
  FileText, 
  Tag, 
  Loader2, 
  Sparkles, 
  CheckCircle2 
} from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

// ইভেন্ট তৈরি করার পেজ (প্রাইভেট রুট)
const CreateEventPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  // ফর্মের ফিল্ডগুলোর স্টেট
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState("Donation");
  const [thumbnail, setThumbnail] = useState("");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [loading, setLoading] = useState(false);

  // আগামীকাল বা ভবিষ্যতের তারিখের জন্য ন্যূনতম মান (PDF: অতীতের কোনো তারিখ দেওয়া যাবে না)
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  // ফর্ম সাবমিট হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ১. টাইটেল ভ্যালিডেশন
    if (!title.trim() || title.trim().length < 5) {
      toast.error("Please enter a descriptive title (at least 5 characters).");
      return;
    }

    // ২. ডেসক্রিপশন ভ্যালিডেশন
    if (!description.trim() || description.trim().length < 15) {
      toast.error("Please provide a meaningful description (at least 15 characters).");
      return;
    }

    // ৩. লোকেশন ভ্যালিডেশন
    if (!location.trim()) {
      toast.error("Please provide the event location or address.");
      return;
    }

    // ৪. তারিখ ভ্যালিডেশন (PDF রিকোয়ারমেন্ট: The date must be in the future)
    if (!eventDate) {
      toast.error("Please select an event date.");
      return;
    }

    const selectedDateTime = new Date(eventDate).getTime();
    const currentDateTime = new Date().setHours(0, 0, 0, 0);

    if (selectedDateTime <= currentDateTime) {
      toast.error("Invalid date: Event date must be in the future.");
      return;
    }

    // থাম্বনেইল ডিফল্ট সেট করা যদি ইউজার না দেয়
    const finalThumbnail =
      thumbnail.trim() ||
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80";

    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      
      const payload = {
        title: title.trim(),
        description: description.trim(),
        eventType,
        thumbnail: finalThumbnail,
        location: location.trim(),
        eventDate,
        userEmail: session?.user?.email, // ইউজারের ইমেইল যাতে ভ্যালিডেশন করা যায়
        userName: session?.user?.name,
        createdAt: new Date().toISOString(),
      };

      const res = await fetch(`${apiUrl}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create event");
      }

      // সফলতার SweetAlert2 প্রদর্শন ও Upcoming Events পেজে রিডাইরেক্ট (PDF রিকোয়ারমেন্ট)
      Swal.fire({
        icon: "success",
        title: "Event Created Successfully!",
        text: `Your initiative "${title}" has been published to Upcoming Events.`,
        confirmButtonColor: "#059669",
        confirmButtonText: "View Upcoming Events",
      }).then(() => {
        router.push("/events");
      });
    } catch (err) {
      toast.error(err.message || "Error creating event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen py-10 md:py-16 bg-base-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* হেডার */}
          <div className="mb-8 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Organizer Console</span>
            </div>
            <h1 className="text-3xl font-extrabold text-base-content tracking-tight">
              Create a Community Event
            </h1>
            <p className="text-sm text-base-content/70 mt-1">
              Organize a local social service initiative and invite fellow citizens to volunteer.
            </p>
          </div>

          {/* ফর্ম কার্ড */}
          <div className="rounded-3xl border border-base-300 bg-base-100 p-6 sm:p-10 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* ১. টাইটেল */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Event Title *</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Winter Clothes Distribution Drive 2026"
                  className="w-full px-4 py-3 rounded-2xl border border-base-300 bg-base-200/50 text-base-content text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
                />
              </div>

              {/* ২. ক্যাটাগরি ও তারিখ (২ কলাম) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* ক্যাটাগরি ড্রপডাউন */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Event Type *</span>
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-base-300 bg-base-200/50 text-base-content text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all cursor-pointer"
                  >
                    <option value="Donation">Donation (Clothes, Blankets, Food)</option>
                    <option value="Cleanup">Cleanup Drive (Beach, Street, Lake)</option>
                    <option value="Plantation">Plantation (Trees, Urban Green)</option>
                    <option value="Healthcare">Healthcare (Free Camp, Blood)</option>
                    <option value="Education">Education & Skills Workshop</option>
                    <option value="Relief">Disaster & Emergency Relief</option>
                  </select>
                </div>

                {/* ইভেন্টের তারিখ (ভবিষ্যতের তারিখ আবশ্যক) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Event Date (Future Date Only) *</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={tomorrow}
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-base-300 bg-base-200/50 text-base-content text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
                  />
                  <p className="text-[11px] text-base-content/50">
                    Past dates are restricted. Must be a future date.
                  </p>
                </div>

              </div>

              {/* ৩. লোকেশন */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Location / Gathering Spot *</span>
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Mirpur 10 Circle or Mohammadpur Town Hall, Dhaka"
                  className="w-full px-4 py-3 rounded-2xl border border-base-300 bg-base-200/50 text-base-content text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
                />
              </div>

              {/* ৪. থাম্বনেইল ইমেজ URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Thumbnail Image URL</span>
                </label>
                <input
                  type="url"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-4 py-3 rounded-2xl border border-base-300 bg-base-200/50 text-base-content text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
                />
                {/* ইমেজ প্রিভিউ */}
                {thumbnail && (
                  <div className="mt-2 relative w-full h-36 rounded-2xl overflow-hidden border border-base-300 bg-base-200">
                    <img
                      src={thumbnail}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* ৫. বিস্তারিত বর্ণনা */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Event Description *</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the initiative, goals, what volunteers should bring, and specific coordination details..."
                  className="w-full px-4 py-3 rounded-2xl border border-base-300 bg-base-200/50 text-base-content text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
                />
              </div>

              {/* সাবমিট বাটন */}
              <div className="pt-4 border-t border-base-300 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/events")}
                  className="px-6 py-3 rounded-2xl border border-base-300 text-sm font-medium text-base-content hover:bg-base-200 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium flex items-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Creating Event...</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-4 h-4" />
                      <span>Publish Event</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CreateEventPage;

