import React, {useEffect} from 'react';
import {
    ResponseCartItem,
    ResponseUserCart
} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import StickyCardWrapper from "@/components/wrappers/sticky-card-wrapper/StickyCardWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import ChevronButton from "@/components/atoms/buttons/chevron-button/ChevronButton";
import {useToggle} from "@/utlis/hooks/useToggle";
import {HeaderDescription} from "@/types/dto/text";
import {useUnit} from "effector-react";
import {$orderToRepeat} from "@/app/(customer)/profile/orders/model";
import {ProfileOrderItem} from "@/types/dto/user/order/ResponseProfileOrder";

const CheckoutCardItem = ({productItem}: { productItem: ResponseCartItem | ProfileOrderItem}) => {

    const discountPrice = 0.01 * productItem.discountPercent * productItem.price
    const newPrice = discountPrice === 0 ? productItem.price : productItem.price - discountPrice

    return (
        <div className={"pt-5 w-full flex flex-col gap-1"}>
            <div className={"w-full flex flex-row items-baseline justify-between"}>
                <div className={"flex flex-row items-baseline gap-2"}>
                    <Text
                        text={`${newPrice.toFixed(2)} ₽`}
                        className={"text-link-blue font-medium"}
                    />
                    {
                        discountPrice !== 0 && <Text
                            text={`${productItem.price.toFixed(2)} ₽`}
                            className={"text-text-gray line-through text-sm"}
                        />
                    }
                </div>
                <Text
                    text={`${productItem.quantity} шт.`}
                    className={"text-text-gray text-sm"}
                />
            </div>
            <Text
                text={productItem.name}
                className={"font-medium"}
            />
        </div>
    )
}

const CheckoutCard = ({cart} : {cart : ResponseUserCart}) => {

    const orderToRepeat = useUnit($orderToRepeat)
    const expanded = useToggle(true)

    const totalDiscount = (orderToRepeat?.items ?? cart?.products)
        .reduce((acc, item) => acc + 0.01 * item.price * item.discountPercent * item.quantity, 0)
    const totalPriceWithoutDiscount = (orderToRepeat?.items ?? cart?.products)
        .reduce((acc, item) => acc + item.price * item.quantity, 0)

    const totalData: HeaderDescription[] = [
        {header: "Скидка", description: `${totalDiscount?.toFixed(2)} ₽`},
        {header: "Итого", description: `${(totalPriceWithoutDiscount - totalDiscount)?.toFixed(2)} ₽`},
    ]

    return (
        <StickyCardWrapper startCol={"col-start-10"}>
            <div className={"pb-5 flex flex-row items-center justify-between border-b-2 border-light-gray"}>
                <Text text={`Выбрано ${(orderToRepeat?.items ?? cart.products).length} шт.`}/>
                <ChevronButton isExpanded={expanded.state} setExpanded={expanded.toggleState}/>
            </div>
            {
                expanded.state && <section className={"flex -mt-5 flex-col gap-4 divide-y divide-light-gray"}>
                    {
                        (orderToRepeat?.items ?? cart.products).map((productItem, key) => (
                            <CheckoutCardItem productItem={productItem} key={key}/>
                        ))
                    }
                </section>
            }
            <div className={"flex flex-col gap-3 divide-y divide-light-gray"}>
                {
                    totalData.map((item, key) => (
                        <div className={"pt-3 flex row items-baseline justify-between"} key={key}>
                            <Text text={item.header} className={"text-text-gray"}/>
                            <Text text={item.description}/>
                        </div>
                    ))
                }
            </div>
        </StickyCardWrapper>
    );

};

export default CheckoutCard;