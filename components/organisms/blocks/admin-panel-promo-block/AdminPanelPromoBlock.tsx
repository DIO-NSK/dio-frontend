import React from 'react';
import HeaderDescrButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescrButtonRow";
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import {useVariableItemRow} from "@/utlis/hooks/useVariableItemRow";
import {useToggle} from "@/utlis/hooks/useToggle";
import AdminPhotoCard from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard";
import AddPromoPopup from "@/components/organisms/popups/admin/add-promo-popup/AddPromoPopup";

const AdminPanelPromoBlock = () => {

    const {...photoBlock} = useVariableItemRow<File | undefined>(undefined)
    const {...toggle} = useToggle()

    return (
        <>
            {toggle.state && <AddPromoPopup onClose={toggle.toggleState}/>}
            <div className={"w-full mx-[-28px] px-7 flex flex-col gap-5 pb-7 border-b-2 border-light-gray"}>

                <HeaderDescrButtonRow
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
                />

                <div className={"w-full grid grid-cols-3 gap-7"}>
                    {
                        photoBlock.state.map((photo, index) =>
                                photo && <AdminPhotoCard
                                    key={index} file={photo}
                                    onDelete={() => photoBlock.handlers.handleDeleteItem(index)}
                                />
                        )
                    }
                </div>

            </div>
        </>
    );

};

export default AdminPanelPromoBlock;
