import type { Metadata, Viewport } from "next";
import { Bruno_Ace_SC, Montserrat } from "next/font/google";

import "./globals.css";

/* Texto, botões e descrições — Montserrat, a família de todo o corpo do
   site. O peso 600 (SemiBold) assina os subtítulos. */
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-montserrat",
});

/* Logo e títulos principais — Bruno Ace SC, o mesmo desenho quadrado e
   tecnológico do letreiro da loja. Só existe no peso 400. */
const brunoAceSC = Bruno_Ace_SC({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-bruno-ace-sc",
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
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${brunoAceSC.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
