import React from 'react';
import Text from "@/components/atoms/text/text-base/Text";
import {cn} from "@/utlis/cn";

const Badge = ({number, className} : {number : number, className ?: string}) => {
    return (
        <div className={cn("w-fit px-1 h-4 rounded-full flex items-end justify-center bg-link-blue", className)}>
            <Text text={`${number}`} className={"text-white font-medium text-[10px]"}/>
        </div>
    );
};

export default Badge;