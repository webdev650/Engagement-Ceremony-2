import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/lenis/LenisProvider";

export const metadata: Metadata = {
  title: "Ananya & Kabir — Royal Wedding Celebration Invitation",
  description: "Join us in celebrating the 3D scroll-driven wedding invitation of Ananya Vance and Kabir Sterling at Taj Lake Palace, Udaipur.",
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Ananya & Kabir — Wedding Invitation",
    description: "Royal 3D Scroll-Driven Invitation • Taj Lake Palace, Udaipur",
    type: "website",
    images: [
      {
        url: "/images/couple.png",
        width: 1200,
        height: 630,
        alt: "Ananya & Kabir Royal Wedding",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-maroon-950 text-ivory-200 antialiased selection:bg-marigold-500 selection:text-maroon-950">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
