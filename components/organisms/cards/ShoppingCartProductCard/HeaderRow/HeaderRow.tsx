import Chip from "@/components/atoms/chip/Chip";
import Text from "@/components/atoms/Text/Text";
import { CounterRow } from "@/components/organisms/cards/ShoppingCartProductCard/CounterRow/CounterRow";
import { Price } from "@/components/organisms/cards/ShoppingCartProductCard/Price/Price";
import { ShoppingCartProductCardProps } from "@/components/organisms/cards/ShoppingCartProductCard/ShoppingCartProductCard.types";
import { IfRenderBlock } from "@/components/wrappers/IfRenderBlock/IfRenderBlock";
import { cn } from "@/utlis/cn";
import { useCounter } from "@/utlis/hooks/product/useCounter";
import { useDiscount } from "@/utlis/hooks/product/useDiscount";
import useBreakpoint from "@/utlis/hooks/useBreakpoint";
import { headerRowCN, Row } from "./HeaderRow.styles";

export const HeaderRow = ({ canInteract = true, isOrder = false, card }: ShoppingCartProductCardProps) => {
  const { productId, quantity, discountPercent, inStock, price: productPrice, name } = card;

  const [amount, increase, decrease] = useCounter(productId, quantity);
  const [price, newPrice] = useDiscount(productPrice, discountPercent);
  const breakpoint = useBreakpoint();

  const isLargeScreen = breakpoint === "xl";

  return (
    <div className={cn(headerRowCN)}>
      <div className="flex flex-col gap-2">
        <IfRenderBlock condition={!isOrder && !inStock}>
          <Chip className="bg-gray-100">
            <Text className="text-xs uppercase text-text-gray">Нет в наличии</Text>
          </Chip>
        </IfRenderBlock>
        <IfRenderBlock condition={!isLargeScreen}>
          <Price price={price} newPrice={newPrice} amount={amount} discountPercent={discountPercent} />
        </IfRenderBlock>
        <Text className="max-w-[400px] text-base font-medium">{name}</Text>
      </div>
      <Row>
        <CounterRow canInteract={canInteract} onIncrease={increase} onDecrease={decrease} amount={amount} card={card} />
        <IfRenderBlock condition={isLargeScreen}>
          <Price price={price} newPrice={newPrice} amount={amount} discountPercent={card.discountPercent} />
        </IfRenderBlock>
      </Row>
    </div>
  );
};
