"use client"

import { $userCredentials, getUserCredentialsEvent } from "@/app/(customer)/model";
import DIOLogoSmall from "@/components/atoms/svg/dio-logo-small/DIOLogoSmall";
import Text from "@/components/atoms/text/text-base/Text";
import { cn } from "@/utlis/cn";
import { useUnit } from "effector-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const wrapperStyles = [
    "lg:hidden w-full flex flex-row items-center px-5 md:px-6 bg-white",
    "justify-between py-5"
]

const MobileNavbar = ({ className }: { className?: string }) => {
    const pathname = usePathname()
    const router = useRouter()

    const [userCredentials, getUserCredentials] = useUnit([$userCredentials, getUserCredentialsEvent])
    const rightText = userCredentials?.fullName.split(" ")[1] ?? "Войти";

    const handleLogin = () => {
        if (!userCredentials) {
            router.push("/mobile/authorization")
        }
    }

    const handleLogoClick = () => router.push('/');

    const handleMenuClick = () => {
        if (pathname.includes("/mobile/menu")) router.back()
        else router.push("/mobile/menu")
    }

    useEffect(() => {
        getUserCredentials();
    })

    return (
        <React.Fragment>
            <nav className={cn(wrapperStyles, className)}>
                <div onClick={handleMenuClick}>
                    {
                        !pathname.includes("/mobile/menu")
                            ? <FiMenu size={"18px"} />
                            : <FiX size={"18px"} />
                    }
                </div>
                <div onClick={handleLogoClick}>
                    <DIOLogoSmall />
                </div>
                <Text onClick={handleLogin} text={rightText} className={cn(userCredentials ? 'text-text-black' : 'text-link-blue', 'text-sm')} />
            </nav>
        </React.Fragment>
    );

};

export default MobileNavbar;
