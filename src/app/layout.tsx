import type { Metadata } from "next";
import Script from "next/script";
import { Ubuntu, Ubuntu_Mono } from "next/font/google";
import { PwaEnd, MetaLinks } from "@/components";
import "./globals.css";

const ubuntu = Ubuntu({
  weight: ["400", "500", "700"],
  variable: "--ubuntu",
  subsets: ["latin"],
});

const ubuntuMono = Ubuntu_Mono({
  variable: "--ubuntu-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Car Wash",
  description: "This is a Car Wash app",
  icons: {
    icon: ["assets/icons/favicon.ico?v=4"],
    apple: ["assets/icons/128.png?v=4"],
    shortcut: ["assets/icons/128.png"],
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  manifest: "manifest.json",
};

{/* <link
  href="assets/icons/Square44x44Logo.targetsize-36.png"
  media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
  rel="apple-touch-startup-image"
/>; */}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${ubuntu.variable} ${ubuntuMono.variable}`}>
      {/* <MetaLinks /> */}
      <body className={ubuntu.className}>
        {children}
        <Script src="pwa-start.js" />
        <PwaEnd />
      </body>
    </html>
  );
}
