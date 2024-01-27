"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Button from "@/components/atoms/buttons/button/Button";
import {FiRefreshCw} from "react-icons/fi";
import BonusCard from "@/components/organisms/user-profile/bonus-card/BonusCard";
import UserInfoCard from "@/components/organisms/user-profile/user-info-card/UserInfoCard";
import Text from "@/components/atoms/text/text-base/Text";
import OrderCard from "@/components/organisms/cards/order-card/OrderCard";
import {mockOrder} from "@/data/orderData";
import UserProfileWrapper from "@/components/wrappers/user-profile-wrapper/UserProfileWrapper";

const MainInformationBlock = () => {
    return (
        <div className={"w-full flex flex-row gap-5 items-end"}>
            <UserInfoCard/>
            <BonusCard/>
        </div>
    )
}

const LastOrderBlock = () => {

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

            <OrderCard order={mockOrder} canRepeat={false}/>

        </div>
    )
}

const UserProfilePage = () => {
    return (
        <UserProfileWrapper>
            <HeaderRow header={"Мой профиль"} className={"w-full"}/>
            <MainInformationBlock/>
            <LastOrderBlock/>
        </UserProfileWrapper>
    );
};

export default UserProfilePage;
