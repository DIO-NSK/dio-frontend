"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Button from "@/components/atoms/buttons/button/Button";
import {FiRefreshCw} from "react-icons/fi";
import BonusCard from "@/components/organisms/user-profile/bonus-card/BonusCard";
import UserInfoCard from "@/components/organisms/user-profile/user-info-card/UserInfoCard";
import {Order} from "@/types/dto/Order";
import Text from "@/components/atoms/text/text-base/Text";
import OrderCard from "@/components/organisms/cards/order-card/OrderCard";
import {useState} from "react";

const mockOrder : Order = {
    orderId : 328990,
    status : "pending",
    address : "ул. Никитина, д. 64, кв. 27",
    deliverDate : "27.10.23",
    deliveryTime : "19:00 — 21:00",
    totalPrice : 1192,
    products : ["1", "2", "3"]
}

const MainInformationBlock = () => {
    return (
        <div className={"w-full flex flex-row gap-5 items-end"}>
            <UserInfoCard/>
            <BonusCard/>
        </div>
    )
}

const LastOrderBlock = () => {

    const [isOpen, setOpen] = useState<boolean>(false)

    const handleRepeatOrder = () => console.log("Repeat order")

    return (
        <div className={"w-full flex flex-col gap-4"}>

            <div className={"w-full flex flex-row items-center justify-between"}>
                <Text text={"Последний заказ"} className={"text-lg font-medium"}/>
                <Button
                    text={"Повторить заказ"}
                    onClick={handleRepeatOrder}
                    icon={<FiRefreshCw size={"18px"}/>}
                    buttonType={"SECONDARY"}
                    size={"sm"}
                />
            </div>

            <OrderCard
                order={mockOrder}
                isOpen={isOpen}
                setOpen={setOpen}
                canRepeat={false}
            />

        </div>
    )
}

const UserProfilePage = () => {
    return (
        <>
            <div className={"col-span-9 flex flex-col gap-5"}>
                <HeaderRow header={"Мой профиль"} className={"w-full"}/>
                <MainInformationBlock/>
                <LastOrderBlock/>
            </div>
        </>
    );
};

export default UserProfilePage;
