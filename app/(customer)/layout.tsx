import React from 'react';
import Navbar from "@/components/organisms/bars/navbar/Navbar";
import Searchbar from "@/components/organisms/bars/searchbar/Searchbar";

const CustomerLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <React.Fragment>
            <Navbar/>
            <Searchbar/>
            {children}
        </React.Fragment>
    );
};

export default CustomerLayout;
