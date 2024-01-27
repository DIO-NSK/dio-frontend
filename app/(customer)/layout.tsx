import React from 'react';
import Navbar from "@/components/organisms/bars/navbar/Navbar";
import Searchbar from "@/components/organisms/bars/searchbar/Searchbar";

const CustomerLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <section>
            <Navbar/>
            <Searchbar/>
            {children}
        </section>
    );
};

export default CustomerLayout;
