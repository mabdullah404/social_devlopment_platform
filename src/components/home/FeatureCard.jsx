import React from "react";

// একক ফিচার কার্ড কম্পোনেন্ট
const FeatureCard = ({ icon: Icon, title, description, colorClass }) => {
  return (
    <div className="flex flex-col h-full p-6 rounded-3xl border border-base-300 bg-base-100 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-300 group">
      {/* আইকন বক্স */}
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${colorClass}`}
      >
        <Icon className="w-6 h-6" />
      </div>

      {/* টাইটেল */}
      <h3 className="font-bold text-lg text-base-content mb-2 tracking-tight group-hover:text-emerald-600 transition-colors">
        {title}
      </h3>

      {/* ডেসক্রিপশন */}
      <p className="text-sm text-base-content/70 leading-relaxed mt-auto">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
