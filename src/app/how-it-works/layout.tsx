import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works — Order Lab Tests in 4 Simple Steps | TestWell",
  description:
    "Order lab tests online, get physician approval, walk into Quest or Labcorp, and receive results in days. No doctor visit, no insurance needed. Available in Florida & Texas.",
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
