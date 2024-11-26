"use client";

import { useOldBreakpoint } from "@/utlis/hooks/useBreakpoint";
import { PropsWithChildren } from "react";
import { LaptopContainer } from "./LaptopContainer";
import { MobileContainer } from "./MobileContainer";

export const Container = ({ children }: PropsWithChildren) => {
  const breakpoint = useOldBreakpoint();
  const isMobile = ["sm", "md", "init"].includes(breakpoint);

  if (isMobile) {
    return <MobileContainer>{children}</MobileContainer>;
  }

  return <LaptopContainer>{children}</LaptopContainer>;
};
