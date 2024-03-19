import React, {useState} from 'react';
import HeaderDescriptionButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescriptionButtonRow";
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import {useToggle} from "@/utlis/hooks/useToggle";
import AdminPhotoCard from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard";
import AddPromoPopup from "@/components/organisms/popups/admin/add-promo-popup/AddPromoPopup";
import {PromoCard} from "@/types/dto/PromoCard";

const AdminPanelPromoBlock = () => {

    const {...toggle} = useToggle()

    const [promoCards, setPromoCards] = useState<PromoCard[]>([])
    const handleAddPromoCard = (promoCard : PromoCard) => setPromoCards([...promoCards, promoCard])
    const handleDeletePromoCard = (indexToDelete : number) => {
        const filteredPromoCards = promoCards.filter((_, index) => index !== indexToDelete)
        setPromoCards(filteredPromoCards)
    }

    return (
        <>
            {
                toggle.state && <AddPromoPopup
                    onAddItem={handleAddPromoCard}
                    onClose={toggle.toggleState}
                />
            }
            <div className={"flex flex-col gap-7"}>

                <HeaderDescriptionButtonRow
                    button={
                        <Button
                            size={"sm"} buttonType={"SECONDARY"}
                            icon={<FiPlus size={"18px"}/>}
                            onClick={toggle.toggleState}
                            text={"Добавить"}
                        />
                    }
                    descr={"Вы можете изменить расположение промо-акций в слайдере в режиме редактирования"}
                    header={"Промо-акции"}
                    className={"w-full mx-[-28px] px-7 pb-7 border-b-2 border-light-gray"}
                />

                <div className={"w-full grid grid-cols-3 gap-7"}>
                    {
                        promoCards.map((promoCard, index) =>
                            promoCard && <AdminPhotoCard key={index}/>
                        )
                    }
                </div>

            </div>
        </>
    );

};

export default AdminPanelPromoBlock;
