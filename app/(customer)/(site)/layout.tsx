"use client";

import MobileNavbar from "@/components/mobile/moleculas/bars/navbar/MobileNavbar";
import { ActionBar } from "@/components/organisms/action-bar/ActionBar";
import { Footer } from "@/components/organisms/footer/Footer";
import { BREAKPOINT_MOBILE } from "@/constants";
import React from "react";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < BREAKPOINT_MOBILE;

  return (
    <React.Fragment>
      <section className={"w-full flex flex-col gap-7 md:gap-0"}>
        <MobileNavbar />
        <div className={"w-full flex flex-col gap-7 lg:hidden"}>{isMobile ? children : null}</div>
        <div className={"hidden w-full min-h-screen lg:flex flex-col gap-7 md:gap-0"}>
          {!isMobile ? children : null}
        </div>
        <ActionBar />
      </section>
      <Footer />
    </React.Fragment>
  );
};

export default SiteLayout;
