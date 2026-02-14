// src/components/TawkToChat.tsx
"use client";

import { useEffect } from "react";

export default function TawkToChat() {
  useEffect(() => {
    // Replace with your actual Tawk.to Property ID and Widget ID
    const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
    const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

    if (!propertyId || !widgetId) {
      console.warn("Tawk.to credentials not found in environment variables");
      return;
    }

    // Check if Tawk_API already exists to prevent duplicate loading
    if (window.Tawk_API) {
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode?.insertBefore(script, firstScript);

    // Optional: Customize Tawk.to behavior
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Optional: Set visitor name/email if user is logged in
    // window.Tawk_API.onLoad = function(){
    //   window.Tawk_API.setAttributes({
    //     'name' : 'Visitor Name',
    //     'email' : 'visitor@email.com'
    //   }, function(error){});
    // };

    return () => {
      // Cleanup: Remove Tawk.to widget on component unmount
      const tawkScript = document.querySelector(
        `script[src*="embed.tawk.to"]`,
      );
      if (tawkScript) {
        tawkScript.remove();
      }

      // Remove Tawk_API from window
      if (window.Tawk_API) {
        delete window.Tawk_API;
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
}

// Type declarations for Tawk.to
declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}