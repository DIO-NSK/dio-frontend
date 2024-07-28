import React from 'react';
import TabBarItem from "@/components/atoms/tabs/tab-bar-item/TabBarItem";
import {cn} from "@/utlis/cn";

import {type TabBarItem as TabBarItemType} from '@/types/props/SideTabBar'
import {PropsWithClassName} from "@/types/props/utils/PropsWithClassName";

export type SideTabBarProps = PropsWithClassName<{
    tabs: TabBarItemType[],
    activeTab: TabBarItemType,
    setActive: (item: TabBarItemType) => void,
    onClick ?: () => void,
    isHoverable ?: boolean
}>

const SideTabBar = ({isHoverable = false, ...props}: SideTabBarProps) => {
    return (
        <div className={cn("hidden col-span-3 sm:flex flex-col gap-2 customScrollbar", props.className)}>
            {props.tabs.map((tab: TabBarItemType, index) => (
                <TabBarItem
                    {...props}
                    tab={tab}
                    isActive={tab.text === props.activeTab.text}
                    isHoverable={isHoverable}
                    key={index}
                />
            ))}
        </div>
    );
};

export default SideTabBar;
