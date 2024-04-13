import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import { Header } from "../components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paytm - Wallet",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
