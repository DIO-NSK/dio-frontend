"use client"

import React, {useEffect} from 'react';
import AdminPanelSidebar from "@/components/organisms/bars/admin-panel-sidebar/AdminPanelSidebar";
import {$isFolded} from "@/app/admin/folded.model";
import {useUnit} from "effector-react";
import {cn} from "@/utlis/cn";
import {useRouter} from "next/navigation";
import Loading from "@/components/mobile/loading/Loading";
import useSWR from "swr";
import {api} from "@/api";
import {jwtDecode} from "jwt-decode";

const AdminPanelLayout = ({children}: { children: React.ReactNode }) => {

    const router = useRouter()
    const swr = useSWR('get_user', () => api.get('/user'))

    const isFolded = useUnit($isFolded)
    const foldedCN = isFolded && "col-span-9"

    useEffect(() => {
        const token = localStorage.getItem("ACCESS_TOKEN")
        if (token) {
            const decoded: any = jwtDecode(token)
            console.log(decoded.role)
            if (decoded.role !== 'ADMIN' && decoded.role !== 'WORKER') {
                router.push('/')
            }
        }
    }, []);

    if (swr.error) {
        router.push('/')
    }

    if (swr.data) return (
        <div className={"w-full h-screen overflow-hidden grid grid-cols-10 gap-y-5"}>
            <AdminPanelSidebar/>
            <div className={cn("overflow-y-auto col-span-8 flex flex-col gap-7 py-5", foldedCN)}>
                {children}
            </div>
        </div>
    );

};

export default AdminPanelLayout;
