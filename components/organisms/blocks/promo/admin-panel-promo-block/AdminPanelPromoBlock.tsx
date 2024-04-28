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
    changeBannersOrderEvent,
    deleteBannerEvent,
    getAllBannersEvent,
    ResponseBanner,
    setBannerIdToEditEvent
} from "@/app/admin/promo/models/banner.model";
import {closestCenter, DndContext} from "@dnd-kit/core";
import {horizontalListSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import SortableItemWrapper from "@/components/wrappers/sortable-wrapper/SortableItemWrapper";

export type BannersBlockProps = {
    openPopup: () => void
}

const BannersBlock = ({openPopup}: BannersBlockProps) => {

    const setBannerIdToEdit = useUnit(setBannerIdToEditEvent)

    const [banners, getAllBanners, deleteBanner, changeOrder]
        = useUnit([$banners, getAllBannersEvent, deleteBannerEvent, changeBannersOrderEvent])

    const handleEditBanner = (banner: ResponseBanner) => {
        setBannerIdToEdit(banner)
        openPopup()
    }

    useEffect(() => {
        getAllBanners()
    }, []);

    if (banners.length) return (
        <DndContext
            onDragEnd={changeOrder}
            collisionDetection={closestCenter}
        >
            <SortableContext
                items={banners.map(banner => banner.id)}
                strategy={horizontalListSortingStrategy}
            >
                <div className={"-mx-7 px-7 w-full grid grid-cols-3 gap-7"}>
                    {banners.map((banner, index) =>
                        <SortableItemWrapper sequenceNumber={banner.id} key={banner.id}>
                            <AdminPhotoCard
                                canDelete={true} editable={true}
                                onEdit={() => handleEditBanner(banner)}
                                onDelete={() => deleteBanner(banner.id)}
                                defaultImage={banner.image}
                            />
                        </SortableItemWrapper>
                    )}
                </div>
            </SortableContext>
        </DndContext>
    )

}

const AdminPanelPromoBlock = () => {

    const toggle = useToggle()

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
                <BannersBlock openPopup={toggle.toggleState}/>
            </div>
        </React.Fragment>
    );

};

export default AdminPanelPromoBlock;
