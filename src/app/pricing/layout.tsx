import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Save Up to 90% on Lab Tests | TestWell",
  description:
    "Transparent lab test pricing with no hidden fees. Compare TestWell prices vs hospitals and Quest/Labcorp Direct. Save up to 90% on blood tests. No membership required.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
