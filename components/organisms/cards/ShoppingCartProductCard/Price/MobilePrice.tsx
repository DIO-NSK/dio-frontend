import Text from "@/components/atoms/Text/Text";
import { IfRenderBlock } from "@/components/wrappers/IfRenderBlock/IfRenderBlock";
import { PriceProps } from "./Price.types";

export const MobilePrice = ({ price, newPrice, amount, discountPercent }: PriceProps) => (
  <div className="flex flex-row items-baseline gap-2">
    <Text className="text-lg text-link-blue font-semibold">{(newPrice * amount).toFixed(2) + " ₽"}</Text>
    <IfRenderBlock condition={discountPercent !== 0}>
      <Text className="text-text-gray line-through">{(price * amount).toFixed(2) + " ₽"}</Text>
    </IfRenderBlock>
  </div>
);
