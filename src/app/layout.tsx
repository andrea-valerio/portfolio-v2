import type { Metadata, Viewport } from "next";
import { Archivo_Black, Source_Serif_4, Caveat, JetBrains_Mono } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import { Nav } from "@/components/chrome/Nav";
import { Footer } from "@/components/chrome/Footer";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import { Animations } from "@/components/chrome/Animations";
import { ContactModalProvider } from "@/components/landing/ContactModalProvider";
import { HashScroll } from "@/components/chrome/HashScroll";

const display = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display",
});
const serif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});
const hand = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hand",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Andrea Valerio — UX Designer & HCI Researcher",
    template: "%s — Andrea Valerio",
  },
  description:
    "Product designer and HCI researcher working at the seam of UX/UI design, UX research, and HCI research. Currently designing for Loomly & Issuu at Bending Spoons.",
  keywords: [
    "Andrea Valerio",
    "Product Designer",
    "UX Designer",
    "UX Research",
    "HCI Research",
    "Bending Spoons",
    "Loomly",
    "Issuu",
    "Meetup",
    "DLR",
    "UNOX",
    "Portfolio",
  ],
  authors: [{ name: "Andrea Valerio" }],
  creator: "Andrea Valerio",
  openGraph: {
    type: "website",
    title: "Andrea Valerio — UX Designer & HCI Researcher",
    description: "Product design + HCI research. Bridging minds and technologies.",
    siteName: "Andrea Valerio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrea Valerio — UX Designer & HCI Researcher",
    description: "Product design + HCI research. Bridging minds and technologies.",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4ede0" },
    { media: "(prefers-color-scheme: dark)", color: "#161310" },
  ],
};

const NO_FLASH_SCRIPT = `(function(){try{var m=localStorage.getItem("portfolio-mode"),d=!1;if(m==="dark")d=!0;else if(m==="light")d=!1;else d=window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.setAttribute("data-mode","dark");else document.documentElement.removeAttribute("data-mode");}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${hand.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
      </head>
      <body className="grain">
        <ContactModalProvider>
          <ScrollProgress />
          <HashScroll />
          <Nav />
          {children}
          <Footer />
          <Animations />
          <Script
            src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"
            strategy="afterInteractive"
          />
          <Script
            src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"
            strategy="afterInteractive"
          />
        </ContactModalProvider>
      </body>
    </html>
  );
}
