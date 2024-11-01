import type { Viewport } from 'next';
import { Rubik } from 'next/font/google';
import React from "react";
import './globals.css';

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const rubik = Rubik({ subsets: ['latin'] })

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

export default function RootLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <html lang="ru" suppressHydrationWarning>
            <body className={rubik.className}>
                {children}
            </body>
        </html>
    )
}