'use client'

import Footer from "@/components/organisms/footer/Footer";
import React, {useEffect, useState} from "react";
import MobileNavbar from "@/components/mobile/moleculas/bars/navbar/MobileNavbar";
import {useScrollDirection} from "react-use-scroll-direction";
import {cn} from "@/utlis/cn";
import {BREAKPOINT_MOBILE} from "@/constants";

const SiteLayout = ({children}: { children: React.ReactNode }) => {

    const [scrolledUp, setScrolledUp] = useState<boolean>(false)
    const {isScrollingUp, isScrollingDown} = useScrollDirection();

    const isMobile = typeof window !== 'undefined' && window.innerWidth < BREAKPOINT_MOBILE;

    useEffect(() => {
        if (isScrollingUp) {
            setScrolledUp(true)
        } else if (isScrollingDown) {
            setScrolledUp(false)
        }
    }, [isScrollingUp, isScrollingDown]);

    return (
        <React.Fragment>
            <section className={"w-full flex flex-col gap-7 sm:gap-0"}>
                <MobileNavbar scrolledUp={scrolledUp}/>
                <div className={cn('w-full flex flex-col gap-7 sm:hidden', scrolledUp && 'mt-[90px]')}>
                    {isMobile ? children : null}
                </div>
                <div className={'hidden w-full min-h-screen sm:flex flex-col gap-7 sm:gap-0'}>
                    {!isMobile ? children : null}
                </div>
            </section>
            <Footer/>
        </React.Fragment>
    )

};

export default SiteLayout;
