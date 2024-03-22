import React from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {SelectItem} from "@/types/props/SelectItem";

type MultiselectButtonProps<T> = {
    activeElement: SelectItem<T>,
    elements: SelectItem<T>[],
    selectElement: (element: SelectItem<T>) => void,
    className?: string,
    size?: "sm" | "md"
}

const MultiselectButton = <T, >({size = "md", ...props}: MultiselectButtonProps<T>) => {
    return (
        <div className={cn("w-full flex flex-row items-center", props.className)}>
            {
                props.elements.map((element, index, array) => {

                    const wrapperCV: ClassValue[] = [
                        "w-full py-4 flex items-center justify-center",
                        "border-2 border-light-gray text-text-gray",
                        "hoverable pointer",
                        {
                            "bg-bg-light-blue text-link-blue": element.name === props.activeElement.name,
                            "rounded-l-xl": index == 0, "border-r-0": index !== array.length - 1,
                            "rounded-r-xl": index == array.length - 1,
                            "hover:bg-bg-light-blue hover:text-black": element.name !== props.activeElement.name
                        },
                        {"py-3": size == "sm"}
                    ]

                    return (
                        <div
                            onClick={() => props.selectElement(element)}
                            className={cn(wrapperCV)}
                        >
                            {element.name}
                        </div>
                    )
                })
            }
        </div>
    );
};

export default MultiselectButton;
