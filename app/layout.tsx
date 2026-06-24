import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@/styles/globals.css";
import { Nav } from "@/components/marketing/Nav";
import { Footer } from "@/components/marketing/Footer";
import {
  SITE,
  SITE_URL,
  SOFTWARE_APPLICATION_JSONLD,
  ORGANIZATION_JSONLD,
} from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE.title,
    template: "%s | Savant Chat",
  },
  description: SITE.tagline,
  keywords: SITE.keywords,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/img/savant-favicon.png", sizes: "48x48", type: "image/png" }],
    shortcut: "/img/savant-favicon.png",
    apple: { url: "/img/savant-apple-touch-icon.png", sizes: "180x180" },
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "Savant Chat - AI Smart Contract Auditor Agent",
    description: SITE.tagline,
    url: SITE_URL,
    images: [{ url: SITE.ogImage }],
  },
  twitter: {
    card: "summary",
    title: "Savant Chat - AI Smart Contract Auditor Agent",
    description: SITE.tagline,
    images: [SITE.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#FF6B00",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="msapplication-TileImage" content="/img/logo_short.svg" />
        <meta name="msapplication-TileColor" content="#FF6B00" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SOFTWARE_APPLICATION_JSONLD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSONLD) }}
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        {/* Matomo analytics (carried over from the previous site). */}
        <Script id="matomo" strategy="afterInteractive">
          {`
            var _paq = window._paq = window._paq || [];
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              var u="//analytics.savant.chat/";
              _paq.push(['setTrackerUrl', u+'matomo.php']);
              _paq.push(['setSiteId', '2']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
