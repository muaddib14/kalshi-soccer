import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kalshi Soccer - AI-Powered Football Betting Predictions",
  description: "Get accurate match forecasts, AI analysis, and data-driven insights for smarter football betting decisions. Powered by machine learning and advanced analytics.",
  keywords: ["football betting", "soccer predictions", "AI analysis", "sports betting", "match forecast", "machine learning"],
  authors: [{ name: "MiniMax Agent" }],
  creator: "MiniMax Agent",
  publisher: "Kalshi Soccer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://kalshi-soccer.com'),
  openGraph: {
    title: "Kalshi Soccer - AI-Powered Football Betting Predictions",
    description: "Advanced football betting predictions powered by machine learning and AI analysis.",
    url: "https://kalshi-soccer.com",
    siteName: "Kalshi Soccer",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalshi Soccer - AI-Powered Football Betting Predictions",
    description: "Advanced football betting predictions powered by machine learning and AI analysis.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${oswald.variable} font-sans antialiased bg-slate-100`}
      >
        {children}
      </body>
    </html>
  );
}
