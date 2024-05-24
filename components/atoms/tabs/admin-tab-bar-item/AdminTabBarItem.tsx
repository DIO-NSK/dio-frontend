import React from 'react';
import {cn} from "@/utlis/cn";
import SquareIcon from "@/components/atoms/icons/square-icon/SquareIcon";
import Text from "@/components/atoms/text/text-base/Text";
import {ClassValue} from "clsx";
import {useUnit} from "effector-react";
import {$isFolded} from "@/app/admin/folded.model";
import {TabBarItemProps} from "@/types/props/SideTabBar";

const AdminTabBarItem = (props: TabBarItemProps) => {

    const isFolded = useUnit($isFolded)

    const itemCV: ClassValue[] = [
        "w-full flex flex-row items-center gap-4 px-10 py-3",
        "bg-white pointer hoverable hover:bg-bg-light-blue group",
        {"bg-bg-light-blue": props.isActive},
    ]

    const textCV: ClassValue = [
        "text-text-gray group-hover:text-link-blue hoverable",
        {"text-link-blue": props.isActive}
    ]

    const iconCV : ClassValue = {"bg-light-gray text-link-blue": props.isActive}

    const handleSelectTab = () => props.setActive(props.tab)

    return (
        <div className={cn(itemCV)} onClick={handleSelectTab}>
            <SquareIcon icon={props.tab.icon} className={cn(iconCV)} />
            {!isFolded && <Text text={props.tab.text} className={cn(textCV)}/>}
        </div>
    )

}

export default AdminTabBarItem;
