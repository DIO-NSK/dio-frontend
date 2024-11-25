"use client";

import SearchbarIconButtonList from "@/components/moleculas/lists/searchbar-icon-button-list/SearchbarIconButtonList";
import { useSearchbar } from "@/components/organisms/bars/searchbar/Searchbar.hooks";
import CatalogPopup from "@/components/organisms/popups/catalog/CatalogPopup";
import { ResponsiveContainer } from "@/components/wrappers";
import { cn } from "@/utlis/cn";
import React from "react";
import { createPortal } from "react-dom";
import { ActivePopup } from "./ActivePopup";
import { LeftRow } from "./LeftRow";
import { wrapperCV } from "./Searchbar.styles";
import { SiteLogo } from "./SiteLogo";

const Searchbar = () => {
  const { isLaptop, ...context } = useSearchbar();

  return (
    <React.Fragment>
      {typeof window !== "undefined" ? createPortal(<CatalogPopup />, document.body) : null}
      {typeof window !== "undefined" ? createPortal(<ActivePopup />, document.body) : null}
      <ResponsiveContainer>
        <div className={cn(wrapperCV)}>
          <SiteLogo context={context} />
          <LeftRow isLaptop={isLaptop} />
          <SearchbarIconButtonList />
        </div>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default Searchbar;
