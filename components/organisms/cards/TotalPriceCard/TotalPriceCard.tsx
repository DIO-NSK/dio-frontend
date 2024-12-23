import Text from "@/components/atoms/Text/Text";
import Button from "@/components/atoms/buttons/button/Button";
import { IfRenderBlock } from "@/components/wrappers/IfRenderBlock/IfRenderBlock";
import StickyCardWrapper from "@/components/wrappers/sticky-card-wrapper/StickyCardWrapper";
import { cn } from "@/utlis/cn";
import { HStack } from "@chakra-ui/react";
import { PriceList } from "./PriceList/PriceList";
import { useTotalPriceCard } from "./TotalPriceCard.hooks";
import { wrapperStyles } from "./TotalPriceCard.styles";
import { TotalPriceCardProps } from "./TotalPriceCard.types";

export const TotalPriceCard = ({
  shouldRestrict = true,
  buttonText,
  onClick,
  products,
  promos,
}: TotalPriceCardProps) => {
  const { cardRows, isValidCart, hasItemInStock, totalActualPrice } = useTotalPriceCard({ products, promos });
  const disabled = shouldRestrict && !(hasItemInStock || isValidCart);
  const shouldRenderRestrictText = shouldRestrict && !isValidCart;

  return (
    <StickyCardWrapper startCol={cn(wrapperStyles)}>
      <PriceList items={cardRows} />
      <HStack alignItems="baseline" justifyContent="space-between" w="full">
        <Text className="text-base text-text-gray">Итого</Text>
        <Text className="text-[24px] font-medium text-link-blue">{`${totalActualPrice.toFixed(2)} ₽`}</Text>
      </HStack>
      <IfRenderBlock condition={shouldRenderRestrictText}>
        <Text className="text-text-gray text-sm pt-5 border-t-2 border-light-gray">
          Стоимость заказа должна быть от 800₽ или заказ должен содержать минимум две 19-ти литровые воды.
        </Text>
      </IfRenderBlock>
      <Button hasSpinner={false} disabled={disabled} onClick={onClick}>
        {buttonText}
      </Button>
    </StickyCardWrapper>
  );
};
