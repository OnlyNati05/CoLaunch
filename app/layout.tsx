import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { AuthProvider } from "@/contexts/auth-context";
import Navbar from "@/components/Navbar";

const satoshi = localFont({
  variable: "--font-satoshi",
  src: [
    {
      path: "../public/fonts/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CoLaunch — Find Your Co-Founder",
  description:
    "Meet ambitious builders with complementary skills and find the right co-founder for your next company.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${satoshi.variable} ${geistSans.variable} ${geistMono.variable} min-h-full antialiased`}
      >
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
