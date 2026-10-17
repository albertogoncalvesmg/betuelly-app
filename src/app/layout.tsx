import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BETUELLY | Tecnologia aplicada à realidade de quem empreende",
  description:
    "Inteligência de recorrência, alertas de fornada quente e encomendas automatizadas para padarias e comércio local na Grande BH.",
  icons: {
    icon: "/BETUELLY_simbolo.svg",
    shortcut: "/BETUELLY_simbolo.svg",
    apple: "/BETUELLY_simbolo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}