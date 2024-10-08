import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Toaster } from "sonner";

import { montserrat } from "@/app/ui/fonts";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "@/components/Footer";

import "./globals.css";
import Providers from "./providers";
import HotjarTemplate from "./HotjarTemplate";

export const metadata: Metadata = {
  title:
    "Oferty pracy :: Technik weterynarii praca :: Weterynarz Praca - Vettech",
  description:
    "Portal pracy dla Techników Weterynarii oraz Lekarzy Weterynarii. Najnowsze oferty pracy dla weterynarzy, tylko z widełkami wynagrodzeń.",
  keywords: [
    "weterynaria",
    "technik weterynarii",
    "praca",
    "lekarze weterynarii",
    "praca technik weterynarii",
    "praca lekarz weterynarii",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased bg-slate-100 text-dark-blue`}
      >
        <HotjarTemplate />
        <Providers>
          <div>
            <div className="min-h-[calc(100vh-px)]">{children}</div>
            <Footer />
          </div>
        </Providers>
        <Toaster
          position="top-right"
          closeButton={true}
          duration={2000}
          richColors={true}
        />
        <Analytics />
        <SpeedInsights />
      </body>
      <GoogleTagManager gtmId="GTM-NKP74DZ2" />
    </html>
  );
}
