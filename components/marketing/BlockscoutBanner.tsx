"use client";

import { useEffect, useState } from "react";
import { getEffectiveUTM, storeUTM, isFromBlockscout } from "@/lib/utm";

const DISMISS_KEY = "savant_blockscout_banner_dismissed";

/** UTM-driven welcome banner for visitors arriving from Blockscout. */
export function BlockscoutBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const utm = getEffectiveUTM();
    storeUTM(utm);
    const dismissed = window.localStorage.getItem(DISMISS_KEY);
    // Mount-time read of a client-only value (UTM + localStorage) — setState here is intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isFromBlockscout(utm) && dismissed !== "1") setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className="bg-flame-500 text-white">
      <div className="container-max flex items-center justify-between py-2">
        <p className="text-sm font-medium md:text-base">
          Welcome, Blockscout users! Enjoy $75 in free credits to try Savant Chat.
        </p>
        <button
          aria-label="Dismiss Blockscout banner"
          className="ml-4 rounded-md bg-white/10 px-3 py-1 text-sm transition-colors hover:bg-white/20"
          onClick={() => {
            window.localStorage.setItem(DISMISS_KEY, "1");
            setShow(false);
          }}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

export default BlockscoutBanner;
