# ImpactSphere - Social Development & Community Events Platform

**ImpactSphere** is a modern, community-driven event management platform where citizens unite to create, join, and track impactful social service events in their local neighborhoods (e.g., Winter Clothes Distribution in Mirpur, Blanket Distribution in Mohammadpur, City Cleanups, Tree Plantations, and Free Health Camps).

---

## 🌐 Live URL & Repositories

- **Live Site URL:** [https://impact-sphere.vercel.app](https://impact-sphere.vercel.app) *(Deploy URL)*
- **Client Repository:** [https://github.com/your-username/social_devlopment_platform](https://github.com/your-username/social_devlopment_platform)
- **Server Repository:** [https://github.com/your-username/server_social_development](https://github.com/your-username/server_social_development)

---

## 🌟 Key Features of the Platform

- **Community-Driven Event Discovery & Hosting:** Any authenticated user can create grassroots social service initiatives with comprehensive details (title, type, description, location, thumbnail, and future date).
- **Strict Data & Form Validation:** Ensures high data integrity with zero past dates allowed on events and interactive password validation requiring an uppercase letter, a lowercase letter, and at least 6 characters.
- **Dynamic Real-Time Theme Customization:** Instant light and dark mode switching powered by Tailwind CSS v4 and DaisyUI, persistently saved across browsing sessions.
- **Robust Authentication & Protected Routes:** Seamless email/password and Google login via BetterAuth with a MongoDB adapter. Private routes use dedicated loading skeletons to prevent unwanted logout on page reload.
- **Interactive Volunteer Tracking & Management:** Dedicated personal dashboards for organizing events (with edit and SweetAlert2-confirmed delete capabilities) and tracking all joined volunteer initiatives sorted by date.
- **Advanced Search & Categorization:** Instant keyword search by title or neighborhood and category filtering across drives like Donation, Cleanup, Plantation, Healthcare, and Relief.

---

## 🛠️ Tech Stack

### Frontend (Client):
- **Framework:** Next.js 16 (App Router)
- **Language:** JavaScript (ES6+ / JSX) — 100% clean, modular code with zero TypeScript complexity
- **Styling:** Tailwind CSS v4, DaisyUI 5, Base UI / Shadcn UI
- **Icons:** Lucide React
- **Notifications & Dialogs:** React Hot Toast, SweetAlert2
- **Authentication:** BetterAuth Client (`useSession`, `signIn`, `signUp`, `signOut`)

### Backend (Server):
- **Runtime & Framework:** Node.js, Express.js
- **Database:** MongoDB Atlas (MongoDB Node Driver)
- **Architecture:** RESTful API with CORS and JSON middleware

---

## ⚙️ Environment Variables Setup

Create a `.env.local` file in the root directory:

```env
# BetterAuth Configuration
BETTER_AUTH_SECRET=your_better_auth_secret_here
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_DB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority

# Google OAuth (Optional)
BETTER_AUTH_GOOGLE_CLIENT_ID=your_google_client_id
BETTER_AUTH_GOOGLE_SECRET=your_google_client_secret

# Express Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/social_devlopment_platform.git
   cd social_devlopment_platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

---

## 📄 License & Attribution

Designed and developed with dedication for social development and community empowerment.
