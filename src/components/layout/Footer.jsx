import React from "react";
import Link from "next/link";
import { HeartHandshake, Mail, MapPin, Phone, Github, Linkedin, Facebook } from "lucide-react";

// আধুনিক এবং দৃষ্টিনন্দন ফুটার কম্পোনেন্ট (নতুন X লোগো সহ)
const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300 text-base-content/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* কলাম ১: ব্র্যান্ড এবং মিশন */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight text-base-content">
                Impact<span className="text-emerald-600">Sphere</span>
              </span>
            </Link>
            <p className="text-sm text-base-content/70 leading-relaxed">
              A community-driven event management platform where citizens unite to create, join, and track impactful social service events in their local neighborhoods.
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

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-base-100 border border-base-300 flex items-center justify-center text-base-content hover:text-emerald-600 hover:border-emerald-600 transition-colors shadow-sm"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-base-100 border border-base-300 flex items-center justify-center text-base-content hover:text-emerald-600 hover:border-emerald-600 transition-colors shadow-sm"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-full bg-base-100 border border-base-300 flex items-center justify-center text-base-content hover:text-emerald-600 hover:border-emerald-600 transition-colors shadow-sm"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* কলাম ২: দ্রুত লিঙ্কসমূহ */}
          <div>
            <h4 className="font-semibold text-base text-base-content mb-4 tracking-wide uppercase text-xs">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-emerald-600 transition-colors">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/create-event" className="hover:text-emerald-600 transition-colors">
                  Host a Community Event
                </Link>
              </li>
              <li>
                <Link href="/manage-events" className="hover:text-emerald-600 transition-colors">
                  Manage Events
                </Link>
              </li>
              <li>
                <Link href="/joined-events" className="hover:text-emerald-600 transition-colors">
                  My Joined Events
                </Link>
              </li>
            </ul>
          </div>

          {/* কলাম ৩: প্রধান উদ্যোগসমূহ */}
          <div>
            <h4 className="font-semibold text-base text-base-content mb-4 tracking-wide uppercase text-xs">
              Focus Areas
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Winter Clothes & Blanket Relief
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                Tree Plantation & Urban Greenery
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Food Sharing & Nutrition Drives
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Clean City & Recycling Drives
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                Free Medical & Blood Camps
              </li>
            </ul>
          </div>

          {/* কলাম ৪: যোগাযোগ ও সাপোর্ট */}
          <div className="space-y-3">
            <h4 className="font-semibold text-base text-base-content mb-4 tracking-wide uppercase text-xs">
              Contact & Support
            </h4>
            <div className="flex items-start gap-3 text-sm text-base-content/70">
              <MapPin className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
              <span>Mirpur 10 & Mohammadpur, Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-base-content/70">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>+880 1700-000000</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-base-content/70">
              <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>support@impactsphere.org</span>
            </div>
            <p className="text-xs text-base-content/50 pt-2">
              Open 7 days a week for urgent humanitarian event coordination.
            </p>
          </div>

        </div>

        {/* নিচের কপিরাইট ও ক্রেডিট */}
        <div className="mt-12 pt-6 border-t border-base-300 flex flex-col sm:flex-row items-center justify-between text-xs text-base-content/60 gap-4">
          <p>© {new Date().getFullYear()} ImpactSphere. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with dedication for social development and community impact.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
