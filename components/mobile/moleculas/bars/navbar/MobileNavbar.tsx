"use client"

import {FiMenu, FiSearch, FiX} from "react-icons/fi";
import DIOLogoSmall from "@/components/atoms/svg/dio-logo-small/DIOLogoSmall";
import {usePathname, useRouter} from "next/navigation";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import React from "react";

const MobileNavbar = ({className}: { className?: string }) => {

    const pathname = usePathname()
    const router = useRouter()

    const handleMenuClick = () => {
        if (pathname.includes("/mobile/menu")) router.back()
        else router.push("/mobile/menu")
    }

    const handleCatalogClick = () => router.push("/mobile/menu/catalog")
    const handleLogoClick = () => router.push("/")

    const wrapperCV: ClassValue[] = [
        "z-20 sm:hidden w-full flex flex-row items-center px-5 bg-white",
        "justify-between py-5 border-b-2 border-light-gray top-0",
    ]

    return (
        <React.Fragment>
            <nav className={cn(wrapperCV, className)}>
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
                    size={"18px"}
                    onClick={handleCatalogClick}
                />
            </nav>
        </React.Fragment>
    );

};

export default MobileNavbar;
