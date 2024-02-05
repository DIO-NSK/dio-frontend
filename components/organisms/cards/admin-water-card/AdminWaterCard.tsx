import React from 'react';
import {PromoCard} from "@/types/dto/PromoCard";
import AdminPhotoCard from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard";
import {FiChevronRight} from "react-icons/fi";
import Text from "@/components/atoms/text/text-base/Text";

type AdminWaterCardProps = {
    waterCard : PromoCard,
    onDelete : () => void
}

const AdminWaterCard = (props : AdminWaterCardProps) => {
    return (
        <div className={"flex flex-col gap-4"}>
            <AdminPhotoCard
                className={"bg-bg-light-blue"}
                onDelete={props.onDelete}
                file={props.waterCard.file}
            />
            <a target="_blank" href={props.waterCard.link} rel="noopener noreferrer">
                <div className={"flex flex-row items-center gap-2 hover:text-link-blue hoverable pointer"}>
                    <Text text={props.waterCard.link} className={"text-[18px]"}/>
                    <FiChevronRight size={"18px"}/>
                </div>
            </a>
        </div>
    );
};

export default AdminWaterCard;
