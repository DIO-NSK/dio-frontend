import React from 'react';
import {ClassValue} from "clsx";
import ConnectForm from "@/components/organisms/forms/connect-form/ConnectForm";
import {Controller, FieldValues, Path, UseFormReturn} from "react-hook-form";
import {cn} from "@/utlis/cn";
import SquareIcon from "@/components/atoms/icons/square-icon/SquareIcon";
import {FiEdit, FiMenu} from "react-icons/fi";
import ClosePopupButton from "@/components/atoms/buttons/close-popup-button/ClosePopupButton";
import {SortableHandlerProps} from "@/components/wrappers/sortable-wrapper/SortableItemWrapper";
import {useAdminPhotoCard} from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard.utils";

type AdminPhotoCardProps = {
    name?: string,
    className?: string,
    defaultImage?: string,
    canDelete?: boolean,
    draggable?: boolean,
    editable?: boolean,
    onEdit?: () => void,
    onDelete?: () => void
}

const closeButtonCV: ClassValue[] = [
    "w-7 h-7 text-[18px] bg-black bg-opacity-30 text-white",
    "pointer hoverable hover:text-white hover:bg-opacity-50 m-0",
]

const PhotoCard = (props: AdminPhotoCardProps & SortableHandlerProps & {
    value?: File | string
}) => {

    const resolvedImage = props.value ? (
        typeof props.value === "string" ? props.value : URL.createObjectURL(props.value)
    ) : props.defaultImage

    return (
        <div
            className={cn("col-span-1 relative h-[150px] rounded-xl border-2 border-light-gray overflow-clip", props.className)}
        >
            <img
                src={resolvedImage}
                alt={"Фотография продукта"}
                className={"w-full h-full object-scale-down"}
            />
            <div className={"absolute flex flex-row items-center gap-3 z-10 top-5 right-5"}>
                {(props.editable || props.draggable) && <React.Fragment>
                    {props.editable && (
                        <SquareIcon
                            icon={<FiEdit size={"18px"}/>}
                            onClick={props.onEdit}
                        />
                    )}
                    <div
                        className={"hover:cursor-grab"}
                        ref={props.setActivatorNodeRef}
                        {...props.attributes}
                        {...props.listeners}
                    >
                        <SquareIcon icon={<FiMenu size={"18px"}/>}/>
                    </div>
                </React.Fragment>}
                {props.canDelete && <ClosePopupButton
                    className={cn(closeButtonCV)}
                    onClose={props.onDelete}
                />}
            </div>
        </div>
    )

}

const ControlledPhotoCard = (props: AdminPhotoCardProps) => (
    <ConnectForm>
        {(methods: UseFormReturn<FieldValues, any, FieldValues>) => (
            <Controller
                control={methods.control}
                name={props.name as Path<FieldValues>}
                render={({field: {value}}) => (<PhotoCard {...props} value={value}/>)}
            />
        )}
    </ConnectForm>
)

const AdminPhotoCard = (props: AdminPhotoCardProps) => (
    props.defaultImage ? <PhotoCard {...props}/> : <ControlledPhotoCard {...props}/>
)

export default AdminPhotoCard;
