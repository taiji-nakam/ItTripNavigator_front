import React from 'react';
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from '../components/Header';

// Geist Sansフォントの設定
const geist = Geist({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "IT Trip Navigator",
  description: "デジタル変革を簡単に、早く、正確に",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={geist.className}>
      <body className="bg-gray-100 min-h-screen">
        <Header />
        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}