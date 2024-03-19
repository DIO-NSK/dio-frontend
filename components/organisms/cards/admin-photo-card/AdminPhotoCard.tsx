import React from 'react';
import {ClassValue} from "clsx";
import ConnectForm from "@/components/organisms/forms/connect-form/ConnectForm";
import {Controller, FieldValues, Path, UseFormReturn} from "react-hook-form";
import {cn} from "@/utlis/cn";
import SquareIcon from "@/components/atoms/icons/square-icon/SquareIcon";
import {FiMenu} from "react-icons/fi";
import ClosePopupButton from "@/components/atoms/buttons/close-popup-button/ClosePopupButton";

type AdminPhotoCardProps = {
    name?: string,
    className?: string,
    onDelete?: () => void
}

const AdminPhotoCard = (props: AdminPhotoCardProps) => {

    const closeButtonCV: ClassValue[] = [
        "w-7 h-7 text-[18px] bg-black bg-opacity-30 text-white",
        "pointer hoverable hover:text-white hover:bg-opacity-50 m-0",
    ]

    return (
        <ConnectForm>
            {(methods: UseFormReturn<FieldValues, any, FieldValues>) => (
                <Controller
                    control={methods.control}
                    name={props.name as Path<FieldValues>}
                    render={({field: {value}}) => {

                        const image = URL.createObjectURL(value)

                        return (
                            <div
                                className={cn("col-span-1 relative h-[150px] rounded-xl border-2 border-light-gray", props.className)}>
                                <img src={image} alt={"Фотография продукта"}
                                     className={"w-full h-full object-scale-down"}/>
                                <div className={"absolute flex flex-row items-center gap-3 z-10 top-5 right-5"}>
                                    <SquareIcon icon={<FiMenu size={"18px"}/>}/>
                                    <ClosePopupButton
                                        className={cn(closeButtonCV)}
                                        onClose={props.onDelete}
                                    />
                                </div>
                            </div>
                        )

                    }}
                />
            )}
        </ConnectForm>

    );

};

export default AdminPhotoCard;
