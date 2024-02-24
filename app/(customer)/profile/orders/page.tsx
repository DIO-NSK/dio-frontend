"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {useState} from "react";
import {SelectItem} from "@/types/props/SelectItem";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import OrderCard from "@/components/organisms/cards/order-card/OrderCard";
import {mockOrderList} from "@/data/orderData";
import UserProfileWrapper from "@/components/wrappers/user-profile-wrapper/UserProfileWrapper";
import {FiX} from "react-icons/fi";
import {useNavigation} from "@/utlis/hooks/useNavigation";

const UserProfileOrdersPage = () => {

    const navigation = useNavigation()

    const dropdownItems: SelectItem<string>[] = [
        {name: "По дате заказа", value: "date"},
        {name: "По итоговой цене", value: "price"},
        {name: "По количеству товаров", value: "amount"}
    ]

    const [
        activeItem,
        setActiveItem
    ] = useState<SelectItem<string>>(dropdownItems[0])

    return (
        <UserProfileWrapper>
            <HeaderRow
                header={"Мои заказы"}
                leftContent={"6 шт."}
                rightContent={
                    <>
                        <SelectInput
                            width={"sm:w-[250px]"}
                            items={dropdownItems}
                            className={"hidden sm:flex"}
                            selectedItem={activeItem}
                            onSelect={setActiveItem}
                        />
                        <FiX
                            size={"20px"}
                            className={"w-fit sm:hidden"}
                            onClick={navigation.back}
                        />
                    </>
                }
            />
            <SelectInput
                items={dropdownItems}
                className={"sm:hidden"}
                selectedItem={activeItem}
                onSelect={setActiveItem}
            />
            {
                mockOrderList.map((order, key) =>
                    <OrderCard key={key} order={order}/>)
            }
        </UserProfileWrapper>
    );

};

export default UserProfileOrdersPage;
