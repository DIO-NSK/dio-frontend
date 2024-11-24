import Text from "@/components/atoms/text/text-base/Text";
import { TabletPriceProps } from "../ProductCard.types";

export const MobilePrice = ({ newPrice, price, discountPercent }: TabletPriceProps) => (
  <span className={"md:hidden flex flex-col gap-[2px]"}>
    {discountPercent !== 0 && (
      <Text className={"text-[14px] text-text-gray line-through"} text={price.toFixed(2) + " ₽"} />
    )}
    <Text className={"text-[18px] font-semibold text-link-blue"} text={newPrice.toFixed(2) + " ₽"} />
  </span>
);
