import React from 'react';
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";
import {Skeleton} from "primereact/skeleton";

import 'primereact/resources/themes/lara-light-cyan/theme.css';

type ProductCardClassNames = {
    mainWrapper?: string,
    textWrapper?: string
}

const wrapperCV = (classNames: any): ClassValue[] => [
    "w-full sm:col-span-3 h-fit flex flex-col gap-4 p-5 bg-white",
    "sm:gap-7 sm:p-7 rounded-xl sm:hover:z-10 sm:hover:shadow-lg sm:hover:shadow-gray-200/50 sm:hover:scale-[1.01] sm:hoverable pointer",
    "border-2 border-gray-100 relative", classNames?.mainWrapper
]

const SkeletonProductCard = ({classNames}: { classNames?: ProductCardClassNames }) => (
    <section className={cn(wrapperCV(classNames))}>
        <Skeleton width="100%" height="150px"/>
        <div className={"w-full flex flex-col gap-3 sm:gap-5"}>
            <div className={cn("w-full flex flex-col gap-2 min-h-[50px] sm:min-h-[85px]", classNames?.textWrapper)}>
                <Skeleton width={'50%'} height={'20px'}/>
                <Skeleton width={'100%'} height={'50px'}/>
            </div>
            <div className={"flex flex-row items-center gap-4 sm:gap-5"}>
                <Skeleton width={'100%'} height={'50px'} className={'rounded-xl'}/>
                <Skeleton shape={"circle"} size={"2rem"} className={'flex-none'}/>
            </div>
        </div>
    </section>
)

export default SkeletonProductCard;
