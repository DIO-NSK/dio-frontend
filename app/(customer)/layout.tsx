import Navbar from "@/components/organisms/bars/navbar/Navbar";
import Searchbar from "@/components/organisms/bars/searchbar/Searchbar";
import React from 'react';

const CustomerLayout = ({ children }: { children: React.ReactNode }) => (
    <React.Fragment>
        <Navbar />
        <Searchbar />
        {children}
    </React.Fragment>
);

export default CustomerLayout;
