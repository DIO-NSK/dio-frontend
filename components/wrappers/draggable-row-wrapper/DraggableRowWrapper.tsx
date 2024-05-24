import React from 'react';
import {WrapperProps} from "@/types/props/Wrapper";
import SquareIcon from "@/components/atoms/icons/square-icon/SquareIcon";
import {FiEdit, FiMenu, FiTrash2} from "react-icons/fi";
import {SortableHandlerProps} from "@/components/wrappers/sortable-wrapper/SortableItemWrapper";
import {cn} from "@/utlis/cn";

type DraggableRowWrapperProps = {
    onDelete: () => void,
    onEdit ?: () => void
} & WrapperProps & SortableHandlerProps

const iconStyles = 'w-fit h-fit pointer hoverable'

const DraggableRowWrapper = (props: DraggableRowWrapperProps) => {
    return (
        <div className={"w-full relative flex flex-row gap-5"}>
            <div
                className={"hover:cursor-grab"}
                ref={props.setActivatorNodeRef}
                {...props.attributes}
                {...props.listeners}
            >
                <SquareIcon
                    icon={<FiMenu size={"18px"}/>}
                    className={"w-fit mt-4 h-fit"}
                />
            </div>
            <section className={props.className}>
                {props.children}
            </section>
            <div className={'w-fit flex flex-row gap-3 mt-4'}>
                {props.onEdit && <SquareIcon
                    className={cn(iconStyles, 'hover:bg-blue-100 hover:text-link-blue')}
                    icon={<FiEdit size={'18px'}/>}
                    onClick={props.onEdit}
                />}
                <SquareIcon
                    className={cn(iconStyles, 'text-info-red hover:bg-red-100 hover:text-red-800')}
                    icon={<FiTrash2 size={"18px"}/>}
                    onClick={props.onDelete}
                />
            </div>
        </div>
    );
};

export default DraggableRowWrapper;
