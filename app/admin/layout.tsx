"use client"

import React from 'react';
import AdminPanelSidebar from "@/components/organisms/bars/admin-panel-sidebar/AdminPanelSidebar";
import {$isFolded} from "@/app/admin/folded.model";
import {useUnit} from "effector-react";
import {cn} from "@/utlis/cn";

const AdminPanelLayout = ({children}: { children: React.ReactNode }) => {

    const isFolded = useUnit($isFolded)
    const foldedCN = isFolded && "col-span-9"

    return (
        <div className={"w-full h-screen overflow-hidden grid grid-cols-10 gap-y-5"}>
            <AdminPanelSidebar/>
            <div className={cn("overflow-y-auto col-span-8 flex flex-col gap-7 py-5", foldedCN)}>
                {children}
            </div>
        </div>
    );
};

export default AdminPanelLayout;
