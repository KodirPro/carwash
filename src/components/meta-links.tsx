import Head from "next/head";

export function MetaLinks() {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <base href="/" />
      <meta
        name="viewport"
        content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="Car Wash" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="car-wash-template-identity" content="car-wash" />
      <link
        href="assets/icons/Square44x44Logo.targetsize-36.png"
        media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="assets/icons/android-launchericon-48-48.png"
        media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="assets/icons/android-launchericon-72-72.png"
        media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
        rel="apple-touch-startup-image"
      />
      <link
        href="assets/icons/android-launchericon-96-96.png"
        media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
        rel="apple-touch-startup-image"
      />
      <link
        href="assets/icons/android-launchericon-144-144.png"
        media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="assets/icons/android-launchericon-192-192.png"
        media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        href="assets/icons/Square44x44Logo.targetsize-256.png"
        media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
        rel="apple-touch-startup-image"
      />
      <link
        rel="apple-touch-icon"
        sizes="128x128"
        href="assets/icons/128.png"
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="128x128"
        href="assets/icons/128.png"
      />
      <link
        rel="icon"
        sizes="192x192"
        href="assets/icons/android-launchericon-192-192.png"
      />
      <link rel="icon" sizes="128x128" href="assets/icons/128.png" />
    </Head>
  );
}
