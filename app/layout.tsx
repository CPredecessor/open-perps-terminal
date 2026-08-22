import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Open Perps Terminal",
  description: "Open-source perpetual DEX analytics for Hyperliquid and Lighter.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title: "Open Perps Terminal", description: "One terminal. Every perp market.", type: "website", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Open Perps Terminal", description: "Open-source perpetual DEX intelligence.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
