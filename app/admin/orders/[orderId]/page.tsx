"use client"

import React, {useState} from 'react';
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Button from "@/components/atoms/buttons/button/Button";
import OrderTooltip from "@/components/organisms/tooltips/OrderTooltip";
import {FiPlus} from "react-icons/fi";
import {adminOrderTableRow} from "@/data/tables/adminOrdersTable";
import {useAdminPanelOrderPage} from "@/app/admin/orders/[orderId]/page.hooks";
import Text from "@/components/atoms/text/text-base/Text";
import {cn} from "@/utlis/cn";
import OrderPageHeaderBlock from "@/components/wrappers/order-page-header-block/OrderPageHeaderBlock";
import {convertStatusToText} from "@/utlis/convertStatusToText";
import {HeaderDescription} from "@/types/dto/text";
import ShoppingCartProductCard from "@/components/organisms/cards/shopping-cart-product-card/ShoppingCartProductCard";
import {mockShoppingCartProducts} from "@/data/shoppingCartProducts";
import ShoppingCartGroupWrapper from "@/components/wrappers/shopping-cart-group-wrapper/ShoppingCartGroupWrapper";
import {ShoppingCartServiceCardDTO} from "@/types/dto/admin/cards/ServiceCard";
import ShoppingCartServiceCard from "@/components/organisms/cards/shopping-cart-service-card/ShoppingCartServiceCard";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import {ResponseCartItem} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";

const OrderPageDataGrid = ({dataGrid}: { dataGrid: HeaderDescription[] }) => {

    const rowCV = [
        "mx-[-28px] px-7 w-full flex flex-row gap-5 pb-7",
        "border-b-2 border-light-gray"
    ]

    const BLOCK_SIZE = 2

    return (
        <>
            {
                Array.from({length: Math.round(dataGrid.length / BLOCK_SIZE)}, (_, blockIndex) =>
                    <div key={blockIndex} className={cn(rowCV)}>
                        {
                            dataGrid.slice(blockIndex * BLOCK_SIZE, (blockIndex + 1) * BLOCK_SIZE).map((rowItem, rowIndex) =>
                                <div className={"w-full flex flex-col gap-2"} key={rowIndex}>
                                    <Text text={rowItem.header} className={"text-text-gray"}/>
                                    <Text text={rowItem.description}/>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </>
    )

}

const OrderPageContent = () => {

    const {mockOrder} = useAdminPanelOrderPage()

    const contentData = [
        {
            header: "Основная информация",
            content: [
                {header: "Покупатель", description: mockOrder.customer.name},
                {header: "Email", description: mockOrder.customer.email ?? "—"},
                {header: "Телефон", description: mockOrder.customer.phoneNumber},
                {header: "Стоимость заказа", description: `${mockOrder.totalPrice} ₽`},
                {header: "Стоимость заказа со скидкой", description: `${mockOrder.totalPrice} ₽`},
                {header: "Стоимость доставки", description: `${mockOrder.deliveryPrice} ₽`}
            ]
        }, {
            header: "Параметры заказа",
            content: [
                {header: "Дата создания", description: `${mockOrder.creationDate} — ${mockOrder.creationTime}`},
                {header: "Статус заказа", description: convertStatusToText(mockOrder.status)}
            ]
        }, {
            header: "Покупатель",
            content: [
                {header: "ФИО", description: mockOrder.customer.name},
                {header: "Тип плательщика", description: "Юридическое лицо"},
                {header: "Полное название организации", description: "ООО «SQWOZ BAB DOODLE JUMP»"},
                {header: "Юридический адрес", description: "ул. Пушкина, д. Колотоушкина 64, кв. Ляпунова 12"},
                {header: "ИНН", description: "008122385477602"},
                {header: "КПП", description: "008122385477602"},
                {header: "Телефон контактного лица", description: "+7 (000) 000-00-00"},
                {header: "Название банка", description: "ООО «Райффайзен Банк»"},
                {header: "БИК банка", description: "008122385477602"},
                {header: "Расчётный счёт", description: "008122385477602008122385477602"},
                {header: "Корреспондентский счёт", description: "008122385477602"}
            ]
        }, {
            header: "Адрес доставки",
            content: [
                {header: "Город", description: "Новосибирск"},
                {header: "Улица", description: "Депутатская"},
                {header: "Дом / корпус", description: "53"},
                {header: "Квартира", description: "22"},
                {header: "Этаж", description: "16"},
                {header: "Подъезд", description: "1"},
            ]
        }, {
            header: "Время доставки",
            content: [
                {header: "Дата доставки", description: "Среда, 29.11"},
                {header: "Время доставки", description: "Утро, с 9:00 до 12:00"}
            ]
        }

    ]

    return (
        <div className={"flex flex-col gap-7"}>
            {
                contentData.map((blockData, blockKey) =>
                    <OrderPageHeaderBlock header={blockData.header}>
                        <OrderPageDataGrid dataGrid={blockData.content}/>
                    </OrderPageHeaderBlock>
                )
            }
        </div>
    )
}

const OrderPageCommentBlock = () => {

    const comment = "Добавить поле \"Оплата\" - прошла/не прошла и через какую платежную систему. Могут быть проблемы\n" +
        "с заказом, например не прошла оплата, тогда его необходимо выделить красным, дополнительно\n" +
        "в профиле клиента нужно написать что оплата по заказу не прошла и кнопку повторить оплату"

    return (
        <OrderPageHeaderBlock header={"Комментарий к заказу"}>
            <div className={"w-full mx-[-28px] px-7 pb-7 border-b-2 border-light-gray"}>
                <Text text={comment}/>
            </div>
        </OrderPageHeaderBlock>
    )

}

const OrderPageProductBlock = () => {

    const {mockOrder} = useAdminPanelOrderPage()

    const [isOpen, setOpen] = useState<boolean>(true)
    const handleSwitchOpenState = () => setOpen(!isOpen)

    const productInfo: HeaderDescription[] = [
        {header: "Количество товаров", description: `${mockOrder.products.length} шт.`},
        {header: "Адрес доставки", description: `ул. Никитина, д. 64, кв. 27`},
        {header: "Дата доставки", description: mockOrder.deliveryDate},
        {header: "Время доставки", description: "19:00 — 21:00"},
    ]

    return (
        <OrderPageHeaderBlock header={"Состав заказа"}>
            <OrderPageDataGrid dataGrid={productInfo}/>
            <div className={"w-full flex flex-col py-5 gap-10"}>
                {
                    isOpen && mockShoppingCartProducts.map((group) =>
                        <ShoppingCartGroupWrapper className={"mx-[-28px] px-7"}>
                            {
                                group.items.map((item) =>
                                    (
                                        item as ShoppingCartServiceCardDTO).description
                                        ? <ShoppingCartServiceCard card={item as ShoppingCartServiceCardDTO}/>
                                        : <ShoppingCartProductCard canInteract={false} card={item as unknown as ResponseCartItem}/>
                                )
                            }
                        </ShoppingCartGroupWrapper>)
                }
                <TextButton
                    text={isOpen ? "Свернуть" : "Смотреть все"}
                    onClick={handleSwitchOpenState}
                />
            </div>
        </OrderPageHeaderBlock>
    )

}

const AdminPanelOrderPage = () => {

    const [isToolTipOpen, setTooltipOpen] = useState<boolean>(false)
    const handleSwitchTooltipState = () => setTooltipOpen(!isToolTipOpen)

    return (
        <>
            <HeaderRow
                theme={"bordered"}
                className={"w-full"}
                header={"Заказ #187126"}
                leftContent={"Выполнен"}
                hasBackIcon
                rightContent={
                    <OrderTooltip
                        tableRow={adminOrderTableRow as any}
                        open={isToolTipOpen}
                    >
                        <Button
                            text={"Действия"}
                            buttonType={"SECONDARY"} size={"sm"}
                            onClick={handleSwitchTooltipState}
                            icon={<FiPlus size={"18px"}/>}
                        />
                    </OrderTooltip>
                }
            />
            <div className={"w-full grid grid-cols-8 gap-x-5 gap-y-7"}>
                <div className={"col-span-6 flex flex-col gap-7"}>
                    <OrderPageContent/>
                    <OrderPageCommentBlock/>
                    <OrderPageProductBlock/>
                </div>
            </div>
        </>
    );
};

export default AdminPanelOrderPage;
