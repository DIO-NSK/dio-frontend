"use client"

import React, {useEffect, useState} from 'react';
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Text from "@/components/atoms/text/text-base/Text";
import {cn} from "@/utlis/cn";
import OrderPageHeaderBlock from "@/components/wrappers/order-page-header-block/OrderPageHeaderBlock";
import {HeaderDescription} from "@/types/dto/text";
import ShoppingCartProductCard from "@/components/organisms/cards/shopping-cart-product-card/ShoppingCartProductCard";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import {ResponseCartItem} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import {useUnit} from "effector-react";
import {$orderDetails, getOrderDetailsEvent, ResponseOrderDetails} from "@/app/admin/orders/[orderId]/model";
import dayjs from "dayjs";
import StickyCardWrapper from "@/components/wrappers/sticky-card-wrapper/StickyCardWrapper";

const rowCV = [
    "mx-[-28px] px-7 w-full flex flex-row gap-5 pb-7",
    "border-b-2 border-light-gray"
]

const BLOCK_SIZE = 2

const OrderPageDataGrid = ({dataGrid}: { dataGrid: HeaderDescription[] }) => (
    <React.Fragment>
        {Array.from({length: Math.round(dataGrid.length / BLOCK_SIZE)}, (_, blockIndex) =>
            <div key={blockIndex} className={cn(rowCV)}>
                {dataGrid.slice(blockIndex * BLOCK_SIZE, (blockIndex + 1) * BLOCK_SIZE).map((rowItem, rowIndex) =>
                    <div className={"w-full flex flex-col gap-2"} key={rowIndex}>
                        <Text text={rowItem.header} className={"text-text-gray"}/>
                        <Text text={rowItem.description}/>
                    </div>
                )}
            </div>
        )}
    </React.Fragment>
)

const OrderPageCommentBlock = ({message}: { message: string }) => (
    <OrderPageHeaderBlock header={"Комментарий к заказу"}>
        <div className={"w-full mx-[-28px] px-7 pb-7 border-b-2 border-light-gray"}>
            <Text text={message}/>
        </div>
    </OrderPageHeaderBlock>
)

const OrderPageProductBlock = ({order}: { order: ResponseOrderDetails }) => {

    const address = order.addressDto

    const [isOpen, setOpen] = useState<boolean>(true)
    const handleSwitchOpenState = () => setOpen(!isOpen)

    const productInfo: HeaderDescription[] = [
        {header: "Количество товаров", description: `${order.productItemDtoList.length} шт.`},
        {header: "Адрес доставки", description: address ? `ул. ${address.street}, д. ${address.houseNumber}, кв. ${address.flatNumber}` : "Не указан"},
        {header: "Дата доставки", description: dayjs(order.deliveryDate).format("DD.MM.YYYY")},
        {header: "Время доставки", description: dayjs(order.deliveryTime).format("HH:mm")},
    ]

    return (
        <OrderPageHeaderBlock header={"Состав заказа"}>
            <OrderPageDataGrid dataGrid={productInfo}/>
            <div className={"w-full flex flex-col py-5 gap-10"}>
                {isOpen && order.productItemDtoList.map((group) => (
                    <ShoppingCartProductCard
                        card={group as unknown as ResponseCartItem}
                        canInteract={false}
                    />))}
                <TextButton
                    text={isOpen ? "Свернуть" : "Смотреть все"}
                    onClick={handleSwitchOpenState}
                />
            </div>
        </OrderPageHeaderBlock>
    )

}

const OrderStickyCard = () => {

    const orderDetails = useUnit($orderDetails)

    const infoData: HeaderDescription[] = [
        {header: "Дата доставки", description: dayjs(orderDetails?.deliveryDate).format('DD.MM.YYYY')},
        {header: "Время доставки", description: dayjs(orderDetails?.deliveryTime).format('HH:mm')},
    ]

    return (
        <StickyCardWrapper startCol={"col-start-7"}>
            <section className={"flex flex-col gap-5"}>
                {infoData.map((row, key) => (
                    <div className={"w-full flex flex-row items-baseline justify-between border-b-2 border-light-gray pb-5"} key={key}>
                        <Text text={row.header} className={"text-text-gray"}/>
                        <Text text={row.description}/>
                    </div>
                ))}
            </section>
            <div className={"w-full flex flex-row items-baseline justify-between"}>
                <Text text={"Итого"} className={"text-text-gray"}/>
                <Text text={`${orderDetails?.cost} ₽`} className={"text-link-blue text-2xl font-medium"}/>
            </div>
        </StickyCardWrapper>
    )

}

const AdminPanelOrderPage = ({params}: {
    params: {
        orderId: number
    }
}) => {

    const [orderDetails, getOrderDetails] = useUnit([$orderDetails, getOrderDetailsEvent])

    useEffect(() => {
        getOrderDetails(params.orderId)
    }, []);

    if (orderDetails) return (
        <React.Fragment>
            <HeaderRow
                theme={"bordered"}
                className={"w-full"}
                header={"Заказ #187126"}
                leftContent={"Выполнен"}
                hasBackIcon
            />
            <div className={"w-full grid grid-cols-8 gap-x-5 gap-y-7 -mx-7 px-7"}>
                <div className={"col-span-6 flex flex-col gap-7"}>
                    {orderDetails.comment && <OrderPageCommentBlock message={orderDetails.comment}/>}
                    <OrderPageProductBlock order={orderDetails}/>
                </div>
                <OrderStickyCard/>
            </div>
        </React.Fragment>
    );
};

export default AdminPanelOrderPage;
