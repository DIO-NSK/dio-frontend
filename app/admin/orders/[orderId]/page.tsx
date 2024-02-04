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
import {HeaderDesrcType} from "@/types/dto/text";
import {ShoppingCartProductCardDTO} from "@/types/dto/cards/ProductCard";
import ShoppingCartProductCard from "@/components/organisms/cards/shopping-cart-product-card/ShoppingCartProductCard";
import {mockShoppingCartProducts} from "@/data/shoppingCartProducts";
import ShoppingCartGroupWrapper from "@/components/wrappers/shopping-cart-group-wrapper/ShoppingCartGroupWrapper";
import {ShoppingCartServiceCardDTO} from "@/types/dto/cards/ServiceCard";
import ShoppingCartServiceCard from "@/components/organisms/cards/shopping-cart-service-card/ShoppingCartServiceCard";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";

const OrderPageDataGrid = ({dataGrid}: { dataGrid: HeaderDesrcType[] }) => {

    const rowCV = [
        "mx-[-28px] px-7 w-full flex flex-row gap-5 pb-7",
        "border-b-2 border-light-gray"
    ]

    const BLOCK_SIZE = 2

    return (
        <>
            {
                Array.from({length: Math.round(dataGrid.length / BLOCK_SIZE)}, (_, rowIndex) =>
                    <div key={rowIndex} className={cn(rowCV)}>
                        {
                            dataGrid.slice(rowIndex * BLOCK_SIZE, (rowIndex + 1) * BLOCK_SIZE).map((rowItem, rowIndex) =>
                                <div className={"w-full flex flex-col gap-2"}>
                                    <Text text={rowItem.header} className={"text-text-gray"}/>
                                    <Text text={rowItem.descr}/>
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
                {header: "Покупатель", descr: mockOrder.customer.name},
                {header: "Email", descr: mockOrder.customer.email ?? "—"},
                {header: "Телефон", descr: mockOrder.customer.phoneNumber},
                {header: "Стоимость заказа", descr: `${mockOrder.totalPrice} ₽`},
                {header: "Стоимость заказа со скидкой", descr: `${mockOrder.totalPrice} ₽`},
                {header: "Стоимость доставки", descr: `${mockOrder.deliveryPrice} ₽`}
            ]
        }, {
            header: "Параметры заказа",
            content: [
                {header: "Дата создания", descr: `${mockOrder.creationDate} — ${mockOrder.creationTime}`},
                {header: "Статус заказа", descr: convertStatusToText(mockOrder.status)}
            ]
        }, {
            header: "Покупатель",
            content: [
                {header: "ФИО", descr: mockOrder.customer.name},
                {header: "Тип плательщика", descr: "Юридическое лицо"},
                {header: "Полное название организации", descr: "ООО «SQWOZ BAB DOODLE JUMP»"},
                {header: "Юридический адрес", descr: "ул. Пушкина, д. Колотоушкина 64, кв. Ляпунова 12"},
                {header: "ИНН", descr: "008122385477602"},
                {header: "КПП", descr: "008122385477602"},
                {header: "Телефон контактного лица", descr: "+7 (000) 000-00-00"},
                {header: "Название банка", descr: "ООО «Райффайзен Банк»"},
                {header: "БИК банка", descr: "008122385477602"},
                {header: "Расчётный счёт", descr: "008122385477602008122385477602"},
                {header: "Корреспондентский счёт", descr: "008122385477602"}
            ]
        }, {
            header: "Адрес доставки",
            content: [
                {header: "Город", descr: "Новосибирск"},
                {header: "Улица", descr: "Депутатская"},
                {header: "Дом / корпус", descr: "53"},
                {header: "Квартира", descr: "22"},
                {header: "Этаж", descr: "16"},
                {header: "Подъезд", descr: "1"},
            ]
        }, {
            header: "Время доставки",
            content: [
                {header: "Дата доставки", descr: "Среда, 29.11"},
                {header: "Время доставки", descr: "Утро, с 9:00 до 12:00"}
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

    const productInfo: HeaderDesrcType[] = [
        {header: "Количество товаров", descr: `${mockOrder.products.length} шт.`},
        {header: "Адрес доставки", descr: `ул. Никитина, д. 64, кв. 27`},
        {header: "Дата доставки", descr: mockOrder.deliveryDate},
        {header: "Время доставки", descr: "19:00 — 21:00"},
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
                                        : <ShoppingCartProductCard
                                            canInteract={false}
                                            card={item as ShoppingCartProductCardDTO}
                                        />
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
                        tableItem={adminOrderTableRow}
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
