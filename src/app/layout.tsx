import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import { CommonProvider } from "../../contexts/commonContext";
import Header from "../components/Header";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = GeistMono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "IT Trip Navigator",
  description: "事例検索アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <CommonProvider>
          <Header />
          <main>{children}</main>
        </CommonProvider>
      </body>
    </html>
  );
}
