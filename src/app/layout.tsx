import type { Metadata } from "next";
import { Figtree, Unbounded } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const figtree = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AceSolarTech | Premium Solar Solutions & EPC",
  description:
    "Transform your energy future with AceSolarTech. Premium solar panel installation, EPC services, and smart energy solutions for residential, commercial, and industrial clients.",
  keywords: [
    "solar panels",
    "solar installation",
    "EPC",
    "renewable energy",
    "solar power",
    "green energy",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${figtree.variable} ${unbounded.variable} font-body antialiased bg-background text-foreground`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
