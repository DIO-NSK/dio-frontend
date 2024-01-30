"use client"

import React from 'react';
import AdminPanelSidebar from "@/components/organisms/bars/admin-panel-sidebar/AdminPanelSidebar";

const AdminPanelLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <div className={"w-full grid grid-cols-10 my-5 gap-x-7 gap-y-5"}>
            <AdminPanelSidebar/>
            <div className={"col-span-8 flex flex-col gap-7 mr-[-28px] pb-7"}>
                {children}
            </div>
        </div>
    );
};

export default AdminPanelLayout;
