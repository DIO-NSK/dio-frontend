import React from 'react';
import Footer from "@/components/organisms/footer/Footer";

const SiteLayout = ({children} : {children : React.ReactNode}) => {
    return (
        <>
            {children}
            <Footer/>
        </>
    );
};

export default SiteLayout;
