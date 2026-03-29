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
  title: "NGQ Assets",
  description: "Control your financial future easily with NGQ Assets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${helveticaNowDisplay.variable} h-full`}>
      <body className="font-sans antialiased min-h-full flex flex-col">{children}</body>
    </html>
  );
}
