import type {Metadata, Viewport} from 'next'
import {Rubik} from 'next/font/google'
import './globals.css'
import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PrimeReactProvider from "@/components/providers/PrimeReactProvider";

const rubik = Rubik({subsets: ['latin']})

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

export const metadata: Metadata = {
    title: 'DIO — доставка питьевой воды по Новосибирску и области',
}

export default function RootLayout({children}: {
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


