import React, { type ReactElement } from "react";

interface CTAButtonsProps {
  primaryText?: string;
  secondaryText?: string;
  showCredits?: boolean;
  className?: string;
}

export default function CTAButtons({
  primaryText = "Get Started Free",
  secondaryText = "View Pricing",
  showCredits = true,
  className = ""
}: CTAButtonsProps): ReactElement {
  return (
    <div className={`flex justify-center items-center space-x-4 ${className}`}>
      <div className="relative">
        <a
          href="/dashboard/login"
          className="inline-flex items-center bg-primary text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg"
        >
          {primaryText}
        </a>
        {showCredits && (
          <p className="absolute top-full left-1/2 transform -translate-x-1/2 text-gray-500 text-xs mt-1 font-medium whitespace-nowrap">
            + $75 💸 in free credits
          </p>
        )}
      </div>
      <a
        href="/pricing"
        className="inline-flex items-center bg-white text-primary border-2 border-primary px-8 py-3 rounded-lg font-semibold text-lg hover:bg-primary/5 transition-colors shadow-lg"
      >
        {secondaryText}
      </a>
    </div>
  );
} 