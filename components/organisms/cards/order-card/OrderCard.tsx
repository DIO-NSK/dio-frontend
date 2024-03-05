import React, {useState} from 'react';
import {OrderCardProps} from "@/types/props/OrderCard";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";
import {convertStatusToText} from "@/utlis/convertStatusToText";
import {HeaderDescription} from "@/types/dto/text";
import IconTextButton from "@/components/atoms/buttons/icon-text-button/IconTextButton";
import {FiRefreshCw} from "react-icons/fi";
import Button from "@/components/atoms/buttons/button/Button";
import ChevronButton from "@/components/atoms/buttons/chevron-button/ChevronButton";
import {mockShoppingCartProducts} from "@/data/shoppingCartProducts";
import ShoppingCartGroupWrapper from "@/components/wrappers/shopping-cart-group-wrapper/ShoppingCartGroupWrapper";
import {ShoppingCartServiceCardDTO} from "@/types/dto/admin/cards/ServiceCard";
import ShoppingCartServiceCard from "@/components/organisms/cards/shopping-cart-service-card/ShoppingCartServiceCard";
import ShoppingCartProductCard from "@/components/organisms/cards/shopping-cart-product-card/ShoppingCartProductCard";
import {ShoppingCartProductCardDTO} from "@/types/dto/admin/cards/ProductCard";
import {Order} from "@/types/dto/Order";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";

const HeaderRow = ({order}: { order: Order }) => {

    const orderStatus = convertStatusToText(order.status)

    return (
        <div className={"w-full flex flex-row items-center justify-between border-b-2 border-light-gray pb-5"}>
            <div className={"flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4"}>
                <Text text={`Заказ #${order.orderId}`} className={"text-base sm:text-[20px] font-medium"}/>
                <Text text={orderStatus} className={"text-sm sm:text-base text-text-gray"}/>
            </div>
            <Text
                text={`${order.totalPrice} ₽`}
                className={"text-xl sm:text-[24px] font-medium text-link-blue"}
            />
        </div>
    )

}

const InformationBlock = ({order}: { order: Order }) => {

    const itemCV: ClassValue[] = [
        "w-full sm:col-span-1 flex flex-row items-baseline justify-between",
        "pb-5 border-b-2 border-light-gray"
    ]

    const informationGridData: HeaderDescription[] = [
        {header: "Количество товаров", description: `${order.products.length} шт.`},
        {header: "Адрес доставки", description: order.address},
        {header: "Дата доставки", description: order.deliveryDate},
        {header: "Время доставки", description: order.deliveryTime},
    ]

    return (
        <div className={"w-full flex flex-col sm:grid grid-cols-2 gap-5"}>

            <div className={"sm:hidden w-full flex flex-col gap-1 border-b-2 border-light-gray pb-5"}>
                <Text text={"Адрес доставки"} className={"text-text-gray"}/>
                <Text text={order.address}/>
            </div>

            {
                informationGridData.map((item, key) => {

                        const addressCV = {"hidden sm:flex": key === 1}

                        return (
                            <div className={cn(itemCV, addressCV)} key={key}>
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

const Footer = ({canRepeat, isOpen, setOpen}: {
    canRepeat: boolean,
    isOpen: boolean,
    setOpen: (isOpen: boolean) => void
}) => {

    const handleOpenState = () => setOpen(!isOpen)
    const handleRepeatOrder = () => console.log("Repeated")

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
                canRepeat && <>
                    <Button
                        classNames={{button: "hidden sm:flex"}}
                        text={"Повторить заказ"}
                        icon={<FiRefreshCw size={"18px"}/>}
                        buttonType={"SECONDARY"}
                        onClick={handleRepeatOrder}
                        size={"sm"}
                    />
                    <TextButton
                        onClick={handleRepeatOrder}
                        text={"Повторить заказ"}
                        className={"sm:hidden"}
                    />
                </>
            }
        </div>
    )
}

const Content = () => {
    return (
        <div className={"w-full flex flex-col gap-5 py-5 sm:gap-10"}>
            {
                mockShoppingCartProducts.map((group) =>
                    <ShoppingCartGroupWrapper className={"p-0 border-0 sm:p-5 sm:border-2"}>
                        {
                            group.items.map((item) =>
                                (
                                    item as ShoppingCartServiceCardDTO).description
                                    ? <ShoppingCartServiceCard card={item as ShoppingCartServiceCardDTO}/>
                                    : <ShoppingCartProductCard
                                        canInteract={false}
                                        card={item as ShoppingCartProductCardDTO}
                                    />
                            )
                        }
                    </ShoppingCartGroupWrapper>)
            }
        </div>
    )
}

const OrderCard = ({canRepeat = true, theme = "outlined", ...props}: OrderCardProps) => {

    const [isOpen, setOpen] = useState<boolean>(false)

    const wrapperCV: ClassValue[] = [
        "w-full flex flex-col gap-5 p-5 sm:p-7 rounded-xl",
        {"border-2 border-light-gray": theme == "outlined"},
        {"bg-bg-light-blue": theme == "filled"}
    ]

    return (
        <div className={cn(wrapperCV)}>
            <OrderCard.HeaderRow {...props} />
            <OrderCard.InformationBlock {...props} />
            {isOpen && <OrderCard.Content/>}
            <OrderCard.Footer isOpen={isOpen} setOpen={setOpen} canRepeat={canRepeat}/>
        </div>
    );

};

OrderCard.HeaderRow = HeaderRow
OrderCard.InformationBlock = InformationBlock
OrderCard.Content = Content
OrderCard.Footer = Footer

export default OrderCard;
