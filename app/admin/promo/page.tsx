"use client"

import React from 'react';
import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import AdminPanelSaveDiscardChangesRow
    from "@/components/organisms/rows/admin-panel-save-discard-changes-row/AdminPanelSaveDiscardChangesRow";
import {useAdminPanelHeaderRow} from "@/components/organisms/rows/admin-panel-header-row/AdminPanelHeaderRow.hooks";
import AdminPanelPhotoBlock from "@/components/organisms/blocks/admin-panel-photo-block/AdminPanelPhotoBlock";
import {useAdminPanelPromoPage} from "@/app/admin/promo/page.hooks";
import AdminPanelPromoBlock from "@/components/organisms/blocks/admin-panel-promo-block/AdminPanelPromoBlock";

const PromoActions = () => {

    const {...context} = useAdminPanelPromoPage()

    return (
        <AdminPanelPhotoBlock
            header={"Промо-акции"}
            description={"Вы можете изменить расположение промо-акций в слайдере в режиме редактирования"}
            photos={context.photoBlock.photos}
            onAddPhoto={context.photoBlock.handleAddPhoto}
            onDeletePhoto={context.photoBlock.handleDeletePhoto}
        />
    )

}

const PromoContent = () => {

    const {...context} = useAdminPanelPromoPage()

    switch (context.multiselectButton.activeItem) {
        case "Промо-акции" : return <AdminPanelPromoBlock />
        case "Товары дня" : return <AdminPanelPromoBlock />
        case "Наши воды" : return <AdminPanelPromoBlock />
        case "Акции и предложения" : return <AdminPanelPromoBlock />
        default : return null
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
                        <AdminPanelSaveDiscardChangesRow
                            isEditable={editableContext.isEditable}
                            onChange={editableContext.handleSwitchEditable}
                        />
                    </div>
                }
            />
            <PromoContent />
        </>
    );

};

export default AdminPanelPromoPage;
