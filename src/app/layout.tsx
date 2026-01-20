import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header, WhatsAppButton, CookieBanner, ScrollToTop } from "@/components/layout";
import { FooterWrapper } from "@/components/layout/FooterWrapper";
import { SchemaOrg } from "@/components/seo";
import { siteConfig } from "@/lib/seo.config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "ménage pau",
    "nettoyage pau",
    "home organiser pau",
    "services à la personne 64",
    "femme de ménage pau",
    "entreprise nettoyage pau",
    "repassage à domicile pau",
    "ménage narcastet",
  ],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Ménage & Nettoyage à Pau (64)`,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Service de ménage et nettoyage professionnel à Pau`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Ménage & Nettoyage à Pau (64)`,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Service de ménage et nettoyage professionnel à Pau`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "", // À ajouter après vérification Search Console
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="geo.region" content="FR-64" />
        <meta name="geo.placename" content="Narcastet" />
        <meta name="geo.position" content="43.2951;-0.3708" />
        <meta name="ICBM" content="43.2951, -0.3708" />
        <SchemaOrg />
      </head>
      <body className="antialiased overflow-x-hidden">
        <ScrollToTop />
        <Header />
        <main className="min-h-screen">{children}</main>
        <FooterWrapper />
        <WhatsAppButton />
        <CookieBanner />
      </body>
    </html>
  );
}
