import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import { PwaEnd, MetaLinks } from "@/components";
import "./globals.css";
import Script from "next/script";

const ubuntu = Ubuntu({
  weight: ["400", "500", "700"],
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Car Wash",
  description: "This is a Car Wash app",
  icons: {
    icon: ["assets/icons/favicon.ico?v=4"],
    apple: ["assets/icons/128.png?v=4"],
    shortcut: ["assets/icons/128.png"],
  },
  manifest: "manifest.json",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <MetaLinks />
      <body className={ubuntu.className}>
        {children}
        <Script src="pwa-start.js" />
        <PwaEnd />
      </body>
    </html>
  );
}
