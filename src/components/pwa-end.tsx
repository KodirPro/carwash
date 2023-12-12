"use client";

import Script from "next/script";
import React from "react";
import { Button } from ".";

export function PwaEnd() {
  return (
    <>
      <Button
        className="bg-blue-500 hover:bg-blue-600"
        id="pwa-install-btn"
        hidden
      >
        Install APP
      </Button>
      <Script src="pwa-end.js" />
    </>
  );
}
