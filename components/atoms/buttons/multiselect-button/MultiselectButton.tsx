import React from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {SelectItem} from "@/types/props/SelectItem";
import Text from "@/components/atoms/text/text-base/Text";

export type MultiselectButtonProps<T> = {
    activeElement: SelectItem<T>,
    elements: SelectItem<T>[],
    selectElement: (element: SelectItem<T>) => void,
    labelText?: string,
    className?: string,
    size?: "sm" | "md"
}

const MultiselectButton = <T, >({size = "md", ...props}: MultiselectButtonProps<T>) => (
    <div className={cn("w-full h-fit flex flex-col gap-2", props.className)}>
        {props.labelText && <Text text={props.labelText} className={"text-base text-black"}/>}
        <div className={"w-full h-full flex flex-row items-center"}>
            {props.elements.map((element, index, array) => {

                const wrapperCV: ClassValue[] = [
                    "w-full h-full py-4 flex items-center justify-center",
                    "border-2 border-light-gray text-text-gray",
                    "hoverable pointer",
                    {
                        "bg-bg-light-blue text-link-blue": element.value === props.activeElement.value,
                        "rounded-l-xl": index == 0, "border-r-0": index !== array.length - 1,
                        "rounded-r-xl": index == array.length - 1,
                        "hover:bg-bg-light-blue hover:text-black": element.value !== props.activeElement.value
                    },
                    {"py-3": size == "sm"}
                ]

                return (
                    <div
                        className={cn(wrapperCV)}
                        onClick={() => props.selectElement(element)}
                    >
                        {element.name}
                    </div>
                )
            })}
        </div>
    </div>
);

export default MultiselectButton;
