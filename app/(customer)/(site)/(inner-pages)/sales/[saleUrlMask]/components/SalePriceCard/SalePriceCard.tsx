"use client";

import { SaleDetails } from "@/app/(customer)/(site)/(inner-pages)/sales/[saleUrlMask]/model";
import Text from "@/components/atoms/Text/Text";
import Button from "@/components/atoms/buttons/button/Button";
import StickyCardWrapper from "@/components/wrappers/sticky-card-wrapper/StickyCardWrapper";
import { cn } from "@/utlis/cn";
import { useBuyButton } from "@/utlis/hooks/product/useBuyButton";
import { useMemo } from "react";
import { FiCheck } from "react-icons/fi";
import { wrapperCN } from "./SalePriceCard.styles";

export const SalePriceCard = ({ saleId, sale }: { saleId: number; sale: SaleDetails }) => {
  const totalProducts = useMemo(() => sale?.products.reduce((acc, item) => acc + (item as any).quantity, 0), [sale]);
  const [isInCart, onBuyClick] = useBuyButton(false, saleId, true);

  return (
    <StickyCardWrapper startCol={cn(wrapperCN)}>
      <div className={"w-full flex flex-row items-baseline justify-between pb-5 border-b-2 border-light-gray"}>
        <Text>Товаров в акции</Text>
        <Text>{`${totalProducts} шт.`}</Text>
      </div>
      <div className="w-full flex flex-row items-baseline justify-between pb-5 border-b-2 border-light-gray">
        <Text>Итого</Text>
        <Text className="text-link-blue font-medium text-xl">{`${(sale as any).price} ₽`}</Text>
      </div>
      <Button
        icon={isInCart ? <FiCheck className={"stroke-[3px]"} /> : null}
        buttonType={isInCart ? "PRIMARY" : "SECONDARY"}
        text={isInCart ? "В корзине" : "В корзину"}
        onClick={onBuyClick}
      />
    </StickyCardWrapper>
  );
};
