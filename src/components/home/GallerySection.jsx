import React from "react";
import { Camera, MapPin } from "lucide-react";

// হোম পেজের স্ট্যাটিক গ্যালারি সেকশন (বাস্তব সমাজসেবামূলক কাজের ছবি)
const GallerySection = () => {
  const photos = [
    {
      title: "Winter Clothes Distribution",
      location: "Mirpur 10, Dhaka",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
      category: "Warmth & Relief",
    },
    {
      title: "Blanket Distribution for the Needy",
      location: "Mohammadpur, Dhaka",
      image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80",
      category: "Humanitarian Aid",
    },
    {
      title: "Clean City & Plastic Cleanup",
      location: "Dhanmondi Lake, Dhaka",
      image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
      category: "Environment",
    },
    {
      title: "Urban Tree Plantation Drive",
      location: "Uttara Sector 11, Dhaka",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
      category: "Green Earth",
    },
    {
      title: "Free Healthcare & Eye Checkup",
      location: "Old Dhaka",
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
      category: "Medical Camp",
    },
    {
      title: "Emergency Food & Nutrition Sharing",
      location: "Kamalapur, Dhaka",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
      category: "Food Support",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-base-200/50 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* সেকশন হেডার */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-base-100 border border-base-300 text-xs font-semibold text-emerald-600 mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Moments of Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-base-content tracking-tight">
            Community Service in Action
          </h2>
          <p className="text-base text-base-content/70 mt-3 leading-relaxed">
            Real moments from volunteers who stepped up to bring warmth, cleanliness, and care to neighbors in need.
          </p>
        </div>

        {/* ৬টি ছবির গ্রিড (সমান উচ্চতা ও সাইজ) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] border border-base-300 bg-base-200 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* ছবি */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />

              {/* গ্রেডিয়েন্ট ওভারলে */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* টপ ক্যাটাগরি পিল */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/20 backdrop-blur-md text-white border border-white/30">
                  {item.category}
                </span>
              </div>

              {/* বটম ক্যাপশন */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-bold text-base leading-snug drop-shadow-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-white/80 flex items-center gap-1 mt-1 drop-shadow-sm">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GallerySection;
