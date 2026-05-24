import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about FINZAVIO, our mission, vision, trust pillars, and the expert founders behind our financial clarity platform.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
