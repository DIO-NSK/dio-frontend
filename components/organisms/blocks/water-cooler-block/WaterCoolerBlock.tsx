"use client";

import { useOldBreakpoint } from "@/utlis/hooks/useBreakpoint";
import { DesktopWaterCoolerBlock } from "./DesktopWaterCoolerBlock/DesktopWaterCoolerBlock";
import { MobileWaterCoolerBlock } from "./MobileWaterCoolerBlock/MobileWaterCoolerBlock";

const WaterCoolerBlock = () => {
  const breakpoint = useOldBreakpoint();

  if (breakpoint === "sm") {
    return <MobileWaterCoolerBlock />;
  } else if (["xl", "2xl"].includes(breakpoint)) {
    return <DesktopWaterCoolerBlock />;
  }
};

export default WaterCoolerBlock;
