import type { Metadata } from "next";
import React from "react";

// Auth flows have no reason to appear in search results.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
