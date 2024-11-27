"use client";

import MobileSliderWrapper from "@/components/mobile/wrappers/mobile-slider-wrapper/MobileSliderWrapper";
import SliderGroup from "@/components/wrappers/SliderGroup/SliderGroup";
import { useOldBreakpoint } from "@/utlis/hooks/useBreakpoint";
import { Grid } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export const SliderWrapper = ({ children }: PropsWithChildren) => {
  const breakpoint = useOldBreakpoint();
  const isMobile = ["init", "sm", "md"].includes(breakpoint);

  if (isMobile) {
    return <MobileSliderWrapper>{children}</MobileSliderWrapper>;
  }

  return (
    <Grid columns={12} gapX="20px" gapY="30px" w="full">
      <SliderGroup>{children}</SliderGroup>
    </Grid>
  );
};
