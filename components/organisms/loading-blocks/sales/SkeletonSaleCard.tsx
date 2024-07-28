import React from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

import 'primereact/resources/themes/lara-light-cyan/theme.css';
import {Skeleton} from "primereact/skeleton";

const wrapperStyle: ClassValue[] = [
    "w-full sm:col-span-6 bg-white p-5 rounded-xl flex flex-col sm:flex-row gap-5",
    "sm:hover:z-10 border-2 border-light-gray sm:hover:shadow-lg sm:hover:shadow-gray-200/50 sm:hover:scale-[1.01] sm:hoverable pointer"
]

const SkeletonSaleCard = () => {
    return (
        <div className={cn(wrapperStyle)}>
            <Skeleton width={'170px'} height={'170px'}/>
            <div className={"w-full flex flex-col gap-[10px]"}>
                <Skeleton width={'100%'} height={'20px'} className={'rounded-base'}/>
                <div className={"w-full flex flex-col gap-[20px]"}>
                    <Skeleton width={'100%'} height={'50px'} className={'rounded-base'}/>
                    <Skeleton width={'200px'} height={'60px'}/>
                </div>
            </div>
        </div>
    );
};

export default SkeletonSaleCard;
