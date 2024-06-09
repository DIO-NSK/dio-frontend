'use client'

import {useBuyButton} from "@/utlis/hooks/product/useBuyButton";
import {SaleDetails} from "@/app/(customer)/(site)/(inner-pages)/sales/[saleId]/model";
import StickyCardWrapper from "@/components/wrappers/sticky-card-wrapper/StickyCardWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import {FiCheck} from "react-icons/fi";
import React, {useMemo} from "react";

const SalePriceCard = ({saleId, sale}: { saleId: number, sale: SaleDetails }) => {

    const [isInCart, onBuyClick] = useBuyButton(false, saleId, true)

    const totalProducts = useMemo(() => {
        return sale?.products.reduce((acc, item) => acc + (item as any).quantity, 0)
    }, [sale])

    return (
        <StickyCardWrapper startCol={"col-start-10"}>
            <div className={"w-full flex flex-row items-baseline justify-between pb-5 border-b-2 border-light-gray"}>
                <Text text={"Товаров в акции"}/>
                <Text text={`${totalProducts} шт.`}/>
            </div>
            <div className={"w-full flex flex-row items-baseline justify-between pb-5 border-b-2 border-light-gray"}>
                <Text text={"Итого"}/>
                <Text text={`${(sale as any).price} ₽`} className={"text-link-blue font-medium text-xl"}/>
            </div>
            <Button
                icon={isInCart ? <FiCheck className={"stroke-[3px]"}/> : null}
                text={isInCart ? "В корзине" : "В корзину"}
                buttonType={isInCart ? "PRIMARY" : "SECONDARY"}
                onClick={onBuyClick}
            />
        </StickyCardWrapper>
    )
}

export default SalePriceCard;