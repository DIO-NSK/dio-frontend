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
import {$orders, getOrderInfoFx, getOrdersEvent, selectOrderToRepeatEvent} from "@/app/(customer)/profile/orders/model";
import {ProfileOrderItem} from "@/types/dto/user/order/ResponseProfileOrder";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import QuestionMark from "@/components/atoms/svg/question-mark/QuestionMark";
import EmptyPage from "@/components/organisms/empty-page/EmptyPage";

type OrderFilters = "date" | "price" | "amount"

const noOrdersHeader = "Нет информации о заказах"
const noOrdersMessage = "Похоже, что Вы еще не сделали ни одного заказа.\n" +
    "Чтобы сделать заказ, выберите продукты в каталоге\n" +
    "и оформите заказ в корзине."

const UserProfileOrdersPage = () => {

    const [orders, getOrders, getOrderInfo] = useUnit([$orders, getOrdersEvent, getOrderInfoFx])

    const navigation = useNavigation()
    const searchParams = useSearchParams();
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    const dropdownItems: SelectItem<OrderFilters>[] = [
        {name: "По дате заказа", value: "date"},
        {name: "По итоговой цене", value: "price"},
        {name: "По количеству товаров", value: "amount"}
    ]

    const [
        activeItem,
        setActiveItem
    ] = useState<SelectItem<OrderFilters>>(dropdownItems[0])

    useEffect(() => {
        if (!orders.length) getOrders()
        if (params.has('orderId')) {
            getOrderInfo(params.get('orderId')!!)
                .then(info => console.log(info));
        }
    }, [])

    const sortedOrders = useMemo(() => {
        if (orders.length) switch (activeItem.value) {
            case "date":
                return orders.toSorted((first, second) => first.id - second.id)
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
            <HeaderRow
                header={"Мои заказы"}
                leftContent={`${orders.length} шт.`}
                rightContent={
                    <React.Fragment>
                        <SelectInput
                            width={"sm:w-[250px]"}
                            items={dropdownItems}
                            className={"hidden sm:flex"}
                            selectedItem={activeItem}
                            onSelect={setActiveItem}
                            size={"sm"}
                        />
                        <FiX
                            size={"20px"}
                            className={"w-fit sm:hidden"}
                            onClick={navigation.back}
                        />
                    </React.Fragment>
                }
            />
            <SelectInput
                items={dropdownItems}
                className={"sm:hidden"}
                selectedItem={activeItem}
                onSelect={setActiveItem}
            />
            {
                sortedOrders?.length !== 0 ? (
                    <section className={"w-full flex flex-col gap-5 sm:-mt-5"}>
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
