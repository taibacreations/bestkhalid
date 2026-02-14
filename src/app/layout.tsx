import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import { Bricolage_Grotesque } from "next/font/google";
import Footer from "@/components/footer";
import { tartuffo } from "./fonts";
import SmoothScroll from "@/components/SmoothScroll";
import ChatWidgets from "@/components/ChatWidgets";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-bricolage-grotesque",
});

export const metadata: Metadata = {
  title: "KHALID MAHMOOD",
  description: "Websites for Healthcare Providers",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>

      </head>
      <body
        className={`${bricolageGrotesque.variable} ${tartuffo.variable} antialiased`}
      >
        <SmoothScroll>
          <main>
            <Header />
            {children}
            <Footer />
            {/* Chat Widgets - Add this at the end of body */}
            <ChatWidgets
              enableTawkTo={true}
              enableWhatsApp={true}
              whatsAppMessage="Hello Khalid! I'd like to discuss a project."
              whatsAppPosition="right"
            />
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
