import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Calculators",
  description: "Use our comprehensive suite of financial calculators for SIP, Lumpsum, Retirement planning, FD, RD, and more to plan your financial future.",
};

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
