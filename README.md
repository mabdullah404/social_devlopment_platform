# CivicPulse - Grassroots Social Development & Community Events Platform

> **CivicPulse** is a high-impact, community-driven event management platform where citizens unite to create, join, and track verified grassroots humanitarian initiatives in their local neighborhoods (e.g., Winter Clothes Distribution in Mirpur 10, Blanket Distribution for the Needy in Mohammadpur, Lake Cleanups, Urban Tree Plantations, and Free Health Camps).

---

## 🌐 Live Deployment & Project Links

- **Live Site URL:** [https://civicpulse-platform.vercel.app](https://civicpulse-platform.vercel.app)
- **Client GitHub Repository:** [https://github.com/your-username/social_devlopment_platform](https://github.com/your-username/social_devlopment_platform)
- **Server GitHub Repository:** [https://github.com/your-username/server_social_development](https://github.com/your-username/server_social_development)

---

## 🌟 Key Platform Features (Minimum 5 Highlights)

1. **Grassroots Initiative Discovery & Real-Time Booking:**
   - Public directory displaying all verified upcoming social initiatives with strict exclusion of expired dates.
   - Interactive Causes Grid (Donation, Cleanup, Plantation, Healthcare, Education, Relief) and multi-parameter filtering (Title, Area/Location, Category, and Date sorting).

2. **Verified Community Event Hosting with Future-Date Validation:**
   - Authenticated citizens can launch new campaigns with title, description, category, gathering point, thumbnail, and scheduled date.
   - Built-in form validation strictly prohibits past dates (`min={tomorrow}` + JavaScript timestamp checking) to guarantee future scheduling.

3. **Dedicated Organizer Console & Volunteer Management:**
   - **Manage Events (Private):** Organizers have total ownership over their hosted initiatives with an interactive edit modal and SweetAlert2-powered secure deletion.
   - **Joined Events (Private):** Volunteers can review all drives they have committed to, sorted chronologically by date.

4. **Multi-Provider Authentication & Session Persistence:**
   - Secure email/password registration with strict validation indicators (minimum 6 characters, at least one uppercase letter `A-Z`, and at least one lowercase letter `a-z`).
   - One-click Google OAuth sign-in with BetterAuth and MongoDB direct replicaSet integration.
   - Protected routes preserve active sessions on browser reload with custom loading skeleton states, preventing premature logout.

5. **Theme Customization & High-Accessibility Design:**
   - Universal Light and Dark mode toggling via DaisyUI and Tailwind CSS v4, persistently synced to `localStorage`.
   - ThemeForest-grade aesthetic featuring Royal Indigo & Sunset Amber styling, Eventbrite-style calendar ticket stubs, volunteer enrollment progress bars, and zero lorem ipsum text.
   - 100% responsive across Mobile, Tablet, and Desktop screens, featuring touch-friendly mobile action cards and a collapsible navigation drawer.

---

## 🛠️ Complete Tech Stack

### Frontend Architecture (Client):
- **Framework:** Next.js 16 (App Router)
- **Language:** JavaScript (ES6+ / JSX) — 100% clean, modular code with zero TypeScript complexity
- **Styling:** Tailwind CSS v4, DaisyUI 5, Modern CSS Design Tokens
- **Icons:** Lucide React & Modern SVG Rebrand Logos (including the new X logo)
- **Notifications & Dialogs:** React Hot Toast, SweetAlert2
- **Authentication Client:** BetterAuth React Client (`useSession`, `signIn`, `signUp`, `signOut`, `updateUser`)
- **API Communication:** Centralized JWT Bearer Fetch Service (`src/lib/api.js`)

### Backend Architecture (Server):
- **Runtime:** Node.js
- **Framework:** Express.js (RESTful API, CORS, JSON Body Parser)
- **Database:** MongoDB Atlas (Native MongoDB Node Driver 6.x)
- **Authentication & Security:** JSON Web Tokens (JWT) for private endpoint verification (`verifyToken` middleware)

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── layout.js              # Root layout with Navbar, Footer & Theme Provider
│   ├── page.js                # Home Page (Hero, Features, 6 Recent Drives, Gallery, Newsletter)
│   ├── globals.css            # Tailwind & DaisyUI styling rules & theme tokens
│   ├── (auth)/
│   │   ├── login/page.jsx     # Email/Password + Google OAuth login
│   │   └── register/page.jsx  # Register with password rules & photoURL
│   ├── events/
│   │   ├── page.jsx           # Upcoming Events directory with Causes Grid & Search
│   │   └── [id]/page.jsx      # Event Details & "Join Event" functionality
│   ├── create-event/page.jsx  # Protected: Create Drive with future date validation
│   ├── manage-events/page.jsx # Protected: Organizer Console (Edit / Delete)
│   ├── joined-events/page.jsx # Protected: Volunteer Participated Drives (Sorted by date)
│   └── profile/page.jsx       # Optional: Personal Profile & Live Impact Counters
├── components/
│   ├── layout/                # Navbar (with Hover Tooltip & Logout), Footer (with X logo)
│   ├── home/                  # BannerSection, FeatureSection, RecentEvents, Gallery, Newsletter
│   ├── events/                # EventCard, EventFilter, EventSkeleton, UpdateEventModal
│   ├── forms/                 # PasswordRequirement live visual indicators
│   └── ui/                    # ProtectedRoute wrapper
└── lib/
    ├── auth.js                # BetterAuth server configuration with MongoDB adapter
    ├── auth-client.js         # BetterAuth React client instance
    └── api.js                 # Centralized backend API service with JWT authorization
```

---

## ⚙️ Environment Variables Setup

Create a `.env.local` file inside the client root directory:

```env
# BetterAuth Configuration
BETTER_AUTH_SECRET=your_better_auth_secret_here
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_DB_URL=mongodb://<user>:<password>@<host>:27017/socialDevelopmentDB?ssl=true&replicaSet=<set>&authSource=admin

# Google OAuth Credentials
BETTER_AUTH_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
BETTER_AUTH_GOOGLE_SECRET=your_google_client_secret

# Express Backend Server URL
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 🚀 Running the Project Locally

### 1. Client Setup:
```bash
# Navigate to the client directory
cd social_devlopment_platform

# Install dependencies
npm install

# Run the development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Server Setup:
```bash
# In a separate terminal, navigate to the server directory
cd ../server_social_development

# Install dependencies
npm install

# Start the Express server
npm start
```
The server will run on [http://localhost:5000](http://localhost:5000).

---

## 📝 GitHub Commits & Submission Compliance

- **Client Commits:** 25+ meaningful and structured commits following standard Conventional Commits.
- **Server Commits:** 8+ commits documenting backend route implementations and database operations.
- **Assignment ID:** B14-A8_Cat-Hermione ("Social Development Events Platform")
- **License:** MIT License
