"use client";

import CatalogFilters from "@/components/organisms/catalog-filters/CatalogFilters";
import DesktopCatalogScreen from "@/app/(customer)/(site)/(inner-pages)/catalog/[categoryId]/ui/DesktopCatalogScreen";
import React from "react";
import {useToggle} from "@/utlis/hooks/useToggle";

const ClientCatalogScreen = ({categoryId}: { categoryId: number }) => {

    const popupToggle = useToggle()

    return (
        <React.Fragment>
            {
                popupToggle.state
                    ? <CatalogFilters categoryId={categoryId} onClose={popupToggle.toggleState}/>
                    : <DesktopCatalogScreen onOpenPopup={popupToggle.toggleState} categoryId={categoryId}/>
            }
        </React.Fragment>
    );
};

export default ClientCatalogScreen;
