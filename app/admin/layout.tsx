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
        <div className={"w-full grid grid-cols-10 my-5 gap-x-7 gap-y-5"}>
            <AdminPanelSidebar/>
            <div className={cn("col-span-8 flex flex-col gap-7 mr-[-28px] pb-7", foldedCN)}>
                {children}
            </div>
        </div>
    );
};

export default AdminPanelLayout;
