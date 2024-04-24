import React from 'react';
import AdminPhotoCard from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard";
import {FiChevronRight} from "react-icons/fi";
import Text from "@/components/atoms/text/text-base/Text";
import {ResponseOurWater} from "@/app/admin/promo/models/our_waters.model";

type AdminWaterCardProps = {
    waterCard: ResponseOurWater,
    onEdit: () => void,
    onDelete: () => void
}

const AdminWaterCard = (props: AdminWaterCardProps) => {

    const link = "https://localhost:8080/catalog/1"

    return (
        <div className={"flex flex-col gap-4"}>
            <AdminPhotoCard {...props}/>
            <a target="_blank" href={link} rel="noopener noreferrer">
                <div className={"flex flex-row items-center gap-2 hover:text-link-blue hoverable pointer"}>
                    <Text text={props.waterCard.name} className={"text-[18px]"}/>
                    <FiChevronRight size={"18px"}/>
                </div>
            </a>
        </div>
    );

};

export default AdminWaterCard;
