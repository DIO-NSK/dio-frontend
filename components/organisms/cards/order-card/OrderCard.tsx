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
import ShoppingCartProductCard from "@/components/organisms/cards/shopping-cart-product-card/ShoppingCartProductCard";
import {ResponseProfileOrder} from "@/types/dto/user/order/ResponseProfileOrder";
import {ResponseCartItem} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";

const HeaderRow = ({order}: { order: ResponseProfileOrder }) => {

    const orderStatus = convertStatusToText(order.status)

    const totalPrice = order.items.reduce((acc, item) =>
        acc + item.price * item.quantity * (1 - item.discountPercent * 0.01), 0)

    return (
        <div className={"w-full flex flex-row items-center justify-between border-b-2 border-light-gray pb-5"}>
            <div className={"flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4"}>
                <Text text={`Заказ #${order.id}`} className={"text-base sm:text-[20px] font-medium"}/>
                <Text text={orderStatus} className={"text-sm sm:text-base text-text-gray"}/>
            </div>
            <Text
                text={`${totalPrice.toFixed(2)} ₽`}
                className={"text-xl sm:text-[24px] font-medium text-link-blue"}
            />
        </div>
    )

}

const InformationBlock = ({order}: { order: ResponseProfileOrder }) => {

    const itemCV: ClassValue[] = [
        "w-full sm:col-span-1 flex flex-row items-baseline justify-between",
        "pb-5 border-b-2 border-light-gray"
    ]

    const informationGridData: HeaderDescription[] = [
        {header: "Количество товаров", description: `${order.items.length} шт.`},
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
                canRepeat && <Button
                    classNames={{button: "p-0 bg-0 sm:py-3 sm:px-4 sm:bg-light-gray"}}
                    text={"Повторить заказ"}
                    onClick={handleRepeatOrder}
                    icon={<FiRefreshCw size={"18px"} className={"hidden sm:flex"}/>}
                    buttonType={"SECONDARY"}
                    size={"sm"}
                />
            }
        </div>
    )
}

const Content = ({order}: { order: ResponseProfileOrder }) => {
    return (
        <div className={"w-full flex flex-col gap-5 py-5 sm:gap-10"}>
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
            {isOpen && <OrderCard.Content {...props}/>}
            <OrderCard.Footer isOpen={isOpen} setOpen={setOpen} canRepeat={canRepeat}/>
        </div>
    );

};

OrderCard.HeaderRow = HeaderRow
OrderCard.InformationBlock = InformationBlock
OrderCard.Content = Content
OrderCard.Footer = Footer

export default OrderCard;
