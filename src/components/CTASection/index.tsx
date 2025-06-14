import React, { type ReactElement } from "react";
import CTAButtons from "../CTAButtons";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  showCredits?: boolean;
  className?: string;
}

export default function CTASection({
  title = "Ready to Secure Your Smart Contracts?",
  description = "Join thousands of developers who trust Savant Chat for their security needs",
  primaryButtonText,
  secondaryButtonText,
  showCredits = true,
  className = ""
}: CTASectionProps): ReactElement {
  return (
    <section className={`bg-gray-50 py-20 ${className}`}>
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          {description}
        </p>
        <div className="pb-6">
          <CTAButtons
            primaryText={primaryButtonText}
            secondaryText={secondaryButtonText}
            showCredits={showCredits}
          />
        </div>
      </div>
    </section>
  );
} 