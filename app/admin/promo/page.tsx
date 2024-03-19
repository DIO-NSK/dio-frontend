"use client"

import React from 'react';
import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {useAdminPanelHeaderRow} from "@/components/organisms/rows/admin-panel-header-row/AdminPanelHeaderRow.hooks";
import {useAdminPanelPromoPage} from "@/app/admin/promo/page.hooks";
import AdminPanelPromoBlock from "@/components/organisms/blocks/promo/admin-panel-promo-block/AdminPanelPromoBlock";
import AdminPanelDayProductsBlock
    from "@/components/organisms/blocks/promo/admin-panel-day-products-block/AdminPanelDayProductsBlock";
import AdminPanelOurWatersBlock
    from "@/components/organisms/blocks/promo/admin-panel-our-waters-block/AdminPanelOurWatersBlock";
import AdminPanelPromotionsBlock
    from "@/components/organisms/blocks/promo/admin-panel-promotions-block/AdminPanelPromotionsBlock";

const PromoContent = ({activeItem}: { activeItem: string }) => {

    switch (activeItem) {
        case "Промо-акции" :
            return <AdminPanelPromoBlock/>
        case "Товары дня" :
            return <AdminPanelDayProductsBlock/>
        case "Наши воды" :
            return <AdminPanelOurWatersBlock/>
        case "Акции и предложения" :
            return <AdminPanelPromotionsBlock/>
        default :
            return null
    }

}

const AdminPanelPromoPage = () => {

    const {...context} = useAdminPanelPromoPage()
    const {...editableContext} = useAdminPanelHeaderRow()

    return (
        <>
            <HeaderRow
                theme={"bordered"}
                className={"w-full"}
                header={"Промо-акции"}
                rightContent={
                    <div className={"flex flex-row gap-5"}>
                        <MultiselectButton
                            size={"sm"} className={"w-[800px]"}
                            activeElement={context.multiselectButton.activeItem}
                            selectElement={context.multiselectButton.setActiveItem}
                            elements={context.multiselectButton.items}
                        />
                    </div>
                }
            />
            <PromoContent activeItem={context.multiselectButton.activeItem}/>
        </>
    );

};

export default AdminPanelPromoPage;
