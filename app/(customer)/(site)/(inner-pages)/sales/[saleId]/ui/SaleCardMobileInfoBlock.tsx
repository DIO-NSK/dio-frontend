'use client'

import MobileCartInfoBlock from "@/components/mobile/organisms/mobile-cart-info-block/MobileCartInfoBlock";
import React, {useMemo} from "react";
import {useBuyButton} from "@/utlis/hooks/product/useBuyButton";
import {SaleDetails} from "@/app/(customer)/(site)/(inner-pages)/sales/[saleId]/model";

const SaleCardMobileInfoBlock = ({saleId, sale}: { saleId: number, sale: SaleDetails }) => {

    const [isInCart, onBuyClick] = useBuyButton(false, saleId, true)

    const totalProducts = useMemo(() => {
        return sale?.products.reduce((acc, item) => acc + (item as any).quantity, 0)
    }, [sale])

    const infoBlockData = [
        {
            header: "Товаров в акции",
            description: `${totalProducts} шт.`
        },
        {
            header: "Стоимость",
            description: (sale as any)?.price,
            className: "text-link-blue font-medium text-lg"
        },
    ]

    return (
        <div className={"w-full p-5"}>
            <MobileCartInfoBlock
                className={'hidden sm:flex'}
                infoBlockData={infoBlockData}
                buttonText={isInCart ? "В корзине" : "В корзину"}
                //@ts-ignore
                onSubmit={onBuyClick}
            />
        </div>
    );
};

export default SaleCardMobileInfoBlock;
