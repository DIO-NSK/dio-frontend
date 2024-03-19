import React from 'react';
import AdminTabBarItem from "@/components/atoms/tabs/admin-tab-bar-item/AdminTabBarItem";

const AdminTabBar = (props : SideTabBarProps) => {
    return (
        <div className={"flex flex-col"}>
            {
                props.tabs.map((tab, key) =>
                    <AdminTabBarItem
                        key={key} tab={tab}
                        isActive={tab.text === props.activeTab.text}
                        setActive={props.setActive}
                    />
                )
            }
        </div>
    )
};

export default AdminTabBar;
