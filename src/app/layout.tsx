import type { Metadata, Viewport } from "next";
import { Inter, Saira } from "next/font/google";

import "./globals.css";

/* Texto e interface — a grotesca neutra das artes da loja. */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

/* Assinatura da marca e rótulos técnicos — desenho quadrado, como no logo. */
const saira = Saira({
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
  display: "swap",
  variable: "--font-saira",
});

export const metadata: Metadata = {
  title: "Almeida Imports — Tecnologia que conecta você",
  description:
    "Loja de eletrônicos em Buritis e Arinos (MG): iPhone, Xiaomi, JBL e Starlink com garantia, parcelamento no boleto em até 24x e assistência técnica especializada.",
  icons: {
    icon: [{ url: "/assets/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05070e",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${saira.variable}`}>
      <body>{children}</body>
    </html>
  );
}
