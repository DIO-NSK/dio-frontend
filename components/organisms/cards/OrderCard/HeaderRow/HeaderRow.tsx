"use client";

import Text from "@/components/atoms/Text/Text";
import { IfRenderBlock } from "@/components/wrappers/IfRenderBlock/IfRenderBlock";
import { useDiscount } from "@/utlis/hooks/product/useDiscount";
import useBreakpoint from "@/utlis/hooks/useBreakpoint";
import { OrderCardBlockProps } from "../OrderCard.types";

export const HeaderRow = ({ order }: OrderCardBlockProps) => {
  const breakpoint = useBreakpoint();
  const totalPrice = order.items.reduce((acc, item) => {
    const [_, newPrice] = useDiscount(item.price, item.discountPercent);

    return acc + newPrice * item.quantity;
  }, 0);

  const isTabletBreakpoint = breakpoint === "md" || breakpoint === "lg";

  return (
    <div className={"w-full flex flex-row items-center justify-between border-b-2 border-light-gray pb-5"}>
      <div className={"flex flex-col gap-1 md:flex-row sm:items-baseline md:gap-4"}>
        <Text text={`Заказ #${order.id}`} className={"text-base md:text-[20px] font-medium"} />
        <span className={"flex flex-row items-center gap-2"}>
          <Text text={order.status} className={"text-sm md:text-base text-text-gray"} />
          <IfRenderBlock condition={isTabletBreakpoint}>
            <div className={"rounded-full size-[4px] bg-text-gray"} />
            <Text className={"text-sm md:text-base text-text-gray"} text={`${order.items.length} шт.`} />
          </IfRenderBlock>
        </span>
      </div>
      <Text text={`${totalPrice.toFixed(2)} ₽`} className={"text-xl md:text-[24px] font-medium text-link-blue"} />
    </div>
  );
};
