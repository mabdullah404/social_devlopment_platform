// ব্যাকএন্ডের সাথে যোগাযোগের জন্য সহজ ও পরিষ্কার API হেল্পার ফাংশনসমূহ

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// ১. সব আসন্ন ইভেন্ট পাওয়ার রিকোয়েস্ট
export const fetchUpcomingEvents = async (limit, type) => {
  let url = `${API_BASE_URL}/events?`;
  if (limit) url += `limit=${limit}&`;
  if (type && type !== "All") url += `type=${encodeURIComponent(type)}&`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load events");
  return res.json();
};

// ২. একক ইভেন্টের বিস্তারিত পাওয়ার রিকোয়েস্ট
export const fetchEventDetails = async (id) => {
  const res = await fetch(`${API_BASE_URL}/events/${id}`);
  if (!res.ok) throw new Error("Failed to load event details");
  return res.json();
};

// ৩. নতুন ইভেন্ট তৈরি করার রিকোয়েস্ট
export const createCommunityEvent = async (eventData) => {
  const res = await fetch(`${API_BASE_URL}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create event");
  }
  return res.json();
};

// ৪. ইভেন্ট আপডেট করার রিকোয়েস্ট
export const updateCommunityEvent = async (id, updateData) => {
  const res = await fetch(`${API_BASE_URL}/events/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to update event");
  }
  return res.json();
};

// ৫. ইভেন্ট মুছে ফেলার রিকোয়েস্ট
export const deleteCommunityEvent = async (id, email) => {
  const res = await fetch(
    `${API_BASE_URL}/events/${id}?email=${encodeURIComponent(email)}`,
    {
      method: "DELETE",
    }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to delete event");
  }
  return res.json();
};

// ৬. ইভেন্টে জয়েন করার রিকোয়েস্ট
export const joinCommunityEvent = async (registrationData) => {
  const res = await fetch(`${API_BASE_URL}/events/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registrationData),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to join event");
  }
  return res.json();
};

// ৭. ইউজার ইতিমধ্যে জয়েন করেছে কিনা জানার রিকোয়েস্ট
export const checkUserRegistration = async (eventId, email) => {
  const res = await fetch(
    `${API_BASE_URL}/events/check-join/${eventId}/${encodeURIComponent(email)}`
  );
  if (!res.ok) return { joined: false };
  return res.json();
};

// ৮. ইউজারের নিজের তৈরি করা ইভেন্টের তালিকা
export const fetchUserCreatedEvents = async (email) => {
  const res = await fetch(
    `${API_BASE_URL}/events/created/${encodeURIComponent(email)}`
  );
  if (!res.ok) throw new Error("Failed to load your events");
  return res.json();
};

// ৯. ইউজারের জয়েন করা ইভেন্টের তালিকা
export const fetchUserJoinedEvents = async (email) => {
  const res = await fetch(
    `${API_BASE_URL}/events/joined/${encodeURIComponent(email)}`
  );
  if (!res.ok) throw new Error("Failed to load joined events");
  return res.json();
};

