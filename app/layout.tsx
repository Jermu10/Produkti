import type { Metadata } from "next";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import CustomNavbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Drinkkilinkki",
  description: "Ilmaisia drinkki reseptejä",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextUIProvider>
          <div className="relative min-h-screen">{children}</div>
        </NextUIProvider>
      </body>
    </html>
  );
}
