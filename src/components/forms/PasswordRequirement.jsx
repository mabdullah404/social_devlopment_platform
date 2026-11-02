import React from "react";
import { Check, X } from "lucide-react";

// পাসওয়ার্ডের রুলস চেকের জন্য সহজ কম্পোনেন্ট
const PasswordRequirement = ({ password = "" }) => {
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);

  const rules = [
    { label: "At least 6 characters long", valid: hasMinLength },
    { label: "Contains at least one uppercase letter (A-Z)", valid: hasUppercase },
    { label: "Contains at least one lowercase letter (a-z)", valid: hasLowercase },
  ];

  return (
    <div className="p-3 rounded-xl bg-base-200/60 border border-base-300 text-xs space-y-1.5 mt-1.5">
      <p className="font-semibold text-base-content/70 mb-1">
        Password Requirements:
      </p>
      {rules.map((rule, idx) => (
        <div
          key={idx}
          className={`flex items-center gap-2 transition-colors ${
            rule.valid ? "text-emerald-600 font-medium" : "text-base-content/50"
          }`}
        >
          {rule.valid ? (
            <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 text-emerald-600" />
            </div>
          ) : (
            <div className="w-4 h-4 rounded-full bg-base-300 flex items-center justify-center shrink-0">
              <X className="w-2.5 h-2.5 text-base-content/40" />
            </div>
          )}
          <span>{rule.label}</span>
        </div>
      ))}
    </div>
  );
};

export default PasswordRequirement;
