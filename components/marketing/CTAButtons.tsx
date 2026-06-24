"use client";

import { clsx } from "clsx";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { appendUTMToUrl } from "@/lib/utm";
import { SIGNUP_URL } from "@/config/site";

export interface CTAButtonsProps {
  primaryText?: string;
  secondaryText?: string;
  showCredits?: boolean;
  className?: string;
}

/** Primary "get started" + secondary "view pricing" CTA pair (UTM-aware). */
export function CTAButtons({
  primaryText = "Get started free",
  secondaryText = "View pricing",
  showCredits = true,
  className,
}: CTAButtonsProps) {
  return (
    <div className={clsx("flex flex-col items-center gap-2", className)}>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          href={appendUTMToUrl(SIGNUP_URL)}
          size="lg"
          iconRight={<Icon name="ArrowRight" size={17} />}
        >
          {primaryText}
        </Button>
        <Button href={appendUTMToUrl("/pricing")} variant="outline" size="lg">
          {secondaryText}
        </Button>
      </div>
      {showCredits && (
        <p className="text-[13px] text-text-subtle">+ $75 in free credits · no card required</p>
      )}
    </div>
  );
}

export default CTAButtons;
