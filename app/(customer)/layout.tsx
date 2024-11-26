import Navbar from "@/components/organisms/bars/navbar/Navbar";
import Searchbar from "@/components/organisms/bars/searchbar/Searchbar";
import React from "react";

const CustomerLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <Searchbar />
    {children}
  </>
);

export default CustomerLayout;
