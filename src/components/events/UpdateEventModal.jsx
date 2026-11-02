"use client";

import React, { useState, useEffect } from "react";
import { X, Calendar, MapPin, Tag, FileText, Image as ImageIcon, Loader2, Save } from "lucide-react";
import toast from "react-hot-toast";
import { updateCommunityEvent } from "@/lib/api";

// ইভেন্ট আপডেট করার জন্য সহজ ও মডুলার মডাল কম্পোনেন্ট (ভ্যালিডেশন সহ)
const UpdateEventModal = ({ isOpen, onClose, event, userEmail, onUpdateSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState("Donation");
  const [thumbnail, setThumbnail] = useState("");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [loading, setLoading] = useState(false);

  // আগামীকাল বা ভবিষ্যতের তারিখের ন্যূনতম মান
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  // মডাল খুললে বিদ্যমান ইভেন্ট ডাটা স্টেট-এ সেট করা
  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setDescription(event.description || "");
      setEventType(event.eventType || "Donation");
      setThumbnail(event.thumbnail || "");
      setLocation(event.location || "");
      // তারিখের YYYY-MM-DD অংশ নেওয়া
      const datePart = event.eventDate ? event.eventDate.split("T")[0] : "";
      setEventDate(datePart);
    }
  }, [event]);

  if (!isOpen || !event) return null;

  // আপডেট সাবমিট হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ভ্যালিডেশন
    if (!title.trim() || title.trim().length < 5) {
      toast.error("Title must be at least 5 characters.");
      return;
    }
    if (!description.trim() || description.trim().length < 15) {
      toast.error("Description must be at least 15 characters.");
      return;
    }
    if (!location.trim()) {
      toast.error("Location is required.");
      return;
    }
    if (!eventDate) {
      toast.error("Please select a future event date.");
      return;
    }

    const selectedDateTime = new Date(eventDate).getTime();
    const currentDateTime = new Date().setHours(0, 0, 0, 0);
    if (selectedDateTime <= currentDateTime) {
      toast.error("Event date must be in the future.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title: title.trim(),
        description: description.trim(),
        eventType,
        thumbnail: thumbnail.trim(),
        location: location.trim(),
        eventDate,
      };

      // JWT টোকেন সহ নিরাপদে সেন্ট্রালাইজড এপিআই দিয়ে ইভেন্ট আপডেট করা
      const updated = await updateCommunityEvent(event._id, payload, userEmail);

      toast.success("Event updated successfully!");
      if (onUpdateSuccess) {
        onUpdateSuccess({ ...event, ...payload, ...updated });
      }
      onClose();
    } catch (err) {
      toast.error(err.message || "Update error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-base-100 rounded-3xl border border-base-300 dark:border-slate-800 shadow-2xl p-5 sm:p-8">
        
        {/* মডাল হেডার */}
        <div className="flex items-center justify-between pb-4 border-b border-base-300 mb-6">
          <div>
            <h3 className="text-xl font-bold text-base-content">
              Update Event Details
            </h3>
            <p className="text-xs text-base-content/60 mt-0.5">
              Modify your event information and schedule
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-base-200 text-base-content/60 hover:text-base-content transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ফর্ম */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* টাইটেল */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-base-content/70 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              <span>Event Title *</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-base-300 bg-base-200/50 text-base-content text-sm focus:outline-none focus:border-emerald-600"
            />
          </div>

          {/* ক্যাটাগরি ও ডেট */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-base-content/70 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-emerald-600" />
                <span>Event Type *</span>
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-base-300 bg-base-200/50 text-base-content text-sm focus:outline-none focus:border-emerald-600"
              >
                <option value="Donation">Donation</option>
                <option value="Cleanup">Cleanup</option>
                <option value="Plantation">Plantation</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Relief">Relief</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-base-content/70 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>Event Date *</span>
              </label>
              <input
                type="date"
                required
                min={tomorrow}
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-base-300 bg-base-200/50 text-base-content text-sm focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          {/* লোকেশন */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-base-content/70 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Location *</span>
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-base-300 bg-base-200/50 text-base-content text-sm focus:outline-none focus:border-emerald-600"
            />
          </div>

          {/* ইমেজ URL */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-base-content/70 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>Thumbnail Image URL</span>
            </label>
            <input
              type="url"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-base-300 bg-base-200/50 text-base-content text-sm focus:outline-none focus:border-emerald-600"
            />
          </div>

          {/* বর্ণনা */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-base-content/70 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              <span>Description *</span>
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-base-300 bg-base-200/50 text-base-content text-sm focus:outline-none focus:border-emerald-600"
            />
          </div>

          {/* বাটনসমূহ (মোবাইলে ফুল উইথ ও রেস্পন্সিভ) */}
          <div className="pt-4 border-t border-base-300 dark:border-slate-800 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-base-300 dark:border-slate-800 text-sm font-semibold hover:bg-base-200 transition-colors text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 disabled:opacity-50 transition-all active:scale-95 text-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default UpdateEventModal;

