import { CTAButtons } from "./CTAButtons";

export interface CTASectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  showCredits?: boolean;
}

export function CTASection({
  title = "Ready to secure your smart contracts?",
  description = "Join thousands of developers who trust Savant Chat for their security needs.",
  primaryButtonText,
  secondaryButtonText,
  showCredits = true,
}: CTASectionProps) {
  return (
    <section className="border-t border-[var(--border-subtle)] bg-surface-card">
      <div className="container-max py-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-text-strong">{title}</h2>
        <p className="mx-auto mt-3 max-w-prose text-md text-text-muted">{description}</p>
        <div className="mt-7">
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

export default CTASection;
