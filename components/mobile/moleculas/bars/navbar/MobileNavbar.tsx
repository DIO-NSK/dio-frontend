"use client"

import {FiMenu, FiSearch, FiX} from "react-icons/fi";
import DIOLogoSmall from "@/components/atoms/svg/dio-logo-small/DIOLogoSmall";
import {usePathname, useRouter} from "next/navigation";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

const MobileNavbar = ({sticky = true}: { sticky?: boolean }) => {

    const pathname = usePathname()
    const router = useRouter()

    const handleMenuClick = () => {
        if (pathname.includes("/menu")) router.back()
        else router.push("/menu")
    }

    const handleLogoClick = () => router.push("/")
    const handleSearchClick = () => router.push("/menu/catalog")

    const wrapperCV: ClassValue[] = [
        "z-20 sm:hidden w-full flex flex-row items-center px-5 bg-white",
        "justify-between py-5 border-b-2 border-light-gray top-0",
        {"sticky": sticky}
    ]

    return (
        <nav className={cn(wrapperCV)}>
            <div onClick={handleMenuClick}>
                {
                    !pathname.includes("/menu")
                        ? <FiMenu size={"18px"}/>
                        : <FiX size={"18px"}/>
                }
            </div>
            <div onClick={handleLogoClick}>
                <DIOLogoSmall/>
            </div>
            <FiSearch size={"18px"} onClick={handleSearchClick}/>
        </nav>
    );

};

export default MobileNavbar;
