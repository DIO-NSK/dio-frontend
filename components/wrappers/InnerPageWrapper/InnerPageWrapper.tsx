"use client";

import MobilePageWrapper from "@/components/mobile/wrappers/mobile-page-wrapper/MobilePageWrapper";
import { cn } from "@/utlis/cn";
import { useOldBreakpoint } from "@/utlis/hooks/useBreakpoint";
import { createWrapperStyles } from "./InnerPageWrapper.styles";
import { InnerPageWrapperProps } from "./InnerPageWrapper.types";

const InnerPageWrapper = ({ children, classNames }: InnerPageWrapperProps) => {
  const breakpoint = useOldBreakpoint();
  const isMobile = ["init", "sm", "md"].includes(breakpoint);

  if (isMobile) {
    return <MobilePageWrapper className={classNames?.mobileWrapper}>{children}</MobilePageWrapper>;
  }

  return <div className={cn(createWrapperStyles(classNames))}>{children}</div>;
};

export default InnerPageWrapper;
