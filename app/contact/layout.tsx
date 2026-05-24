import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Connect with FINZAVIO to better understand your financial position, review your financial wellness, and discuss your financial goals.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
