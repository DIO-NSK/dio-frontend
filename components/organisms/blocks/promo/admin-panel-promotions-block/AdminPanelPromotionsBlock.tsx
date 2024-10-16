import { ResponseCustomerBanner } from '@/app/(customer)/(site)/page.hooks';
import {
    $promotions,
    changePromotionsOrderEvent,
    deletePromotionEvent,
    getAllPromotionsEvent,
    setPromotionToEditEvent
} from "@/app/admin/promo/models/promotion.model";
import Button from "@/components/atoms/buttons/button/Button";
import { BannersBlockProps } from "@/components/organisms/blocks/promo/admin-panel-promo-block/AdminPanelPromoBlock";
import AdminPhotoCard from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard";
import AddPromotionPopup from "@/components/organisms/popups/admin/add-promotion-popup/AddPromotionPopup";
import HeaderDescriptionButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescriptionButtonRow";
import SortableItemWrapper from "@/components/wrappers/sortable-wrapper/SortableItemWrapper";
import { useToggle } from "@/utlis/hooks/useToggle";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useUnit } from "effector-react";
import React, { useEffect } from 'react';
import { FiPlus } from "react-icons/fi";


const PromotionBlock = ({ openPopup }: BannersBlockProps) => {

    const [setPromotionToEdit, deletePromo, changeOrder]
        = useUnit([setPromotionToEditEvent, deletePromotionEvent, changePromotionsOrderEvent])

    const [promos, getPromos] = useUnit([$promotions, getAllPromotionsEvent])

    const handleEditPromo = (promotion: ResponseCustomerBanner) => {
        setPromotionToEdit(promotion)
        openPopup()
    }

    useEffect(() => {
        getPromos()
    }, [])

    if (promos.length) return (
        <DndContext
            onDragEnd={changeOrder}
            collisionDetection={closestCenter}
        >
            <SortableContext
                items={promos.map(banner => banner.id)}
                strategy={horizontalListSortingStrategy}
            >
                <div className={"px-7 w-full grid grid-cols-3 gap-7"}>
                    {promos?.map((banner, index) =>
                        <SortableItemWrapper sequenceNumber={banner.id} key={banner.id}>
                            <AdminPhotoCard
                                canDelete={true} editable={true}
                                onEdit={() => handleEditPromo(banner)}
                                onDelete={() => deletePromo(banner.id)}
                                defaultImage={banner.mainImageUrl}
                                key={index}
                            />
                        </SortableItemWrapper>
                    )}
                </div>
            </SortableContext>
        </DndContext>
    )

}

const AdminPanelPromotionsBlock = () => {

    const toggle = useToggle()

    return (
        <React.Fragment>
            {toggle.state && <AddPromotionPopup
                onClose={toggle.toggleState}
            />}
            <HeaderDescriptionButtonRow
                button={
                    <Button
                        size={"sm"} buttonType={"SECONDARY"}
                        icon={<FiPlus size={"18px"} />}
                        onClick={toggle.toggleState}
                        text={"Добавить"}
                    />
                }
                descr={"Вы можете изменить расположение товаров дня в слайдере в режиме редактирования"}
                header={"Акции и предложения"}
                className={"w-full px-7 pb-7 border-b-2 border-light-gray"}
            />
            <PromotionBlock openPopup={toggle.toggleState} />
        </React.Fragment>
    );
};

export default AdminPanelPromotionsBlock;
