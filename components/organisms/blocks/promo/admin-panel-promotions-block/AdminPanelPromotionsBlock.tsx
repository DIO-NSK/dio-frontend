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
    deletePromotionEvent,
    getAllPromotionsEvent,
    setPromotionToEditEvent
} from "@/app/admin/promo/models/promotion.model";

const AdminPanelPromotionsBlock = () => {

    const toggle = useToggle()
    const [promos, getPromos] = useUnit([$promotions, getAllPromotionsEvent])
    const [deletePromo, setPromoToEdit] = useUnit([deletePromotionEvent, setPromotionToEditEvent])

    useEffect(() => {
        getPromos()
    }, [])

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
            <div className={"w-full grid grid-cols-3 gap-7"}>
                {promos.map((promotion, index) =>
                    <AdminPhotoCard
                        editable={toggle.state}
                        defaultImage={promotion.image}
                        onEdit={() => setPromoToEdit(promotion)}
                        onDelete={() => deletePromo(promotion.id)}
                        key={index}
                    />
                )}
            </div>
        </React.Fragment>
    );
};

export default AdminPanelPromotionsBlock;
