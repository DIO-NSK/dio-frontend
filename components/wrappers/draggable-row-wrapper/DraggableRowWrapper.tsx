import React from 'react';
import {WrapperProps} from "@/types/props/Wrapper";
import SquareIcon from "@/components/atoms/icons/square-icon/SquareIcon";
import {FiMenu, FiTrash2} from "react-icons/fi";

const DraggableRowWrapper = ({onDelete, ...props}: WrapperProps & { onDelete: () => void }) => {
    return (
        <div className={"w-full relative flex flex-row gap-5"}>
            <SquareIcon
                icon={<FiMenu size={"18px"}/>}
                className={"w-fit mt-4 h-fit"}
            />
            <section className={props.className}>
                {props.children}
            </section>
            <SquareIcon
                className={"w-fit h-fit mt-4 text-info-red hover:bg-red-100 hover:text-red-800 pointer hoverable"}
                icon={<FiTrash2 size={"18px"}/>}
                onClick={onDelete}
            />
        </div>
    );
};

export default DraggableRowWrapper;
