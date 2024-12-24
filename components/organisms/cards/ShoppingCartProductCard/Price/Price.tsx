import Text from "@/components/atoms/Text/Text";
import { PriceProps } from "@/components/organisms/cards/ShoppingCartProductCard/Price/Price.types";

export const Price = ({ price, newPrice, amount, discountPercent }: PriceProps) => (
  <div className={"w-fit flex md:flex-row md:items-baseline md:gap-1 xl:flex-col xl:items-end xl:gap-0"}>
    <Text
      text={`${(newPrice * amount).toFixed(2)} ₽`}
      className={"whitespace-nowrap md:text-[20px] md:text-link-blue xl:text-[22px] xl:text-black font-medium"}
    />
    {discountPercent !== 0 ? (
      <Text text={`${(price * amount).toFixed(2)} ₽`} className={"whitespace-nowrap text-text-gray line-through"} />
    ) : null}
  </div>
);
