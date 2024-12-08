import type { Viewport } from "next";
import { Rubik } from "next/font/google";
import React from "react";
import "./globals.css";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { Provider } from "@/components/ui/provider";
import Head from "next/head";
import Script from "next/script";

const rubik = Rubik({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <Head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {
                  if (document.scripts[j].src === r) { return; }
              }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(99068849, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true,
                  ecommerce:"dataLayer"
              });
            `,
          }}
        ></script>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/99068849" style={{ position: "absolute", left: "-9999px" }} alt="" />
          </div>
        </noscript>
      </Head>
      <Script src="//code.jivo.ru/widget/511v5r3ek7" async />
      <body className={rubik.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
