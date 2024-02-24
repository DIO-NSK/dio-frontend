"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Button from "@/components/atoms/buttons/button/Button";
import {FiRefreshCw, FiX} from "react-icons/fi";
import BonusCard from "@/components/organisms/user-profile/bonus-card/BonusCard";
import UserInfoCard from "@/components/organisms/user-profile/user-info-card/UserInfoCard";
import Text from "@/components/atoms/text/text-base/Text";
import OrderCard from "@/components/organisms/cards/order-card/OrderCard";
import {mockOrder} from "@/data/orderData";
import UserProfileWrapper from "@/components/wrappers/user-profile-wrapper/UserProfileWrapper";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import {useNavigation} from "@/utlis/hooks/useNavigation";

const MainInformationBlock = () => {
    return (
        <div className={"w-full flex flex-col gap-5 sm:flex-row sm:items-end"}>
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
                    classNames={{button: "hidden sm:flex"}}
                    text={"Повторить заказ"}
                    onClick={handleRepeatOrder}
                    icon={<FiRefreshCw size={"18px"}/>}
                    buttonType={"SECONDARY"}
                    size={"sm"}
                />
                <TextButton
                    className={"sm:hidden"}
                    onClick={handleRepeatOrder}
                    text={"Повторить заказ"}
                />
            </div>

            <OrderCard order={mockOrder} canRepeat={false}/>

        </div>
    )
}

const UserProfilePage = () => {

    const navigation = useNavigation()

    return (
        <UserProfileWrapper>
            <HeaderRow
                header={"Мой профиль"}
                className={"w-full"}
                rightContent={
                    <FiX
                        size={"20px"}
                        className={"sm:hidden flex"}
                        onClick={navigation.back}
                    />
                }
            />
            <MainInformationBlock/>
            <LastOrderBlock/>
        </UserProfileWrapper>
    );
};

export default UserProfilePage;
