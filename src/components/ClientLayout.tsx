"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/SmoothScroll";
import ChatWidgets from "@/components/ChatWidgets";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideLayout = pathname.startsWith("/studio");

  return (
    <SmoothScroll>
      <main>
        {!hideLayout && <Header />}
        {children}
        {!hideLayout && <Footer />}
        {!hideLayout && (
          <ChatWidgets
            enableTawkTo={true}
            enableWhatsApp={true}
            whatsAppMessage="Hello Khalid! I'd like to discuss a project."
            whatsAppPosition="left"
          />
        )}
      </main>
    </SmoothScroll>
  );
}