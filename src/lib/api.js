// ব্যাকএন্ডের সাথে যোগাযোগের জন্য সেন্ট্রালাইজড এবং নিরাপদ API সার্ভিস
// C:\PROJECTS\server_social_development\index.js এর সব রাউটের সাথে হুবহু সামঞ্জস্যপূর্ণ

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ১. JWT টোকেন সংগ্রহ ও লোকালস্টোরেজে সংরক্ষণ
export const getOrFetchToken = async (email) => {
  if (typeof window === "undefined") return null;

  let token = localStorage.getItem("access-token");
  if (!token && email) {
    try {
      const res = await fetch(`${API_BASE_URL}/jwt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        const data = await res.json();
        token = data.token;
        localStorage.setItem("access-token", token);
      }
    } catch (err) {
      console.error("JWT Token generation error:", err);
    }
  }
  return token;
};

// ২. হোম পেজের সাম্প্রতিক ৬টি আসন্ন ইভেন্ট পাওয়ার রিকোয়েস্ট (/recent-events)
export const fetchRecentEvents = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/recent-events`);
    if (res.ok) return res.json();
  } catch {
    // ফলব্যাক
  }
  const fallbackRes = await fetch(`${API_BASE_URL}/events`);
  if (!fallbackRes.ok) throw new Error("Failed to load recent events");
  const data = await fallbackRes.json();
  return Array.isArray(data) ? data.slice(0, 6) : [];
};

// ৩. সকল আপকামিং ইভেন্ট পাওয়ার রিকোয়েস্ট (/events)
export const fetchUpcomingEvents = async (search = "", eventType = "All") => {
  let url = `${API_BASE_URL}/events?`;
  if (search) url += `search=${encodeURIComponent(search)}&`;
  if (eventType && eventType !== "All") url += `eventType=${encodeURIComponent(eventType)}&`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load events");
  return res.json();
};

// ৪. একক ইভেন্টের বিস্তারিত পাওয়ার রিকোয়েস্ট (/events/:id)
export const fetchEventDetails = async (id) => {
  const res = await fetch(`${API_BASE_URL}/events/${id}`);
  if (!res.ok) throw new Error("Failed to load event details");
  return res.json();
};

// ৫. নতুন ইভেন্ট তৈরি করার রিকোয়েস্ট (POST /events - JWT Protected)
export const createCommunityEvent = async (eventData, userEmail) => {
  const token = await getOrFetchToken(userEmail);
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}/events`, {
    method: "POST",
    headers,
    body: JSON.stringify(eventData),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create event");
  }
  return res.json();
};

// ৬. ইউজারের নিজের তৈরি ইভেন্টসমূহ দেখা (GET /manage-events - JWT Protected)
export const fetchMyManageEvents = async (email) => {
  const token = await getOrFetchToken(email);
  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}/manage-events?email=${encodeURIComponent(email)}`, {
    headers,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to load manage events");
  }
  return res.json();
};

// ৭. ইভেন্ট আপডেট করা (PUT /events/:id - JWT Protected)
export const updateCommunityEvent = async (id, updateData, userEmail) => {
  const token = await getOrFetchToken(userEmail);
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}/events/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(updateData),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to update event");
  }
  return res.json();
};

// ৮. ইভেন্ট ডিলিট করা (DELETE /events/:id - JWT Protected)
export const deleteCommunityEvent = async (id, userEmail) => {
  const token = await getOrFetchToken(userEmail);
  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}/events/${id}`, {
    method: "DELETE",
    headers,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to delete event");
  }
  return res.json();
};

// ৯. কোনো ইভেন্টে জয়েন করা (POST /joined-events - JWT Protected)
export const joinCommunityEvent = async (registrationData, userEmail) => {
  const token = await getOrFetchToken(userEmail);
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}/joined-events`, {
    method: "POST",
    headers,
    body: JSON.stringify(registrationData),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to join event");
  }
  return res.json();
};

// ১০. ইউজারের জয়েন করা ইভেন্টসমূহ দেখা (GET /joined-events - JWT Protected)
export const fetchUserJoinedEvents = async (email) => {
  const token = await getOrFetchToken(email);
  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}/joined-events?email=${encodeURIComponent(email)}`, {
    headers,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to load joined events");
  }
  return res.json();
};
