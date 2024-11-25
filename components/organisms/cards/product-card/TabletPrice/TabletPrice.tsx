import Text from "@/components/atoms/Text/Text";
import { TabletPriceProps } from "./TabletPrice.types";

export const TabletPrice = ({ newPrice, price, discountPercent }: TabletPriceProps) => (
  <span className={"w-full hidden md:flex flex-row items-baseline gap-3"}>
    <Text className={"xl:text-[22px] lg:text-[20px] font-semibold text-link-blue"} text={newPrice.toFixed(2) + " ₽"} />
    {discountPercent !== 0 ? (
      <Text className={"xl:text-base lg:text-sm text-text-gray line-through"} text={price.toFixed(2) + " ₽"} />
    ) : null}
  </span>
);
