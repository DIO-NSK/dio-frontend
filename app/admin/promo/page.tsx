"use client"

import React from 'react';
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {BannerType, useAdminPanelPromoPage} from "@/app/admin/promo/page.hooks";
import AdminPanelPromoBlock from "@/components/organisms/blocks/promo/admin-panel-promo-block/AdminPanelPromoBlock";
import AdminPanelDayProductsBlock
    from "@/components/organisms/blocks/promo/admin-panel-day-products-block/AdminPanelDayProductsBlock";
import AdminPanelOurWatersBlock
    from "@/components/organisms/blocks/promo/admin-panel-our-waters-block/AdminPanelOurWatersBlock";
import AdminPanelPromotionsBlock
    from "@/components/organisms/blocks/promo/admin-panel-promotions-block/AdminPanelPromotionsBlock";
import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import {SelectItem} from "@/types/props/SelectItem";

const PromoContent = ({activeItem}: { activeItem: SelectItem<BannerType> }) => {
    switch (activeItem.value) {
        case "banner" :
            return <AdminPanelPromoBlock/>
        case "day_products" :
            return <AdminPanelDayProductsBlock/>
        case "our_waters" :
            return <AdminPanelOurWatersBlock/>
        case "promo" :
            return <AdminPanelPromotionsBlock/>
    }
}

const AdminPanelPromoPage = () => {

    const {...context} = useAdminPanelPromoPage()

    return (
        <React.Fragment>
            <HeaderRow
                theme={"bordered"}
                className={"w-full"}
                header={"Промо-акции"}
                rightContent={
                    <MultiselectButton
                        className={"max-w-[60vw]"}
                        selectElement={context.multiselectButton.setActiveItem}
                        activeElement={context.multiselectButton.activeItem}
                        elements={context.multiselectButton.items}
                    />
                }
            />
            <PromoContent activeItem={context.multiselectButton.activeItem}/>
        </React.Fragment>
    );

};

export default AdminPanelPromoPage;
