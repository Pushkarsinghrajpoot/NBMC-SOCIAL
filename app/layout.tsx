import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Script from "next/script";
import { AppProvider } from "@/context/AppContext";
import { Navigation } from "@/components/Navigation";

export const metadata: Metadata = {
  title: "NBMC Analytics - Facebook Page Analytics & Insights",
  description:
    "Track, analyze, and compare Facebook Page performance with powerful analytics and insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className="font-sans antialiased" >
        <AppProvider>
 
        {children}
        <Toaster position="bottom-right" />
        </AppProvider>
      </body>
    </html>
  );
}