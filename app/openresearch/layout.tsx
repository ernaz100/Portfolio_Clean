import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Open research",
  robots: { index: false, follow: false },
};

export default function OpenResearchLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
