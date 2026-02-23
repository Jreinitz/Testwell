import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lab Tests — Browse Affordable Blood Tests | TestWell",
  description:
    "Browse 100+ affordable, physician-reviewed lab tests. Search by category, compare pricing vs hospitals, and order online. Results in 1-3 days at Quest and Labcorp.",
};

export default function TestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
