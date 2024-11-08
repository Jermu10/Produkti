import type { Metadata } from "next";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import ToastProvider from "@/components/ToastProvider";

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
          <ToastProvider>
            <div className="relative min-h-screen">{children}</div>
          </ToastProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
