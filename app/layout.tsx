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
  const isMaintenanceMode = true; // Set to true to hide the site behind a maintenance screen

  if (isMaintenanceMode) {
    return (
      <html lang="en" className={`${helveticaNowDisplay.variable} h-full`}>
        <body className="font-sans antialiased min-h-screen flex items-center justify-center bg-[#F9FAFB] text-gray-900">
          <div className="text-center p-8 max-w-md mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <svg className="w-16 h-16 mx-auto mb-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h1 className="text-2xl font-bold mb-3 tracking-snug text-gray-800">Site Under Maintenance</h1>
            <p className="text-gray-500 mb-8 leading-relaxed text-sm">
              We are currently performing routine maintenance and server upgrades. The platform will be temporarily unavailable.
            </p>
            <div className="text-xs font-semibold text-gray-400 bg-gray-50 py-3 rounded-xl border border-gray-100">
              ERR_CODE: 503_SERVICE_UNAVAILABLE
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={`${helveticaNowDisplay.variable} h-full`}>
      <body className="font-sans antialiased min-h-full flex flex-col">{children}</body>
    </html>
  );
}
