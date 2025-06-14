import React, { type ReactElement } from "react";
import Link from "@docusaurus/Link";

interface HeroCTAButtonsProps {
  primaryText?: string;
  secondaryText?: string;
  showCredits?: boolean;
  className?: string;
}

export default function HeroCTAButtons({
  primaryText = "Get Started Free",
  secondaryText = "View Pricing",
  showCredits = true,
  className = ""
}: HeroCTAButtonsProps): ReactElement {
  return (
    <div className={`flex justify-center items-center space-x-4 ${className}`}>
      <div className="relative">
        <a
          href="/dashboard/login"
          className="inline-flex items-center bg-white text-secondary px-4 xs:px-8 py-3 rounded-lg font-semibold text-md xs:text-lg hover:bg-gray-100 transition-colors shadow-lg"
        >
          {primaryText}
        </a>
        {showCredits && (
          <p className="absolute top-full left-1/2 transform -translate-x-1/2 text-white/60 text-xs mt-1 font-medium whitespace-nowrap">
            + $75 💸 in free credits
          </p>
        )}
      </div>
      <Link
        href="/pricing"
        className="inline-flex items-center bg-secondary text-white border-2 border-white px-4 xs:px-8 py-3 rounded-lg font-semibold text-md xs:text-lg hover:bg-secondary-hover transition-colors shadow-lg"
      >
        {secondaryText}
      </Link>
    </div>
  );
} 