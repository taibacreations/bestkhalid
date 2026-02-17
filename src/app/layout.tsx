"use client"
import "./globals.css";
import Header from "@/components/header";
import { Bricolage_Grotesque } from "next/font/google";
import Footer from "@/components/footer";
import { tartuffo } from "./fonts";
import SmoothScroll from "@/components/SmoothScroll";
import ChatWidgets from "@/components/ChatWidgets";
import { usePathname } from "next/navigation";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-bricolage-grotesque",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Hide layout on /studio and all nested routes
  const hideLayout = pathname.startsWith("/studio");
  return (
    <html lang="en">
      <head>

      </head>
      <body
        className={`${bricolageGrotesque.variable} ${tartuffo.variable} antialiased`}
      >
        <SmoothScroll>
          <main>
            {!hideLayout && <Header />}
            {children}
            {!hideLayout && <Footer />}
            {/* Chat Widgets - Add this at the end of body */}
            {!hideLayout && <ChatWidgets
              enableTawkTo={true}
              enableWhatsApp={true}
              whatsAppMessage="Hello Khalid! I'd like to discuss a project."
              whatsAppPosition="left"
            />}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
