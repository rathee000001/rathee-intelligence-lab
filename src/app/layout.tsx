import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Praveen Rathee | Rathee Intelligence Lab",
  description:
    "Portfolio platform for supply chain analytics, forecasting, operations intelligence, and AI-assisted decision systems."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}