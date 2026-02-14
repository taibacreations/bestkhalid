// src/components/ChatWidgets.tsx
"use client";

import TawkToChat from "./TawkToChat";
import WhatsAppWidget from "./WhatsAppWidget";

interface ChatWidgetsProps {
  enableTawkTo?: boolean;
  enableWhatsApp?: boolean;
  whatsAppNumber?: string;
  whatsAppMessage?: string;
  whatsAppPosition?: "left";
}

export default function ChatWidgets({
  enableTawkTo = true,
  enableWhatsApp = true,
  whatsAppNumber,
  whatsAppMessage,
  whatsAppPosition = "left",
}: ChatWidgetsProps) {
  return (
    <>
      {enableTawkTo && <TawkToChat />}
      {enableWhatsApp && (
        <WhatsAppWidget
          phoneNumber={whatsAppNumber}
          message={whatsAppMessage}
          position={whatsAppPosition}
          bottomOffset="20px" // ← Changed this!
        />
      )}
    </>
  );
}