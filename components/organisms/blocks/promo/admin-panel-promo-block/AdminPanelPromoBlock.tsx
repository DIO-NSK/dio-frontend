import React, {useEffect} from 'react';
import HeaderDescriptionButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescriptionButtonRow";
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import {useToggle} from "@/utlis/hooks/useToggle";
import AdminPhotoCard from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard";
import AddPromoPopup from "@/components/organisms/popups/admin/add-promo-popup/AddPromoPopup";
import {useUnit} from "effector-react";
import {
    $banners,
    deleteBannerEvent,
    getAllBannersEvent,
    ResponseBanner,
    setBannerIdToEditEvent
} from "@/app/admin/promo/models/banner.model";

const AdminPanelPromoBlock = () => {

    const editMode = useToggle()

    const setBannerIdToEdit = useUnit(setBannerIdToEditEvent)
    const [banners, getAllBanners, deleteBanner]
        = useUnit([$banners, getAllBannersEvent, deleteBannerEvent])

    const toggle = useToggle()

    const handleEditBanner = (banner: ResponseBanner) => {
        if (editMode.state) {
            setBannerIdToEdit(banner)
            toggle.toggleState()
        }
    }

    useEffect(() => {
        getAllBanners()
    }, []);

    return (
        <React.Fragment>
            {toggle.state && <AddPromoPopup onClose={toggle.toggleState}/>}
            <div className={"flex flex-col gap-7"}>

                <HeaderDescriptionButtonRow
                    button={
                        <div className={"flex flex-row gap-5"}>
                            <Button
                                size={"sm"} buttonType={"SECONDARY"}
                                icon={<FiPlus size={"18px"}/>}
                                onClick={toggle.toggleState}
                                text={"Добавить"}
                            />
                            <Button
                                size={"sm"} buttonType={"SECONDARY"}
                                onClick={editMode.toggleState}
                                text={"Редактировать"}
                            />
                        </div>
                    }
                    descr={"Вы можете изменить расположение промо-акций в слайдере в режиме редактирования"}
                    header={"Промо-акции"}
                    className={"w-full mx-[-28px] px-7 pb-7 border-b-2 border-light-gray"}
                />

                <div className={"-mx-7 px-7 w-full grid grid-cols-3 gap-7"}>
                    {banners?.map((banner, index) =>
                        <AdminPhotoCard
                            editable={editMode.state}
                            onEdit={() => handleEditBanner(banner)}
                            onDelete={() => deleteBanner(banner.id)}
                            defaultImage={banner.image}
                            key={index}
                        />
                    )}
                </div>

            </div>
        </React.Fragment>
    );

};

export default AdminPanelPromoBlock;
