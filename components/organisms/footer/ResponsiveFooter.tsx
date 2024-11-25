"use client";

import { useOldBreakpoint } from "@/utlis/hooks/useBreakpoint";
import { HorizontalTabletFooter } from "./HorizontalTabletFooter/HorizontalTabletFooter";
import { LaptopFooter } from "./LaptopFooter/LaptopFooter";
import { MobileFooter } from "./MobileFooter/MobileFooter";
import { VerticalTabletFooter } from "./VerticalTabletFooter/VerticalTabletFooter";

export const ResponsiveFooter = () => {
  const breakpoint = useOldBreakpoint();

  if (breakpoint === "init" || breakpoint === "sm") {
    return <MobileFooter />;
  }

  if (breakpoint === "md") {
    return <VerticalTabletFooter />;
  }

  if (breakpoint === "lg") {
    return <HorizontalTabletFooter />;
  }

  return <LaptopFooter />;
};
