"use client"

import React, {useState} from 'react';
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import AdminPanelPromoBlock from "@/components/organisms/blocks/promo/admin-panel-promo-block/AdminPanelPromoBlock";
import AdminPanelDayProductsBlock
    from "@/components/organisms/blocks/promo/admin-panel-day-products-block/AdminPanelDayProductsBlock";
import AdminPanelOurWatersBlock
    from "@/components/organisms/blocks/promo/admin-panel-our-waters-block/AdminPanelOurWatersBlock";
import AdminPanelPromotionsBlock
    from "@/components/organisms/blocks/promo/admin-panel-promotions-block/AdminPanelPromotionsBlock";
import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import {SelectItem} from "@/types/props/SelectItem";

export type BannerType = "promo" | "banner" | "day_products" | "our_waters"

const items: SelectItem<BannerType>[] = [
    {name: "Баннеры", value: "banner"},
    {name: "Товары дня", value: "day_products"},
    {name: "Наши воды", value: "our_waters"},
    {name: "Акции и предложения", value: "promo"},
]

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

    const [
        activeItem,
        setActiveItem
    ] = useState<SelectItem<BannerType>>(items[0])

    return (
        <React.Fragment>
            <HeaderRow
                theme={"bordered"}
                className={"w-full"}
                header={"Промо-акции"}
                rightContent={
                    <MultiselectButton
                        className={"max-w-[60vw]"}
                        selectElement={setActiveItem}
                        activeElement={activeItem}
                        elements={items}
                    />
                }
            />
            <PromoContent activeItem={activeItem}/>
        </React.Fragment>
    );

};

export default AdminPanelPromoPage;
