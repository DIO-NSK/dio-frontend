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
import {
    $orders,
    getOrdersEvent,
    resetOrderToRepeatEvent,
    selectOrderToRepeatEvent
} from "@/app/(customer)/profile/orders/model";
import {useEffect, useState} from "react";
import {$userCredentials, getUserCredentialsEvent} from "@/app/(customer)/model";
import {useRouter} from "next/navigation";
import {getBonuses} from "@/app/(customer)/profile/page.api";

const MainInformationBlock = () => {

    const [userCredentials, getUserCredentials]
        = useUnit([$userCredentials, getUserCredentialsEvent])

    useEffect(() => {
        if (!userCredentials) getUserCredentials()
    }, [])

    if (userCredentials) return (
        <div className={"w-full flex flex-col gap-1"}>
            <Text className={"text-lg font-medium hidden md:flex"} text={"Основная информация"}/>
            <div className={"w-full flex md:items-start flex-col-reverse xl:flex-row gap-5"}>
                <UserInfoCard userCredentials={userCredentials}/>
                <BonusCard/>
            </div>
        </div>
    )

}

const LastOrderBlock = () => {

    const router = useRouter()
    const [resetOrderToRepeat, selectOrderToRepeat] = useUnit([resetOrderToRepeatEvent, selectOrderToRepeatEvent])
    const [orders, getOrders] = useUnit([$orders, getOrdersEvent])

    useEffect(() => {
        resetOrderToRepeat()
        getOrders()
    }, [])

    const handleRepeatOrder = () => {
        selectOrderToRepeat(orders.at(0)!!)
        router.push('/cart/checkout')
    }

    if (orders?.length !== 0) return (
        <div className={"w-full flex flex-col gap-4"}>
            <div className={"w-full flex flex-row items-center justify-between"}>
                <Text text={"Последний заказ"} className={"text-lg font-medium"}/>
                <Button
                    classNames={{button: "p-0 bg-0 md:py-3 md:px-4 md:bg-light-gray"}}
                    text={"Повторить заказ"}
                    onClick={handleRepeatOrder}
                    icon={<FiRefreshCw size={"18px"} className={"hidden md:flex"}/>}
                    buttonType={"SECONDARY"}
                    size={"sm"}
                />
            </div>
            <OrderCard
                order={orders.at(0)!!}
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
                className={"w-full mt-5 md:mt-0"}
                rightContent={
                    <FiX
                        size={"20px"}
                        className={"md:hidden flex"}
                        onClick={() => navigation.push('/')}
                    />
                }
            />
            <MainInformationBlock/>
            <LastOrderBlock/>
        </UserProfileWrapper>
    );
};

export default UserProfilePage;
