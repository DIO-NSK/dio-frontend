import React from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {Skeleton} from "primereact/skeleton";

import 'primereact/resources/themes/lara-light-cyan/theme.css';

const wrapperStyles: ClassValue[] = [
    "w-full sm:col-span-4 h-fit flex flex-col items-center justify-center gap-4 p-5 bg-white",
    "sm:gap-4 sm:p-7 rounded-xl sm:hover:z-10 sm:hover:shadow-lg sm:hover:shadow-gray-200/50",
    "sm:hover:scale-[1.01] sm:hoverable pointer border-2 border-light-gray group",
]

const SkeletonCatalogCategoryCard = () => (
    <section className={cn(wrapperStyles)}>
        <Skeleton width="100%" height="100px"/>
        <Skeleton width="100%" height="40px" className={'rounded-sm'}/>
    </section>
);

export default SkeletonCatalogCategoryCard;
