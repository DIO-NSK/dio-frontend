import React, {useEffect} from 'react';
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import HeaderDescriptionButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescriptionButtonRow";
import {useToggle} from "@/utlis/hooks/useToggle";
import AddOurWaterPopup from "@/components/organisms/popups/admin/add-our-water-popup/AddOurWaterPopup";
import AdminWaterCard from "@/components/organisms/cards/admin-water-card/AdminWaterCard";
import {
    $ourWaters,
    deleteOurWaterEvent,
    getAllOurWatersEvent,
    setOurWaterToEditEvent
} from "@/app/admin/promo/models/our_waters.model";
import {useUnit} from "effector-react";

const AdminPanelOurWatersBlock = () => {

    const popupToggle = useToggle()

    const [ourWaters, getOurWaters, deleteCard, editCard]
        = useUnit([$ourWaters, getAllOurWatersEvent, deleteOurWaterEvent, setOurWaterToEditEvent])

    useEffect(() => {
        getOurWaters()
    }, []);

    return (
        <React.Fragment>
            {popupToggle.state && <AddOurWaterPopup
                onClose={popupToggle.toggleState}
            />}
            <HeaderDescriptionButtonRow
                button={
                    <Button
                        size={"sm"} buttonType={"SECONDARY"}
                        icon={<FiPlus size={"18px"}/>}
                        onClick={popupToggle.toggleState}
                        text={"Добавить"}
                    />
                }
                descr={"Вы можете изменить расположение карточек дня в слайдере в режиме редактирования"}
                header={"Наши воды"}
                className={"w-full mx-[-28px] px-7 pb-7 border-b-2 border-light-gray"}
            />
            <div className={"w-full grid grid-cols-3 gap-7"}>
                {ourWaters.map((waterCard, index) => (
                        <AdminWaterCard
                            waterCard={waterCard}
                            onEdit={() => editCard(waterCard)}
                            onDelete={() => deleteCard(waterCard.id)}
                            key={index}
                        />
                    )
                )}
            </div>
        </React.Fragment>
    );
};

export default AdminPanelOurWatersBlock;
