import React, {useEffect} from 'react';
import {useToggle} from "@/utlis/hooks/useToggle";
import HeaderDescriptionButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescriptionButtonRow";
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import AdminPhotoCard from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard";
import AddPromotionPopup from "@/components/organisms/popups/admin/add-promotion-popup/AddPromotionPopup";
import {useUnit} from "effector-react";
import {
    $promotions,
    changePromotionsOrderEvent,
    deletePromotionEvent,
    getAllPromotionsEvent,
    ResponsePromotion,
    setPromotionToEditEvent
} from "@/app/admin/promo/models/promotion.model";
import {closestCenter, DndContext} from "@dnd-kit/core";
import {restrictToHorizontalAxis} from "@dnd-kit/modifiers";
import {horizontalListSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import SortableItemWrapper from "@/components/wrappers/sortable-wrapper/SortableItemWrapper";
import {BannersBlockProps} from "@/components/organisms/blocks/promo/admin-panel-promo-block/AdminPanelPromoBlock";


const PromotionBlock = ({openPopup}: BannersBlockProps) => {

    const [setPromotionToEdit, deletePromo, changeOrder]
        = useUnit([setPromotionToEditEvent, deletePromotionEvent, changePromotionsOrderEvent])

    const [promos, getPromos] = useUnit([$promotions, getAllPromotionsEvent])

    const handleEditPromo = (promotion: ResponsePromotion) => {
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
            modifiers={[restrictToHorizontalAxis]}
        >
            <SortableContext
                items={promos.map(banner => banner.id)}
                strategy={horizontalListSortingStrategy}
            >
                <div className={"-mx-7 px-7 w-full grid grid-cols-3 gap-7"}>
                    {promos?.map((banner, index) =>
                        <SortableItemWrapper sequenceNumber={banner.id} key={banner.id}>
                            <AdminPhotoCard
                                canDelete={true} editable={true}
                                onEdit={() => handleEditPromo(banner)}
                                onDelete={() => deletePromo(banner.id)}
                                defaultImage={banner.image}
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
                        icon={<FiPlus size={"18px"}/>}
                        onClick={toggle.toggleState}
                        text={"Добавить"}
                    />
                }
                descr={"Вы можете изменить расположение товаров дня в слайдере в режиме редактирования"}
                header={"Акции и предложения"}
                className={"w-full mx-[-28px] px-7 pb-7 border-b-2 border-light-gray"}
            />
            <PromotionBlock openPopup={toggle.toggleState}/>
        </React.Fragment>
    );
};

export default AdminPanelPromotionsBlock;
