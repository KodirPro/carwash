import type { Metadata } from "next";
import Script from "next/script";
import { Ubuntu, Ubuntu_Mono } from "next/font/google";
import { PwaEnd } from "@/components";
import "./globals.css";

export const viewport = {
  viewportFit: "cover",
  width: "device-width",
  userScalable: false,
  initialScale: 1.0,
  minimumScale: 1.0,
  maximumScale: 5.0,
};

export const metadata: Metadata = {
  title: "Car Wash",
  description: "This is a Car Wash app",
  icons: {
    icon: ["assets/icons/favicon.ico?v=4"],
    shortcut: ["assets/icons/128.png"],
    other: [
      {
        rel: "apple-touch-icon",
        url: "assets/icons/128.png?v=4",
        sizes: "128x128",
      },
      {
        rel: "apple-touch-icon-precomposed",
        url: "assets/icons/128.png?v=4",
        sizes: "128x128",
      },
      {
        rel: "apple-touch-startup-image",
        url: "assets/icons/Square44x44Logo.targetsize-36.png",
        media:
          "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        rel: "apple-touch-startup-image",
        url: "assets/icons/android-launchericon-48-48.png",
        media:
          "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        rel: "apple-touch-startup-image",
        url: "assets/icons/android-launchericon-72-72.png",
        media:
          "(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)",
      },
      {
        rel: "apple-touch-startup-image",
        url: "assets/icons/android-launchericon-96-96.png",
        media:
          "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)",
      },
      {
        rel: "apple-touch-startup-image",
        url: "assets/icons/android-launchericon-144-144.png",
        media:
          "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        rel: "apple-touch-startup-image",
        url: "assets/icons/android-launchericon-192-192.png",
        media:
          "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        rel: "apple-touch-startup-image",
        url: "assets/icons/Square44x44Logo.targetsize-256.png",
        media:
          "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        rel: "icon",
        url: "assets/icons/android-launchericon-192-192.png",
        sizes: "192x192",
      },
      {
        rel: "icon",
        url: "assets/icons/128.png",
        sizes: "128x128",
      },
    ],
  },
  manifest: "manifest.json",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-title": "Car Wash",
    "apple-mobile-web-app-status-bar-style": "black",
    "car-wash-front-template-identity": "car-wash-front",
  },
};

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${ubuntu.variable} ${ubuntuMono.variable}`}>
      <body className={ubuntu.className}>
        {children}
        <Script src="pwa-start.js" />
        <PwaEnd />
      </body>
    </html>
  );
}
