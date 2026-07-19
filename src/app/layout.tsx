import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "@/styles/cursor.css";
import { LenisProvider } from "@/components/ui/LenisProvider";
import { CursorProvider } from "@/components/cursor/CursorProvider";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { CursorSpotlight } from "@/components/cursor/CursorSpotlight";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ServiceWorkerRegistration } from "@/components/ui/ServiceWorkerRegistration";
import { MusicPlayer } from "@/components/ui/MusicPlayer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const headingFont = inter;

export const metadata: Metadata = {
  title: {
    default: "EDS CodeTantra | Python Theory & Lab Solutions",
    template: "%s | EDS CodeTantra",
  },
  description:
    "Complete EDS (Engineering Design & Sustainability) solutions for CodeTantra portal. Python theory and lab questions with working code solutions.",
  keywords: [
    "EDS",
    "CodeTantra",
    "Python",
    "theory",
    "lab",
    "solutions",
    "engineering",
  ],
  authors: [{ name: "Aryan Bhalsing" }],
  creator: "Aryan Bhalsing",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "EDS CodeTantra",
  description: "Complete EDS Python Theory & Lab Solutions for CodeTantra Portal",
  author: {
    "@type": "Person",
    name: "Aryan Bhalsing",
    url: "https://github.com/iamaryanbhalsing",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${headingFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ServiceWorkerRegistration />
        <ThemeProvider>
          <LenisProvider>
            <CursorProvider>
              <CustomCursor />
              <CursorSpotlight />
              <MusicPlayer />
              {children}
            </CursorProvider>
          </LenisProvider>
        </ThemeProvider>
        <Script
          id="jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
