import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CursorGlow } from "@/components/CursorGlow";

export const metadata: Metadata = {
  title: {
    default: "TechBro Labs — Sudharsan S | AI/ML Developer & Builder",
    template: "%s | TechBro Labs",
  },
  description:
    "TechBro Labs is the personal brand of Sudharsan S — a B.Tech AIML student building real AI, ML, Data Science, and Software projects. Explore projects, skills, and get in touch.",
  keywords: [
    "TechBro Labs",
    "Sudharsan S",
    "AI ML Developer",
    "Machine Learning",
    "Computer Vision",
    "YOLOv8",
    "Python Developer",
    "Student Developer",
    "Data Science",
    "NLP Projects",
    "Streamlit",
  ],
  authors: [{ name: "Sudharsan S", url: "https://github.com/SudharsaaX" }],
  creator: "Sudharsan S",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sudharsaax.web.app/",
    title: "TechBro Labs — Sudharsan S | AI/ML Developer & Builder",
    description:
      "Building real AI, ML, Data Science, and Software projects. Explore GitHub work and get in touch.",
    siteName: "TechBro Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechBro Labs — Sudharsan S",
    description: "AI/ML Developer · Builder · Continuous Learner",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: 'swap',
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const jetbrains = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${plusJakarta.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-bg text-text-primary antialiased font-sans">
        <CursorGlow />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
