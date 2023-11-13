import type { Metadata } from 'next'
import {Rubik} from 'next/font/google'
import './globals.css'
import React from "react";
import Navbar from "@/components/organisms/bars/navbar/Navbar";
import Searchbar from "@/components/organisms/bars/searchbar/Searchbar";
import Footer from "@/components/organisms/footer/Footer";

const rubik = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DIO — доставка питьевой воды по Новосибирску и области',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={rubik.className}>
      <Navbar />
      <Searchbar />
      {children}
      <Footer />
      </body>
    </html>
  )
}
