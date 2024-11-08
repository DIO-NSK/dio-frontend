import type { Viewport } from 'next';
import { Rubik } from 'next/font/google';
import React from "react";
import './globals.css';

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { Provider } from "@/components/ui/provider";
import Script from 'next/script';

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
            <Script src="//code.jivo.ru/widget/511v5r3ek7" async />
            <body className={rubik.className}>
                <Provider>
                    {children}
                </Provider>
            </body>
        </html>
    )
}