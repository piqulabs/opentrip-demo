import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Source_Sans_3, Unbounded } from "next/font/google";
import { StoreHydrator } from "@/components/StoreHydrator";
import "./globals.css";

const display = Unbounded({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jelajah Nusa - Komodo Open Trip 3D2N",
  description:
    "Open trip Labuan Bajo phinisi sharing. Kuota transparan, itinerary detail, DP langsung amankan kursi.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0C3D4C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full`}
    >
      <body className="min-h-full font-sans antialiased">
        <StoreHydrator>{children}</StoreHydrator>
      </body>
    </html>
  );
}
