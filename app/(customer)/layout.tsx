"use client"

import React, {useEffect} from 'react';
import Navbar from "@/components/organisms/bars/navbar/Navbar";
import Searchbar from "@/components/organisms/bars/searchbar/Searchbar";
import {useUnit} from "effector-react";
import {usePathname} from "next/navigation";
import {resetOrderToRepeatEvent} from "@/app/(customer)/profile/orders/model";

const CustomerLayout = ({children}: { children: React.ReactNode }) => {

    const pathname = usePathname()
    const resetOrderToRepeat = useUnit(resetOrderToRepeatEvent)

    useEffect(() => {
        if (!(pathname.includes('/profile') || pathname.includes('/cart/checkout'))) {
            resetOrderToRepeat()
        }
    }, [pathname])

    return (
        <React.Fragment>
            <Navbar/>
            <Searchbar/>
            {children}
        </React.Fragment>
    );
};

export default CustomerLayout;
