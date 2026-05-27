import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mayane-cohen.vercel.app"),
  title: {
    default: "Mayane Cohen — Designer Digital",
    template: "%s · Mayane Cohen",
  },
  description:
    "Portfolio de Mayane Cohen, designer digital en M2 à l'ESD. Six projets — du design system B2B à l'expérience IA générative.",
  openGraph: {
    title: "Mayane Cohen — Designer Digital",
    description:
      "Portfolio de Mayane Cohen, designer digital. Six projets — du design system B2B à l'expérience IA générative.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mayane Cohen — Designer Digital",
    description:
      "Portfolio de Mayane Cohen, designer digital.",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${inter.variable} ${plexMono.variable} antialiased`}
    >
      <body className="bg-cream text-ink">
        <main>{children}</main>
      </body>
    </html>
  );
}
