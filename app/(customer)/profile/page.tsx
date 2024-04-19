"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Button from "@/components/atoms/buttons/button/Button";
import {FiRefreshCw, FiX} from "react-icons/fi";
import BonusCard from "@/components/organisms/user-profile/bonus-card/BonusCard";
import UserInfoCard from "@/components/organisms/user-profile/user-info-card/UserInfoCard";
import Text from "@/components/atoms/text/text-base/Text";
import OrderCard from "@/components/organisms/cards/order-card/OrderCard";
import UserProfileWrapper from "@/components/wrappers/user-profile-wrapper/UserProfileWrapper";
import {useNavigation} from "@/utlis/hooks/useNavigation";
import {useUnit} from "effector-react";
import {$orders, getOrdersEvent} from "@/app/(customer)/profile/orders/model";
import {useEffect} from "react";
import {$userCredentials, getUserCredentialsEvent} from "@/app/(customer)/model";

const MainInformationBlock = () => {

    const [userCredentials, getUserCredentials]
        = useUnit([$userCredentials, getUserCredentialsEvent])

    useEffect(() => {
        if (!userCredentials) getUserCredentials()
    }, [])

    if (userCredentials) return (
        <div className={"w-full flex flex-col gap-1"}>
            <Text className={"text-lg font-medium hidden sm:flex"} text={"Основная информация"}/>
            <div className={"w-full flex flex-col gap-5 sm:flex-row sm:items-start"}>
                <UserInfoCard userCredentials={userCredentials}/>
                <BonusCard/>
            </div>
        </div>
    )

}

const LastOrderBlock = () => {

    const [orders, getOrders] = useUnit([$orders, getOrdersEvent])

    useEffect(() => {
        getOrders()
    }, [])

    const handleRepeatOrder = () => console.log("Repeat order")

    if (orders?.length !== 0) return (
        <div className={"w-full flex flex-col gap-4"}>

            <div className={"w-full flex flex-row items-center justify-between"}>
                <Text text={"Последний заказ"} className={"text-lg font-medium"}/>
                <Button
                    classNames={{button: "p-0 bg-0 sm:py-3 sm:px-4 sm:bg-light-gray"}}
                    text={"Повторить заказ"}
                    onClick={handleRepeatOrder}
                    icon={<FiRefreshCw size={"18px"} className={"hidden sm:flex"}/>}
                    buttonType={"SECONDARY"}
                    size={"sm"}
                />
            </div>

            <OrderCard
                order={orders.at(-1)!!}
                canRepeat={false}
            />

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
