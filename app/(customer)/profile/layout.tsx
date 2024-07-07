"use client"

import React from 'react';
import UserProfileLeftSidebar from "@/components/organisms/bars/user-profile-left-sidebar/UserProfileLeftSidebar";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import IconTextButton from "@/components/atoms/buttons/icon-text-button/IconTextButton";
import {FiLogOut} from "react-icons/fi";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {useRouter} from "next/navigation";
import {logoutUserFx} from "@/app/(customer)/model";
import {useUnit} from "effector-react";
import useSWR from "swr";
import {api} from "@/api";

const logoutCV: ClassValue[] = [
    "hidden sm:flex red-text hover:text-red-700 gap-2 ml-[-20px]",
    "p-4 rounded-xl hover:bg-red-50 fixed bottom-[30px]"
]

const UserProfileLayout = ({children}: { children: React.ReactNode }) => {

    const logout = useUnit(logoutUserFx)
    const router = useRouter()
    const swr = useSWR('get_user', () => api.get('/user'))

    const handleLogout = () => {
        logout().then(_ => router.push("/"))
    }

    return (
        <InnerPageWrapper classNames={{desktopWrapper: "mt-3", mobileWrapper: "pt-0"}}>
            <div className={"col-span-3"}>
                <UserProfileLeftSidebar/>
                <IconTextButton
                    icon={<FiLogOut size={"18px"}/>}
                    text={"Выйти"}
                    onClick={handleLogout}
                    placement={"left"}
                    className={cn(logoutCV)}
                />
            </div>
            {children}
        </InnerPageWrapper>
    )

}

export default UserProfileLayout
