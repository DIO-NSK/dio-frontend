import React, {useEffect} from 'react';
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import HeaderDescriptionButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescriptionButtonRow";
import {useToggle} from "@/utlis/hooks/useToggle";
import AddOurWaterPopup from "@/components/organisms/popups/admin/add-our-water-popup/AddOurWaterPopup";
import AdminWaterCard from "@/components/organisms/cards/admin-water-card/AdminWaterCard";
import {
    $ourWaters,
    changeOurWatersOrderEvent,
    deleteOurWaterEvent,
    getAllOurWatersEvent,
    ResponseOurWater,
    setOurWaterToEditEvent
} from "@/app/admin/promo/models/our_waters.model";
import {useUnit} from "effector-react";
import {closestCenter, DndContext} from "@dnd-kit/core";
import {horizontalListSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import SortableItemWrapper from "@/components/wrappers/sortable-wrapper/SortableItemWrapper";

const OurWatersBlock = ({openPopup}: { openPopup: () => void }) => {

    const [ourWaters, getOurWaters, deleteCard, editCard, changeOrder]
        = useUnit([$ourWaters, getAllOurWatersEvent, deleteOurWaterEvent, setOurWaterToEditEvent, changeOurWatersOrderEvent])

    useEffect(() => {
        getOurWaters()
    }, []);

    const handleEditBanner = (banner: ResponseOurWater) => {
        editCard(banner)
        openPopup()
    }

    if (ourWaters.length) return (
        <DndContext
            onDragEnd={changeOrder}
            collisionDetection={closestCenter}
        >
            <SortableContext
                items={ourWaters.map(banner => banner.id)}
                strategy={horizontalListSortingStrategy}
            >
                <div className={"w-full grid grid-cols-3 gap-7"}>
                    {ourWaters.map((waterCard, index) => (
                            <SortableItemWrapper sequenceNumber={waterCard.id} key={waterCard.id}>
                                <AdminWaterCard
                                    editable
                                    waterCard={waterCard}
                                    onEdit={() => handleEditBanner(waterCard)}
                                    onDelete={() => deleteCard(waterCard.id)}
                                />
                            </SortableItemWrapper>
                        )
                    )}
                </div>
            </SortableContext>
        </DndContext>
    )

}

const AdminPanelOurWatersBlock = () => {

    const popupToggle = useToggle()

    return (
        <React.Fragment>
            {popupToggle.state && <AddOurWaterPopup
                onClose={popupToggle.toggleState}
            />}
            <HeaderDescriptionButtonRow
                button={
                    <div className={"flex flex-row gap-5"}>
                        <Button
                            size={"sm"} buttonType={"SECONDARY"}
                            icon={<FiPlus size={"18px"}/>}
                            onClick={popupToggle.toggleState}
                            text={"Добавить"}
                        />
                    </div>
                }
                descr={"Вы можете изменить расположение карточек дня в слайдере в режиме редактирования"}
                header={"Наши воды"}
                className={"w-full mx-[-28px] px-7 pb-7 border-b-2 border-light-gray"}
            />
            <OurWatersBlock openPopup={popupToggle.toggleState}/>
        </React.Fragment>
    );
};

export default AdminPanelOurWatersBlock;
