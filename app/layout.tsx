import type {Metadata} from 'next'
import {Rubik} from 'next/font/google'
import './globals.css'
import React from "react";

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
      {children}
      </body>
    </html>
  )
}
