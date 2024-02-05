import React from 'react';
import SquareIcon from "@/components/atoms/icons/square-icon/SquareIcon";
import {FiMenu} from "react-icons/fi";
import ClosePopupButton from "@/components/atoms/buttons/close-popup-button/ClosePopupButton";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

type AdminPhotoCardProps = {
    file : File,
    onDelete : () => void,
    onDrag ?: () => void,
    className ?: string
}

const AdminPhotoCard = (props : AdminPhotoCardProps) => {

    const image = URL.createObjectURL(props.file)

    const closeButtonCV : ClassValue[] = [
        "w-7 h-7 text-[18px] bg-black bg-opacity-30 text-white",
        "pointer hoverable hover:text-white hover:bg-opacity-50 m-0",
    ]

    return (
        <div className={cn("col-span-1 relative h-[150px] rounded-xl border-2 border-light-gray", props.className)}>
            <img src={image} alt={"Фотография продукта"} className={"w-full h-full object-scale-down"}/>
            <div className={"absolute flex flex-row items-center gap-3 z-10 top-5 right-5"}>
                <SquareIcon icon={<FiMenu size={"18px"}/>} onClick={props.onDrag}/>
                <ClosePopupButton
                    onClose={props.onDelete}
                    className={cn(closeButtonCV)}
                />
            </div>
        </div>
    );

};

export default AdminPhotoCard;
