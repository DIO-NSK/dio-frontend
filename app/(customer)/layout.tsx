import React from 'react';
import Navbar from "@/components/organisms/bars/navbar/Navbar";
import Searchbar from "@/components/organisms/bars/searchbar/Searchbar";

const CustomerLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar/>
            <Searchbar/>
            {children}
        </>
    );
};

export default CustomerLayout;
