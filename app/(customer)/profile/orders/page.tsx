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
import {$orders, getOrdersEvent} from "@/app/(customer)/profile/orders/model";
import {ProfileOrderItem} from "@/types/dto/user/order/ResponseProfileOrder";

type OrderFilters = "date" | "price" | "amount"

const UserProfileOrdersPage = () => {

    const [orders, getOrders] = useUnit([$orders, getOrdersEvent])

    const navigation = useNavigation()

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
            <section className={"w-full flex flex-col gap-5 sm:-mt-5"}>
                {sortedOrders?.length && sortedOrders.map((order, key) =>
                    <OrderCard key={key} order={order}/>
                )}
            </section>
        </UserProfileWrapper>
    );

};

export default UserProfileOrdersPage;
