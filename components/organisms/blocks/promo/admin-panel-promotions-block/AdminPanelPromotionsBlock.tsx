import React, {useState} from 'react';
import {useToggle} from "@/utlis/hooks/useToggle";
import {PromoCard} from "@/types/dto/PromoCard";
import HeaderDescriptionButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescriptionButtonRow";
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import AdminPhotoCard from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard";
import AddPromotionPopup from "@/components/organisms/popups/admin/add-promotion-popup/AddPromotionPopup";

const AdminPanelPromotionsBlock = () => {

    const {...toggle} = useToggle()
    const [promotions, setPromotions] = useState<PromoCard[]>([])
    const handleAddPromotion = (card: PromoCard) => setPromotions([...promotions, card])
    const handleDeletePromotion = (indexToDelete: number) => {
        const filteredCards = promotions.filter((_, index) => index !== indexToDelete)
        setPromotions(filteredCards)
    }

    return (
        <>
            {
                toggle.state && <AddPromotionPopup
                    onAddItem={handleAddPromotion}
                    onClose={toggle.toggleState}
                />
            }
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
                {
                    promotions.map((promotion, index) =>
                        promotion && <AdminPhotoCard
                            file={promotion.file}
                            onDelete={() => handleDeletePromotion(index)}
                            key={index}
                        />
                    )
                }
            </div>
        </>
    );
};

export default AdminPanelPromotionsBlock;
