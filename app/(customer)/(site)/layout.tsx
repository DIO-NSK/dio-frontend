import Footer from "@/components/organisms/footer/Footer";
import React from "react";
import MobileNavbar from "@/components/mobile/moleculas/bars/navbar/MobileNavbar";

const SiteLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <>
            <section className={"w-full flex flex-col gap-7 sm:gap-0"}>
                <MobileNavbar/>
                {children}
            </section>
            <Footer/>
        </>
    );
};

export default SiteLayout;
