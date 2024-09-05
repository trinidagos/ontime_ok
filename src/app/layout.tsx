import type { Metadata } from "next";
import Header from '../components/header';
import "./globals.css";

export const metadata: Metadata = {
  title: "OnTime",
  description: "aplicacion de almuerzo rapido",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}