import React from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

type MultiselectButtonProps = {
    activeElement : string,
    elements : string[],
    selectElement : (element : string) => void,
    className ?: string,
    size ?: "sm" | "md"
}

const MultiselectButton = ({size = "md", ...props} : MultiselectButtonProps) => {
    return (
        <div className={cn("w-full flex flex-row items-center", props.className)}>
            {
                props.elements.map((element, index, array) => {

                    const wrapperCV : ClassValue[] = [
                        "w-full py-4 flex items-center justify-center",
                        "border-2 border-light-gray text-text-gray",
                        "hoverable pointer",
                        {
                            "bg-bg-light-blue text-link-blue" : element === props.activeElement,
                            "rounded-l-xl" : index == 0, "border-r-0" : index !== array.length - 1,
                            "rounded-r-xl" : index == array.length - 1,
                            "hover:bg-bg-light-blue hover:text-black" : element !== props.activeElement
                        },
                        {"py-3" : size == "sm"}
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
