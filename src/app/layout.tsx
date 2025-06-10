import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import StoreProvider from "@/lib/redux/StoreProvider"; // 1. Import the provider
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Commerce Platform",
  description: "A modern, performant e-commerce platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background antialiased`}
      >
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
