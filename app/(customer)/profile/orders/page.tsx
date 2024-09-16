"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import React, {useEffect, useMemo, useState} from "react";
import {SelectItem} from "@/types/props/SelectItem";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import OrderCard from "@/components/organisms/cards/order-card/OrderCard";
import UserProfileWrapper from "@/components/wrappers/user-profile-wrapper/UserProfileWrapper";
import {FiX} from "react-icons/fi";
import {useNavigation} from "@/utlis/hooks/useNavigation";
import {useUnit} from "effector-react";
import {$orders, getOrderInfoFx, getOrdersEvent} from "@/app/(customer)/profile/orders/model";
import {ProfileOrderItem} from "@/types/dto/user/order/ResponseProfileOrder";
import {useRouter, useSearchParams} from "next/navigation";
import Button from "@/components/atoms/buttons/button/Button";
import EmptyPage from "@/components/organisms/empty-page/EmptyPage";
import Snackbar from "@/components/organisms/snackbar/Snackbar";

type OrderFilters = "date" | "price" | "amount"

const FAIL_MESSAGE = 'Авторизация отклонена';

const noOrdersHeader = "Нет информации о заказах"
const noOrdersMessage = "Похоже, что Вы еще не сделали ни одного заказа.\n" +
    "Чтобы сделать заказ, выберите продукты в каталоге\n" +
    "и оформите заказ в корзине."

const dropdownItems: SelectItem<OrderFilters>[] = [
    {name: "По дате заказа", value: "date"},
    {name: "По итоговой цене", value: "price"},
    {name: "По количеству товаров", value: "amount"}
]

const UserProfileOrdersPage = () => {

    const [orders, getOrders, getOrderInfo] = useUnit([$orders, getOrdersEvent, getOrderInfoFx])
    const [message, setMessage] = useState<string>('');

    const navigation = useNavigation()
    const searchParams = useSearchParams();
    const router = useRouter();

    const [
        activeItem,
        setActiveItem
    ] = useState<SelectItem<OrderFilters>>(dropdownItems[0])

    useEffect(() => {
        getOrders()
    }, [])

    useEffect(() => {
        const entries = Array.from(searchParams.entries());

        if (entries?.[0]?.[0]?.includes('orderId')) {
            router.replace('/profile/orders')
            const orderId = entries[0][0].split('=')[1];
            getOrderInfo(orderId).then(data => setMessage(data.orderStatus));
        }
    }, []);

    const sortedOrders = useMemo(() => {
        if (orders.length) switch (activeItem.value) {
            case "date":
                return orders.toSorted((first, second) => second.id - first.id)
            case "price":
                const getTotalPrice = (products: ProfileOrderItem[]) => products.reduce((acc, product) =>
                    acc + product.price * product.quantity * (1 - 0.01 * product.discountPercent), 0)
                return orders.toSorted((first, second) => {
                    const firstPrice = getTotalPrice(first.items)
                    const secondPrice = getTotalPrice(second.items)
                    return secondPrice - firstPrice
                })
            case "amount":
                const getTotalAmount = (products: ProfileOrderItem[]) => products.reduce((acc, product) =>
                    acc + product.quantity, 0)
                return orders.toSorted((first, second) => {
                    const firstAmount = getTotalAmount(first.items)
                    const secondAmount = getTotalAmount(second.items)
                    return secondAmount - firstAmount
                })
        }
    }, [activeItem.value, orders])

    return (
        <UserProfileWrapper>
            <Snackbar
                header={message === FAIL_MESSAGE ? 'Не удалось оплатить заказ' : 'Заказ успешно оплачен!'}
                open={message.length !== 0} message={message}
                success={message !== FAIL_MESSAGE}
                action={() => setMessage('')}
                onClose={() => setMessage('')}
                autoHide={false}
            />
            <HeaderRow
                header={"Мои заказы"}
                leftContent={`${orders.length} шт.`}
                className={'mt-5 md:mt-0'}
                rightContent={
                    <React.Fragment>
                        <SelectInput
                            width={"md:w-[250px]"}
                            items={dropdownItems}
                            className={"hidden md:flex"}
                            selectedItem={activeItem}
                            onSelect={setActiveItem}
                            size={"sm"}
                        />
                        <FiX
                            size={"20px"}
                            className={"w-fit md:hidden"}
                            onClick={() => navigation.push('/')}
                        />
                    </React.Fragment>
                }
            />
            <SelectInput
                items={dropdownItems}
                className={"md:hidden"}
                selectedItem={activeItem}
                onSelect={setActiveItem}
            />
            {
                sortedOrders?.length !== 0 ? (
                    <section className={"w-full flex flex-col gap-5 md:-mt-5"}>
                        {sortedOrders?.map((order, key) =>
                            <OrderCard key={key} order={order}/>
                        )}
                    </section>
                ) : (
                    <EmptyPage
                        header={noOrdersHeader}
                        description={noOrdersMessage}
                    >
                        <Button
                            text={"В корзину"}
                            onClick={() => navigation.push("/cart")}
                        />
                    </EmptyPage>
                )
            }
        </UserProfileWrapper>
    );

};

export default UserProfileOrdersPage;
