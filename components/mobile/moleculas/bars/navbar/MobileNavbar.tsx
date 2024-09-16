"use client"

import {FiMenu, FiSearch, FiX} from "react-icons/fi";
import DIOLogoSmall from "@/components/atoms/svg/dio-logo-small/DIOLogoSmall";
import {usePathname, useRouter} from "next/navigation";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import React, {useEffect, useState} from "react";
import {useScrollDirection} from "react-use-scroll-direction";

const wrapperStyles = (scrolledUp: boolean): ClassValue[] => [
    "z-20 lg:hidden w-full flex flex-row items-center px-5 bg-white",
    "justify-between py-5 border-b-2 border-light-gray top-0",
    {'w-screen fixed': scrolledUp}
]

const MobileNavbar = ({className, scrolledUp}: { className?: string, scrolledUp : boolean}) => {

    const pathname = usePathname()
    const router = useRouter()

    const handleMenuClick = () => {
        if (pathname.includes("/mobile/menu")) router.back()
        else router.push("/mobile/menu")
    }

    const handleCatalogClick = () => router.push("/mobile/menu/catalog")
    const handleLogoClick = () => router.push("/")

    return (
        <React.Fragment>
            <nav className={cn(wrapperStyles(scrolledUp), className)}>
                <div onClick={handleMenuClick}>
                    {
                        !pathname.includes("/mobile/menu")
                            ? <FiMenu size={"18px"}/>
                            : <FiX size={"18px"}/>
                    }
                </div>
                <div onClick={handleLogoClick}>
                    <DIOLogoSmall/>
                </div>
                <FiSearch
                    onClick={handleCatalogClick}
                    size={"18px"}
                />
            </nav>
        </React.Fragment>
    );

};

export default MobileNavbar;
