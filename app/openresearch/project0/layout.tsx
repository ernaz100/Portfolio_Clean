import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "project0 — scene-aware ActionPlan",
  robots: { index: false, follow: false },
};

export default function OpenResearchProject0Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 overflow-hidden bg-[#f4efe6]">{children}</div>
  );
}
