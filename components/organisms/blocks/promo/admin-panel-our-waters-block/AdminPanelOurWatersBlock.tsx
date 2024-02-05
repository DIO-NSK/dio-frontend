import React, {useState} from 'react';
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import HeaderDescrButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescrButtonRow";
import {useToggle} from "@/utlis/hooks/useToggle";
import {PromoCard} from "@/types/dto/PromoCard";
import AddOurWaterPopup from "@/components/organisms/popups/admin/add-our-water-popup/AddOurWaterPopup";
import AdminWaterCard from "@/components/organisms/cards/admin-water-card/AdminWaterCard";

const AdminPanelOurWatersBlock = () => {

    const {...toggle} = useToggle()
    const [waterCards, setWaterCards] = useState<PromoCard[]>([])
    const handleAddCard = (card: PromoCard) => setWaterCards([...waterCards, card])
    const handleDeleteCard = (indexToDelete: number) => {
        const filteredCards = waterCards.filter((_, index) => index !== indexToDelete)
        setWaterCards(filteredCards)
    }

    return (
        <>
            {
                toggle.state && <AddOurWaterPopup
                    onAddItem={handleAddCard}
                    onClose={toggle.toggleState}
                />
            }
            <HeaderDescrButtonRow
                button={
                    <Button
                        size={"sm"} buttonType={"SECONDARY"}
                        icon={<FiPlus size={"18px"}/>}
                        onClick={toggle.toggleState}
                        text={"Добавить"}
                    />
                }
                descr={"Вы можете изменить расположение карточек дня в слайдере в режиме редактирования"}
                header={"Наши воды"}
                className={"w-full mx-[-28px] px-7 pb-7 border-b-2 border-light-gray"}
            />
            <div className={"w-full grid grid-cols-3 gap-7"}>
                {
                    waterCards.map((waterCard, index) =>
                        waterCard && <AdminWaterCard
                            waterCard={waterCard}
                            onDelete={() => handleDeleteCard(index)}
                            key={index}
                        />
                    )
                }
            </div>
        </>
    );
};

export default AdminPanelOurWatersBlock;
