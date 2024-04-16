import React, {useEffect} from 'react';
import HeaderDescriptionButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescriptionButtonRow";
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import {useToggle} from "@/utlis/hooks/useToggle";
import AdminPhotoCard from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard";
import AddPromoPopup from "@/components/organisms/popups/admin/add-promo-popup/AddPromoPopup";
import {useUnit} from "effector-react";
import {$banners, deleteBannerEvent, getAllBannersEvent} from "@/app/admin/promo/model";

const AdminPanelPromoBlock = () => {

    const [banners, getAllBanners, deleteBanner]
        = useUnit([$banners, getAllBannersEvent, deleteBannerEvent])

    const {...toggle} = useToggle()

    useEffect(() => {
        getAllBanners()
    }, []);

    return (
        <React.Fragment>
            {toggle.state && <AddPromoPopup onClose={toggle.toggleState}/>}
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
                    {banners?.map((banner, index) =>
                        <AdminPhotoCard
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
