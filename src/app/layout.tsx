import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import { inter } from "@/app/ui/fonts";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";

import Providers from "./providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Vetpraca by Vettech",
  description: "Portal pracy dla Techników Weterynarii",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-slate-100 text-dark-blue`}
      >
        <Providers>
          <div>{children}</div>
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
