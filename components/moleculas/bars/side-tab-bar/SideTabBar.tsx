import React from 'react';
import TabBarItem from "@/components/atoms/tabs/tab-bar-item/TabBarItem";
import {cn} from "@/utlis/cn";

const SideTabBar = (props: SideTabBarProps) => {
    return (
        <div className={cn("hidden ml-[-20px] col-span-3 sm:flex flex-col gap-2 customScrollbar", props.className)}>
            {
                props.tabs.map((tab: TabBarItem) => {
                    return <TabBarItem
                        tab={tab}
                        isActive={tab.text === props.activeTab.text}
                        setActive={props.setActive}
                    />
                })
            }
        </div>
    );
};

export default SideTabBar;
