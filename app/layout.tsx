import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { BaseLayout } from "@/components/layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "miniCRM – Telegram Mini App",
  description: "Base shell for the miniCRM Telegram Mini App."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" data-mode="dark">
      <body
        className={cn(
          "min-h-screen bg-telegram-surface text-white antialiased",
          inter.variable
        )}
      >
        <BaseLayout>
          {children}
        </BaseLayout>
      </body>
    </html>
  );
}