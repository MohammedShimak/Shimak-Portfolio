import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { PortfolioProvider } from "@/lib/PortfolioContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohammed Shimak A — IT Student & Aspiring Software Developer",
  description:
    "Portfolio of Mohammed Shimak A — Information Technology student at Velalar College of Engineering & Technology. Passionate about software development, Java, Python, SQL, and AI/ML.",
  keywords: [
    "Mohammed Shimak",
    "software developer",
    "IT student",
    "Java",
    "Python",
    "web development",
    "AI ML",
    "portfolio",
    "Velalar College",
  ],
  authors: [{ name: "Mohammed Shimak A" }],
  creator: "Mohammed Shimak A",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://shimak.dev",
    siteName: "Mohammed Shimak A Portfolio",
    title: "Mohammed Shimak A — IT Student & Aspiring Software Developer",
    description:
      "Portfolio of Mohammed Shimak A — Information Technology student passionate about software development, Java, Python, SQL, and AI/ML.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mohammed Shimak A Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Shimak A — IT Student & Aspiring Software Developer",
    description:
      "Portfolio of Mohammed Shimak A — Information Technology student passionate about software development.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mohammed Shimak A",
              url: "https://shimak.dev",
              sameAs: [
                "https://github.com/shimak",
                "https://www.linkedin.com/in/mohammed-shimak-a",
              ],
              jobTitle: "Information Technology Student",
              affiliation: {
                "@type": "EducationalOrganization",
                name: "Velalar College of Engineering & Technology",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <PortfolioProvider>
          {children}
        </PortfolioProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              borderRadius: "12px",
              background: "#fff",
              color: "#0f172a",
              boxShadow: "0 10px 40px -4px rgba(99,102,241,0.15)",
              border: "1px solid #e2e8f0",
              fontSize: "0.875rem",
              fontWeight: "500",
            },
            success: { iconTheme: { primary: "#6366f1", secondary: "#fff" } },
          }}
        />
      </body>
    </html>
  );
}
