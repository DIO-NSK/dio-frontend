import React from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

type MultiselectButtonProps = {
    activeElement : string,
    elements : string[],
    selectElement : (element : string) => void,
    className ?: string
}

const MultiselectButton = (props : MultiselectButtonProps) => {
    return (
        <div className={cn("w-full flex flex-row items-center", props.className)}>
            {
                props.elements.map((element, index) => {

                    const wrapperCV : ClassValue[] = [
                        "w-full py-4 flex items-center justify-center",
                        "border-2 border-light-gray text-text-gray",
                        "hoverable pointer",
                        {
                            "bg-bg-light-blue text-link-blue" : element === props.activeElement,
                            "rounded-l-xl border-r-0" : index == 0,
                            "rounded-r-xl" : index == props.elements.length - 1,
                            "hover:bg-bg-light-blue hover:text-black" : element !== props.activeElement
                        }
                    ]

                    return (
                        <div
                            onClick={() => props.selectElement(element)}
                            className={cn(wrapperCV)}
                        >
                            {element}
                        </div>
                    )
                })
            }
        </div>
    );
};

export default MultiselectButton;
