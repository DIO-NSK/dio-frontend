import Text from "@/components/atoms/Text/Text";
import Button from "@/components/atoms/buttons/button/Button";
import StickyCardWrapper from "@/components/wrappers/sticky-card-wrapper/StickyCardWrapper";
import { cn } from "@/utlis/cn";
import { HStack } from "@chakra-ui/react";
import { PriceList } from "./PriceList/PriceList";
import { useTotalPriceCard } from "./TotalPriceCard.hooks";
import { TotalPriceCardProps } from "./TotalPriceCard.types";

const wrapperStyles = ["md:col-start-9 md:col-span-4 md:p-5 md:gap-4 xl:gap-5", "xl:p-7 xl:col-start-10 xl:col-span-3"];

export const TotalPriceCard = ({ buttonText, onClick, products, promos }: TotalPriceCardProps) => {
  const { cardRows, isValidCart, hasItemInStock, totalActualPrice } = useTotalPriceCard({ products, promos });

  return (
    <StickyCardWrapper startCol={cn(wrapperStyles)}>
      <PriceList items={cardRows} />
      <HStack alignItems="baseline" justifyContent="space-between" w="full">
        <Text className="text-base text-text-gray">Итого</Text>
        <Text className="text-[24px] font-medium text-link-blue">{`${totalActualPrice.toFixed(2)} ₽`}</Text>
      </HStack>
      {!isValidCart ? (
        <Text className="text-text-gray text-sm pt-5 border-t-2 border-light-gray">
          Стоимость заказа должна быть от 800₽ или заказ должен содержать минимум две 19-ти литровые воды.
        </Text>
      ) : null}
      <Button hasSpinner={false} disabled={!(hasItemInStock || isValidCart)} onClick={onClick}>
        {buttonText}
      </Button>
    </StickyCardWrapper>
  );
};
