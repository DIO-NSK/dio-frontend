"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {useState} from "react";
import {SelectedItem} from "@/types/select";
import DropdownInput from "@/components/atoms/inputs/dropdown-input/DropdownInput";
import OrderCard from "@/components/organisms/cards/order-card/OrderCard";
import {mockOrderList} from "@/data/orderData";

const ProfileOrdersPage = () => {

    const dropdownItems = [
        {text: "По дате заказа", isSelected: true},
        {text: "По итоговой цене", isSelected: false},
        {text: "По количеству товаров", isSelected: false}
    ]

    const [
        activeItem,
        setActiveItem
    ] = useState<SelectedItem>(dropdownItems[0])

    return (
        <div className={"col-span-9 flex flex-col gap-5"}>
            <HeaderRow
                header={"Мои заказы"}
                leftContent={"6 шт."}
                rightContent={
                    <DropdownInput
                        width={"w-[250px]"}
                        items={dropdownItems}
                        selectedItem={activeItem}
                        onSelect={setActiveItem}
                    />
                }
            />
            {
                mockOrderList.map((order, key) =>
                    <OrderCard order={order}/>)
            }
        </div>
    );
};

export default ProfileOrdersPage;
