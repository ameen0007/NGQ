import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const helveticaNowDisplay = localFont({
  src: [
    {
      path: "../public/fonts/HelveticaNowDisplay-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/HelveticaNowDisplay-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/HelveticaNowDisplay-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/HelveticaNowDisplay-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-helvetica",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://finzavio.com'),
  title: {
    default: "Finzavio | Control Your Financial Future",
    template: "%s | Finzavio",
  },
  description: "FINZAVIO helps individuals and families better organize, understand, and review their financial position through structured wellness reviews and goal-focused analysis.",
  openGraph: {
    title: "Finzavio | Control Your Financial Future",
    description: "FINZAVIO helps individuals and families better organize, understand, and review their financial position.",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://finzavio.com',
    siteName: "Finzavio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finzavio | Control Your Financial Future",
    description: "FINZAVIO helps individuals and families better organize, understand, and review their financial position.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={`${helveticaNowDisplay.variable} h-full`} suppressHydrationWarning>
      <body className="font-sans antialiased min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
