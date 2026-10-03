import { AuthProvider } from "@/lib/AuthContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard — Mohammed Shimak Portfolio",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
