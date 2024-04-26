"use client"

import AdminPhotoCard from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard";
import {FiChevronRight} from "react-icons/fi";
import Text from "@/components/atoms/text/text-base/Text";
import {ResponseOurWater} from "@/app/admin/promo/models/our_waters.model";
import {useRouter} from "next/navigation";

type AdminWaterCardProps = {
    editable : boolean,
    waterCard: ResponseOurWater,
    onEdit: () => void,
    onDelete: () => void
}

const AdminWaterCard = (props: AdminWaterCardProps) => {

    const router = useRouter()
    const onClick = () => router.push(props.waterCard.filterCharacteristic)

    return (
        <div className={"flex flex-col gap-4"}>
            <AdminPhotoCard defaultImage={props.waterCard.image} {...props}/>
            <div className={"flex flex-row items-center gap-2 hover:text-link-blue hoverable pointer"} onClick={onClick}>
                <Text text={props.waterCard.name} className={"text-[18px]"}/>
                <FiChevronRight size={"18px"}/>
            </div>
        </div>
    );

};

export default AdminWaterCard;
