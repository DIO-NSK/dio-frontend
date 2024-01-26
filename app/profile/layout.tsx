"use client"

import React from 'react';
import UserProfileLeftSidebar from "@/components/organisms/bars/user-profile-left-sidebar/UserProfileLeftSidebar";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import IconTextButton from "@/components/atoms/buttons/icon-text-button/IconTextButton";
import {FiLogOut} from "react-icons/fi";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

const UserProfileLayout = ({children}: { children: React.ReactNode }) => {

    const logoutCV : ClassValue[] = [
        "red-text hover:text-red-700 gap-2 ml-[-20px]",
        "p-4 rounded-xl hover:bg-red-50 fixed bottom-[30px]"
    ]

    const handleLogout = () => console.log("Logged out")

    return (
        <InnerPageWrapper className={"mt-3"}>
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
    );
};

export default UserProfileLayout;
