import React, {useEffect, useState} from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {
    FiArrowLeft,
    FiArrowRight,
    FiBell,
    FiBookmark,
    FiFile,
    FiGift,
    FiList,
    FiLogOut,
    FiPhone,
    FiPieChart,
    FiUsers,
    FiZap
} from "react-icons/fi";
import AdminTabBar from "@/components/moleculas/bars/admin-tab-bar/AdminTabBar";
import {TextAction} from "@/types/dto/text";
import SquareIcon from "@/components/atoms/icons/square-icon/SquareIcon";
import Text from "@/components/atoms/text/text-base/Text";
import DIOLogoBig from "@/components/atoms/svg/dio-logo-big/DIOLogoBig";
import {usePathname, useRouter} from "next/navigation";
import DIOLogoSmall from "@/components/atoms/svg/dio-logo-small/DIOLogoSmall";
import {useUnit} from "effector-react";
import {$isFolded, toggleFoldedStateEvent} from "@/app/admin/folded.model";
import {logoutUserFx} from "@/app/(customer)/model";

const itemCV: ClassValue[] = [
    "flex flex-row items-center gap-4 group",
    "rounded-xl pointer hoverable"
]

const Footer = () => {

    const [isFolded, foldState, logout] = useUnit([$isFolded, toggleFoldedStateEvent, logoutUserFx])
    const router = useRouter()

    const footerData: (TextAction & { icon: React.ReactNode })[] = [
        {
            text: "Свернуть",
            icon: isFolded ? <FiArrowRight size={"18px"}/> : <FiArrowLeft size={"18px"}/>,
            action: foldState
        }, {
            text: "Выйти",
            icon: <FiLogOut size={"18px"}/>,
            action: () => logout().then(_ => router.push("/"))
        }
    ]

    return (
        <div className={"w-full px-10 flex flex-col gap-5 pt-5 border-t-2 border-light-gray"}>
            {footerData.map((item, key) => {

                const iconCV: ClassValue = {
                    "text-info-red group-hover:bg-red-100 group-hover:text-red-700": item.text == "Выйти"
                }

                const textCV: ClassValue[] = [
                    "text-text-gray group-hover:text-link-blue",
                    {"text-info-red group-hover:text-red-700": item.text == "Выйти"}
                ]

                return (<div key={key} className={cn(itemCV)} onClick={item.action}>
                    <SquareIcon icon={item.icon} className={cn(iconCV)}/>
                    {!isFolded && <Text text={item.text} className={cn(textCV)}/>}
                </div>)

            })}
        </div>
    )

}

const AdminPanelSidebar = () => {

    const pathname = usePathname()
    const router = useRouter()

    const adminTabBarData: TabBarItem[] = [
        {text: "Аналитика", icon: <FiPieChart size={"18px"}/>, path: "/admin"},
        {text: "Каталог", icon: <FiList size={"18px"}/>, path: "/admin/catalog"},
        {text: "Услуги", icon: <FiZap size={"18px"}/>, path: "/admin/services"},
        {text: "Акции", icon: <FiGift size={"18px"}/>, path: "/admin/sales"},
        {text: "Промо", icon: <FiBookmark size={"18px"}/>, path: "/admin/promo"},
        {text: "Заказы", icon: <FiFile size={"18px"}/>, path: "/admin/orders"},
        {text: "Уведомления", icon: <FiBell size={"18px"}/>, path: "/admin/notifications"},
        {text: "Заявки на звонок", icon: <FiPhone size={"18px"}/>, path: "/admin/call-requests"},
        {text: "Сотрудники", icon: <FiUsers size={"18px"}/>, path: "/admin/workers"},
    ]

    const [activeTab, setActiveTab] = useState<TabBarItem>(adminTabBarData[0])
    const isFolded = useUnit($isFolded)

    const wrapperCV: ClassValue[] = [
        "sticky top-0 col-span-2 my-[-20px] py-5 h-screen flex flex-col",
        "justify-between border-r-2 border-light-gray",
        {"col-span-1": isFolded}
    ]

    const handleTabClick = (tab: TabBarItem) => {
        setActiveTab(tab)
        router.push(tab.path!!)
    }

    const computeActiveTab = () => {
        const activeRoute = adminTabBarData.find(tab => (tab.path!!).includes(pathname))
        setActiveTab(activeRoute ?? adminTabBarData[0])
    }

    useEffect(() => {
        computeActiveTab()
    }, [])

    return (
        <div className={cn(wrapperCV)}>

            <div className={"w-full flex flex-col gap-5"}>
                {
                    isFolded
                        ? <DIOLogoSmall size={47} className={"mx-9"}/>
                        : <DIOLogoBig className={"mx-9"}/>
                }
                <AdminTabBar
                    tabs={adminTabBarData}
                    activeTab={activeTab}
                    setActive={handleTabClick}
                />
            </div>

            <AdminPanelSidebar.Footer/>
        </div>
    );

};

AdminPanelSidebar.Footer = Footer

export default AdminPanelSidebar;
