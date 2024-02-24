import React, {useEffect, useState} from 'react';
import SideTabBar from "@/components/moleculas/bars/side-tab-bar/SideTabBar";
import {usePathname, useRouter} from "next/navigation";
import {IconTextLink, TextLink} from "@/types/links";
import {FiFile, FiSettings, FiUser} from "react-icons/fi";

const UserProfileLeftSidebar = () => {

    const pathname = usePathname()
    const router = useRouter()

    const sidebarTabs: IconTextLink[] = [
        {text: "Мой профиль", path: "/profile", icon : <FiUser size={"18px"} />},
        {text: "Мои заказы", path: "/profile/orders", icon : <FiFile size={"18px"} />},
        {text: "Настройки аккаунта", path: "/profile/settings", icon : <FiSettings size={"18px"} />}
    ]

    const [
        activeTab,
        setActiveTab
    ] = useState<TextLink>(sidebarTabs[0])

    const handleTabCLick = (item : TextLink) => {
        setActiveTab(item); router.push(item.path)
    }

    const computeActiveTab = () => {
        const findActiveTab = sidebarTabs.find((tab) => tab.path.includes(pathname))
        setActiveTab(findActiveTab ?? sidebarTabs[0])
    }

    useEffect(() => {
        computeActiveTab()
    }, [])

    return (
        <SideTabBar
            tabs={sidebarTabs}
            activeTab={activeTab}
            setActive={handleTabCLick}
            className={"hidden sm:flex w-full sticky top-[110px]"}
        />
    );

};

export default UserProfileLeftSidebar;
