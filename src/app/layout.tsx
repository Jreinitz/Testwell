import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TestWell — Affordable Lab Tests. No Doctor Visit Required.",
    template: "%s | TestWell",
  },
  description:
    "Order affordable, physician-reviewed blood tests online. Results in 1–3 days at Quest Diagnostics and Labcorp locations across Florida and Texas. Save up to 80% vs hospital pricing.",
  keywords: [
    "lab tests",
    "blood tests",
    "affordable lab tests",
    "no doctor visit",
    "Florida lab tests",
    "Texas lab tests",
    "Quest Diagnostics",
    "Labcorp",
    "DTC lab testing",
    "blood work online",
    "cheap lab tests",
  ],
  metadataBase: new URL("https://test-well.com"),
  openGraph: {
    title: "TestWell — Affordable Lab Tests. No Doctor Visit Required.",
    description:
      "Save up to 80% on physician-reviewed blood tests at Quest & Labcorp. No doctor visit, no insurance needed. Results in days, not weeks.",
    type: "website",
    url: "https://test-well.com",
    siteName: "TestWell",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TestWell — Affordable Lab Tests. No Doctor Visit Required.",
    description:
      "Save up to 80% on physician-reviewed blood tests at Quest & Labcorp. No doctor visit needed.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://test-well.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ScrollProgress />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
