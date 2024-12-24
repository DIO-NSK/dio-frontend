"use client";

import { LinkedImage } from "@/components/organisms/cards/ShoppingCartProductCard/LinkedImage/LinkedImage";
import { ShoppingCartProductCardProps } from "@/components/organisms/cards/ShoppingCartProductCard/ShoppingCartProductCard.types";
import { IfRenderBlock } from "@/components/wrappers/IfRenderBlock/IfRenderBlock";
import { cn } from "@/utlis/cn";
import { useOldBreakpoint } from "@/utlis/hooks/useBreakpoint";
import { HeaderRow } from "./HeaderRow/HeaderRow";
import { MobileHeaderRow } from "./MobileHeaderRow/MobileHeaderRow";
import { Column } from "./ShoppingCartProductCard.styles";

const ShoppingCartProductCard = (props: ShoppingCartProductCardProps) => {
  const breakpoint = useOldBreakpoint();

  const isSmallScreen = breakpoint === "sm" || breakpoint === "init";
  const isNotSmallScreen = breakpoint !== "sm";

  return (
    <div className={cn("w-full flex flex-row gap-4 md:gap-5", props.className)}>
      <LinkedImage {...props} />
      <Column>
        <IfRenderBlock condition={isNotSmallScreen}>
          <HeaderRow {...props} />
        </IfRenderBlock>
        <IfRenderBlock condition={isSmallScreen}>
          <MobileHeaderRow {...props} />
        </IfRenderBlock>
      </Column>
    </div>
  );
};

export default ShoppingCartProductCard;
