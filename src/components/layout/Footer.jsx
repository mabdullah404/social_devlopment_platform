import React from "react";
import Link from "next/link";
import { Activity, Mail, MapPin, Phone } from "lucide-react";

// আধুনিক এবং দৃষ্টিনন্দন ফুটার কম্পোনেন্ট (নতুন X লোগো সহ)
const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300 text-base-content/80 transition-colors w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* কলাম ১: ব্র্যান্ড এবং মিশন */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-base-content">
                Civic<span className="text-indigo-600 dark:text-indigo-400">Pulse</span>
              </span>
            </Link>
            <p className="text-sm text-base-content/70 leading-relaxed">
              A high-impact community-driven event management network where conscious citizens create, join, and track verified grassroots humanitarian initiatives.
            </p>
            {/* নতুন X এবং অন্যান্য সোশ্যাল আইকন */}
            <div className="flex items-center gap-3 pt-2">
              {/* নতুন X (Twitter) লোগো SVG */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (formerly Twitter)"
                className="w-9 h-9 rounded-full bg-base-100 border border-base-300 flex items-center justify-center text-base-content hover:text-emerald-600 hover:border-emerald-600 transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Facebook SVG */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-base-100 border border-base-300 flex items-center justify-center text-base-content hover:text-emerald-600 hover:border-emerald-600 transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* LinkedIn SVG */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-base-100 border border-base-300 flex items-center justify-center text-base-content hover:text-emerald-600 hover:border-emerald-600 transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* GitHub SVG */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-full bg-base-100 border border-base-300 flex items-center justify-center text-base-content hover:text-emerald-600 hover:border-emerald-600 transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* কলাম ২: দ্রুত লিঙ্কসমূহ */}
          <div>
            <h4 className="font-bold text-sm text-base-content mb-4 tracking-wider uppercase">
              Explore Network
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link href="/" className="hover:text-emerald-600 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-emerald-600 transition-colors">
                  Upcoming Community Drives
                </Link>
              </li>
              <li>
                <Link href="/create-event" className="hover:text-emerald-600 transition-colors">
                  Host an Initiative
                </Link>
              </li>
              <li>
                <Link href="/manage-events" className="hover:text-emerald-600 transition-colors">
                  Manage My Drives
                </Link>
              </li>
              <li>
                <Link href="/joined-events" className="hover:text-emerald-600 transition-colors">
                  Registered Volunteering
                </Link>
              </li>
            </ul>
          </div>

          {/* কলাম ৩: প্রধান উদ্যোগসমূহ */}
          <div>
            <h4 className="font-bold text-sm text-base-content mb-4 tracking-wider uppercase">
              Action Sectors
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                Winter Clothing & Blanket Relief
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Urban Greening & Tree Plantations
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Food Sharing & Meal Provision
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Neighborhood Sanitation & Cleanup
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                Free Medical Camps & Eye Screening
              </li>
            </ul>
          </div>

          {/* কলাম ৪: যোগাযোগ ও সাপোর্ট */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-base-content mb-4 tracking-wider uppercase">
              Civic Coordination
            </h4>
            <div className="flex items-start gap-3 text-xs text-base-content/70">
              <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>Mirpur 10 & Mohammadpur, Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-base-content/70">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>+880 1700-000000</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-base-content/70">
              <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>civic@impactsphere.org</span>
            </div>
            <p className="text-[11px] text-base-content/50 pt-2">
              Citizen support network active 24/7 for urgent community disaster and relief coordination.
            </p>
          </div>

        </div>

        {/* নিচের কপিরাইট ও ক্রেডিট */}
        <div className="mt-12 pt-6 border-t border-base-300 flex flex-col sm:flex-row items-center justify-between text-xs text-base-content/60 gap-4">
          <p>© {new Date().getFullYear()} CivicPulse Action Network. All rights reserved.</p>
          <p className="flex items-center gap-1 font-medium">
            Designed for genuine grassroots empowerment and local volunteerism.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
