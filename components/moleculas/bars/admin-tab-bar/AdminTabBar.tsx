import React from 'react';
import AdminTabBarItem from "@/components/atoms/tabs/admin-tab-bar-item/AdminTabBarItem";
import {SideTabBarProps} from "@/components/moleculas/bars/side-tab-bar/SideTabBar";

const AdminTabBar = (props: SideTabBarProps) => {
    return (
        <div className={"flex flex-col"}>
            {props.tabs.map((tab, key) =>
                <AdminTabBarItem
                    isActive={tab.text === props.activeTab.text}
                    setActive={props.setActive}
                    key={key} tab={tab}
                />
            )}
        </div>
    )
};

export default AdminTabBar;
