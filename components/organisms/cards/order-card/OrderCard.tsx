import React, {useState} from 'react';
import {OrderCardProps} from "@/types/props/OrderCard";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";
import {HeaderDescription} from "@/types/dto/text";
import IconTextButton from "@/components/atoms/buttons/icon-text-button/IconTextButton";
import {FiRefreshCw} from "react-icons/fi";
import Button from "@/components/atoms/buttons/button/Button";
import ChevronButton from "@/components/atoms/buttons/chevron-button/ChevronButton";
import ShoppingCartProductCard from "@/components/organisms/cards/shopping-cart-product-card/ShoppingCartProductCard";
import {ResponseProfileOrder} from "@/types/dto/user/order/ResponseProfileOrder";
import {ResponseCartItem} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import {useUnit} from "effector-react";
import {selectOrderToRepeatEvent} from "@/app/(customer)/profile/orders/model";
import {useRouter} from "next/navigation";
import {useDiscount} from "@/utlis/hooks/product/useDiscount";
import useBreakpoint from "@/utlis/hooks/useBreakpoint";

const HeaderRow = ({order}: { order: ResponseProfileOrder }) => {
    const breakpoint = useBreakpoint();
    const totalPrice = order.items.reduce((acc, item) => {
        const [_, newPrice] = useDiscount(item.price, item.discountPercent);

        return acc + newPrice * item.quantity;
    }, 0)

    return (
        <div className={"w-full flex flex-row items-center justify-between border-b-2 border-light-gray pb-5"}>
            <div className={"flex flex-col gap-1 md:flex-row sm:items-baseline md:gap-4"}>
                <Text text={`Заказ #${order.id}`} className={"text-base md:text-[20px] font-medium"}/>
                <span className={'flex flex-row items-center gap-2'}>
                    <Text text={order.status} className={"text-sm md:text-base text-text-gray"}/>
                    {
                        breakpoint === 'md' || breakpoint === 'lg' ? (
                            <>
                                <div className={'rounded-full size-[4px] bg-text-gray'}/>
                                <Text
                                    className={"text-sm md:text-base text-text-gray"}
                                    text={`${order.items.length} шт.`}
                                />
                            </>
                        ) : null
                    }
                </span>
            </div>
            <Text
                text={`${totalPrice.toFixed(2)} ₽`}
                className={"text-xl md:text-[24px] font-medium text-link-blue"}
            />
        </div>
    )

}

const itemCV: ClassValue[] = [
    "w-full md:col-span-1 flex flex-row items-baseline justify-between",
    "pb-5 border-b-2 border-light-gray"
]

const InformationBlock = ({order}: { order: ResponseProfileOrder }) => {

    const informationGridData: (HeaderDescription & {className ?: string})[] = [
        {header: "Количество товаров", description: `${order.items.length} шт.`, className : 'md:hidden xl:flex'},
        {header: "Адрес доставки", description: order.address, className : 'md:col-span-full xl:col-span-1'},
        {header: "Дата доставки", description: order.deliveryDate},
        {header: "Время доставки", description: order.deliveryTime},
    ]

    return (
        <div className={"w-full flex flex-col md:grid grid-cols-2 gap-5"}>
            <div className={"md:hidden w-full flex flex-col gap-1 border-b-2 border-light-gray pb-5"}>
                <Text text={"Адрес доставки"} className={"text-text-gray"}/>
                <Text text={order.address}/>
            </div>
            {
                informationGridData.map((item, key) => {
                        const addressCV = {"hidden md:flex": key === 1}

                        return (
                            <div className={cn(itemCV, addressCV, item?.className)} key={key}>
                                <Text text={item.header} className={"text-text-gray"}/>
                                <Text text={item.description}/>
                            </div>
                        )
                    }
                )
            }
        </div>
    )

}

const Footer = ({canRepeat, isOpen, setOpen, order}: {
    canRepeat: boolean,
    isOpen: boolean,
    setOpen: (isOpen: boolean) => void,
    order: ResponseProfileOrder
}) => {

    const selectOrderToRepeat = useUnit(selectOrderToRepeatEvent)

    const router = useRouter()

    const handleOpenState = () => setOpen(!isOpen)

    const handleRepeatOrder = () => {
        selectOrderToRepeat(order)
        router.push('/cart/checkout')
    }

    return (
        <div className={"w-full flex flex-row items-center justify-between"}>
            <IconTextButton
                icon={
                    <ChevronButton
                        isExpanded={isOpen}
                        setExpanded={setOpen}
                    />
                }
                className={"text-text-gray"}
                text={"Подробнее"}
                onClick={handleOpenState}
                placement={"right"}
            />
            {
                canRepeat && <Button
                    classNames={{button: "p-0 bg-0 md:py-3 md:px-4 md:bg-light-gray"}}
                    text={"Повторить заказ"}
                    onClick={handleRepeatOrder}
                    icon={<FiRefreshCw size={"18px"} className={"hidden md:flex"}/>}
                    buttonType={"SECONDARY"}
                    size={"sm"}
                />
            }
        </div>
    )
}

const Content = ({order}: { order: ResponseProfileOrder }) => {
    return (
        <div className={"w-full flex flex-col gap-5 py-5 md:gap-10"}>
            {
                order.items.map((product, productKey) =>
                    <ShoppingCartProductCard
                        card={product as unknown as ResponseCartItem}
                        canInteract={false} key={productKey}
                    />
                )
            }
        </div>
    )
}

const OrderCard = React.memo(({canRepeat = true, theme = "outlined", ...props}: OrderCardProps) => {

    const [isOpen, setOpen] = useState<boolean>(false)

    const wrapperCV: ClassValue[] = [
        "w-full flex flex-col gap-5 p-5 md:p-7 rounded-xl",
        {"border-2 border-light-gray": theme == "outlined"},
        {"bg-bg-light-blue": theme == "filled"}
    ]

    return (
        <div className={cn(wrapperCV)}>
            <HeaderRow {...props} />
            <InformationBlock {...props} />
            {isOpen && <Content {...props}/>}
            <Footer
                order={props.order}
                isOpen={isOpen}
                setOpen={setOpen}
                canRepeat={canRepeat}
            />
        </div>
    );

});

export default OrderCard;
