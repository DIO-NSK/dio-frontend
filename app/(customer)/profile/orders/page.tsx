"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {useState} from "react";
import {SelectItem} from "@/types/props/Select";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import OrderCard from "@/components/organisms/cards/order-card/OrderCard";
import {mockOrderList} from "@/data/orderData";
import UserProfileWrapper from "@/components/wrappers/user-profile-wrapper/UserProfileWrapper";

const UserProfileOrdersPage = () => {

    const dropdownItems = [
        {text: "По дате заказа", isSelected: true},
        {text: "По итоговой цене", isSelected: false},
        {text: "По количеству товаров", isSelected: false}
    ]

    const [
        activeItem,
        setActiveItem
    ] = useState<SelectItem>(dropdownItems[0])

    return (
        <UserProfileWrapper>
            <HeaderRow
                header={"Мои заказы"}
                leftContent={"6 шт."}
                rightContent={
                    <SelectInput
                        width={"w-[250px]"}
                        items={dropdownItems}
                        selectedItem={activeItem}
                        onSelect={setActiveItem}
                    />
                }
            />
            {
                mockOrderList.map((order, key) =>
                    <OrderCard key={key} order={order}/>)
            }
        </UserProfileWrapper>
    );
};

export default UserProfileOrdersPage;
