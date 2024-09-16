"use client"

import React, { useEffect, useState } from 'react';
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Text from "@/components/atoms/text/text-base/Text";
import { cn } from "@/utlis/cn";
import OrderPageHeaderBlock from "@/components/wrappers/order-page-header-block/OrderPageHeaderBlock";
import { HeaderDescription } from "@/types/dto/text";
import ShoppingCartProductCard from "@/components/organisms/cards/shopping-cart-product-card/ShoppingCartProductCard";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import { ResponseCartItem } from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import { useUnit } from "effector-react";
import { $orderDetails, getOrderDetailsEvent } from "@/app/admin/orders/[orderId]/model";
import dayjs from "dayjs";
import StickyCardWrapper from "@/components/wrappers/sticky-card-wrapper/StickyCardWrapper";
import { convertPhoneNumber } from "@/utlis/convertPhoneNumber";
import { api } from "@/api";

const rowCV = [
    "w-full flex flex-row gap-5 pb-7",
    "border-b-2 border-light-gray"
]

const BLOCK_SIZE = 2

const OrderPageDataGrid = ({ dataGrid, blockSize }: { dataGrid: HeaderDescription[], blockSize?: number }) => (
    <React.Fragment>
        {Array.from({ length: Math.round(dataGrid.length / (blockSize ?? BLOCK_SIZE)) }, (_, blockIndex) =>
            <div key={blockIndex} className={cn(rowCV)}>
                {dataGrid.slice(blockIndex * (blockSize ?? BLOCK_SIZE), (blockIndex + 1) * (blockSize ?? BLOCK_SIZE)).map((rowItem, rowIndex) =>
                    <div className={"w-full flex flex-col gap-2"} key={rowIndex}>
                        <Text text={rowItem.header} className={"text-text-gray"} />
                        <Text text={rowItem.description} />
                    </div>
                )}
            </div>
        )}
    </React.Fragment>
)

const OrderPageCommentBlock = () => {

    const orderDetails = useUnit($orderDetails)!!

    if (orderDetails.comment) return (
        <OrderPageHeaderBlock header={"Комментарий к заказу"}>
            <div className={"w-full mx-[-28px] px-7 pb-7 border-b-2 border-light-gray"}>
                <Text text={orderDetails.comment} />
            </div>
        </OrderPageHeaderBlock>
    )

}

const OrderPageCRMLogsBlock = ({ orderId }: { orderId: number }) => {

    const [orderLogs, setOrderLogs] = useState<string>('');

    useEffect(() => {
        api.get('/admin/bucket/order-logs', { params: { orderId: orderId } })
            .then(response => setOrderLogs(response.data));
    }, []);

    return (
        <OrderPageHeaderBlock header={"Логи заказа"}>
            <div className={"w-full mx-[-28px] px-7 pb-7 border-b-2 border-light-gray"}>
                <Text text={orderLogs} />
            </div>
        </OrderPageHeaderBlock>
    )

}

const OrderPageProductBlock = () => {

    const order = useUnit($orderDetails)!!
    const address = order.addressDto

    const [isOpen, setOpen] = useState<boolean>(true)
    const handleSwitchOpenState = () => setOpen(!isOpen)

    const productInfo: HeaderDescription[] = [
        { header: "Количество позиций", description: `${order.productItemDtoList.length} шт.` },
        { header: "Дата доставки", description: dayjs(order.deliveryDate).format("DD.MM.YYYY") },
        { header: "Время доставки", description: order.deliveryTime },
    ]

    return (
        <OrderPageHeaderBlock header={"Состав заказа"}>
            <OrderPageDataGrid dataGrid={productInfo} />
            <div className={"w-full flex flex-col py-5 gap-10"}>
                {isOpen && order.productItemDtoList.map((group) => (
                    <ShoppingCartProductCard
                        hasLink={false}
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

const OrderUserInfoBlock = () => {

    const orderDetails = useUnit($orderDetails)!!

    const infoData: HeaderDescription[] = [
        { header: "Покупатель", description: orderDetails.fullName },
        { header: "Email", description: orderDetails.email },
        { header: "Телефон", description: convertPhoneNumber(orderDetails.numberPhone) },
        { header: "Стоимость заказа", description: `${orderDetails.cost} ₽` },
    ]

    return (
        <OrderPageHeaderBlock header={"Основная информация"}>
            <OrderPageDataGrid dataGrid={infoData} />
        </OrderPageHeaderBlock>
    )

}

const OrderUserInformationBlock = () => {

    const orderDetails = useUnit($orderDetails)!!

    const infoData: HeaderDescription[] = [
        { header: "ФИО", description: orderDetails.fullNamePayer },
        { header: "Тип плательщика", description: orderDetails.typePayer },
    ]

    const legalEntityData: HeaderDescription[] = [
        { header: "Полное название организации", description: orderDetails.legalDto?.organizationName },
        { header: "Юридический адрес", description: orderDetails.legalDto?.legalAddress },
        { header: "ИНН", description: orderDetails.legalDto?.individualTaxNumber },
        { header: "Название банка", description: orderDetails.legalDto?.bankName },
        { header: "БИК банка", description: orderDetails.legalDto?.bankIdentificationCode },
        { header: "Расчётный счёт", description: orderDetails.legalDto?.paymentAccount },
        { header: "Корреспондентский счёт", description: orderDetails.legalDto?.correspondentNumber },
    ]

    return (
        <OrderPageHeaderBlock header={"Покупатель"}>
            <OrderPageDataGrid dataGrid={infoData} />
            {orderDetails.legalDto && <OrderPageDataGrid dataGrid={legalEntityData} />}
        </OrderPageHeaderBlock>
    )

}

const OrderAddressBlock = () => {

    const orderDetails = useUnit($orderDetails)!!
    const address = orderDetails.addressDto;

    const infoData: HeaderDescription[] = [
        { header: "Подъезд", description: address?.entranceNumber ? String(address.entranceNumber) : "Не указан" },
        { header: "Этаж", description: address?.floor ? String(address.floor) : "Не указан" },
        { header: "Адрес", description: address?.address ? address.address : "Не указан" },
    ]

    return (
        <OrderPageHeaderBlock header={"Дата доставки"}>
            <OrderPageDataGrid dataGrid={infoData} />
        </OrderPageHeaderBlock>
    )

}

const OrderStickyCard = () => {

    const orderDetails = useUnit($orderDetails)
    const deliveryTime = `${orderDetails!!.deliveryTime.split(' ')[1]}-${orderDetails!!.deliveryTime.split(' ')[3]}`

    const infoData: HeaderDescription[] = [
        { header: "Дата доставки", description: dayjs(orderDetails?.deliveryDate).format('DD.MM.YYYY') },
        { header: "Время доставки", description: deliveryTime },
    ]

    return (
        <StickyCardWrapper startCol={"col-start-7 top-0"}>
            <section className={"flex flex-col gap-5"}>
                {infoData.map((row, key) => (
                    <div
                        className={"w-full flex flex-row items-baseline justify-between border-b-2 border-light-gray pb-5"}
                        key={key}>
                        <Text text={row.header} className={"text-text-gray"} />
                        <Text text={row.description} />
                    </div>
                ))}
            </section>
            <div className={"w-full flex flex-row items-baseline justify-between"}>
                <Text text={"Итого"} className={"text-text-gray"} />
                <Text text={`${orderDetails?.cost} ₽`} className={"text-link-blue text-2xl font-medium"} />
            </div>
        </StickyCardWrapper>
    )

}

const AdminPanelOrderPage = ({ params }: {
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
                header={`Заказ #${params.orderId}`}
                leftContent={orderDetails.status}
                hasBackIcon
            />
            <div className={"w-full grid grid-cols-8 gap-x-5 gap-y-7 -mx-7 px-7"}>
                <div className={"col-span-6 flex flex-col gap-7"}>
                    <OrderUserInfoBlock />
                    <OrderUserInformationBlock />
                    <OrderAddressBlock />
                    <OrderPageCommentBlock />
                    <OrderPageProductBlock />
                    <OrderPageCRMLogsBlock orderId={params.orderId} />
                </div>
                <OrderStickyCard />
            </div>
        </React.Fragment>
    );
};

export default AdminPanelOrderPage;
