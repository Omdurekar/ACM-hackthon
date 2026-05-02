import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/context/SessionContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FocusFlow - Smart Pomodoro Timer",
  description: "A Zen-Minimalist adaptive productivity timer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans transition-colors duration-700 ease-in-out">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
