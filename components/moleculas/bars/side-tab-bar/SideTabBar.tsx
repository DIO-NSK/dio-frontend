import React from 'react';
import TabBarItem from "@/components/atoms/tabs/tab-bar-item/TabBarItem";
import {cn} from "@/utlis/cn";

const SideTabBar = (props: SideTabBarProps) => {
    return (
        <div className={cn("ml-[-20px] col-span-3 flex flex-col gap-2", props.className)}>
            {
                props.tabs.map((tab : TabBarItem) => {
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
