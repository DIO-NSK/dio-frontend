"use client";

import { SaleDetails } from "@/app/(customer)/(site)/(inner-pages)/sales/[saleUrlMask]/model";
import MobileCartInfoBlock from "@/components/mobile/organisms/mobile-cart-info-block/MobileCartInfoBlock";
import { useBuyButton } from "@/utlis/hooks/product/useBuyButton";
import { useMemo } from "react";

export const SaleCardMobileInfoBlock = ({ saleId, sale }: { saleId: number; sale: SaleDetails }) => {
  const totalProducts = useMemo(() => sale?.products.reduce((acc, item) => acc + (item as any).quantity, 0), [sale]);
  const [isInCart, onBuyClick] = useBuyButton(false, saleId, true);

  const infoBlockData = [
    {
      header: "Товаров в акции",
      description: `${totalProducts} шт.`,
    },
    {
      header: "Стоимость",
      description: (sale as any)?.price,
      className: "text-link-blue font-medium text-lg",
    },
  ];

  return (
    <div className={"w-full p-5"}>
      <MobileCartInfoBlock
        buttonText={isInCart ? "В корзине" : "В корзину"}
        infoBlockData={infoBlockData}
        onSubmit={onBuyClick as any}
      />
    </div>
  );
};
