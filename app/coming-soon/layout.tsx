import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming Soon",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
