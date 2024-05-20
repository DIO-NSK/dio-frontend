import React from 'react';
import {CatalogCategory} from "@/app/(customer)/(site)/(inner-pages)/catalog/categories/[sectionId]/model";
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";
import Link from "next/link";
import Text from "@/components/atoms/text/text-base/Text";
import {FiArrowRight} from "react-icons/fi";

type CatalogCategoryCardProps = {
    card: CatalogCategory
}

const wrapperCV: ClassValue[] = [
    "w-full sm:col-span-4 h-fit flex flex-col items-center justify-center gap-4 p-5 bg-white",
    "sm:gap-7 sm:p-7 rounded-xl sm:hover:z-10 sm:hover:shadow-lg sm:hover:shadow-gray-200/50",
    "sm:hover:scale-[1.01] sm:hoverable pointer border-2 border-light-gray group",
]

const CatalogCategoryCard = ({card}: CatalogCategoryCardProps) => (
    <Link
        href={`/catalog/${card.id}`}
        className={cn(wrapperCV)}
    >
        <img
            className={'w-full h-[100px] rounded-xl object-scale-down'}
            alt={'Изображение категории'}
            src={card.image}
        />
        <div className={'flex flex-row gap-2 items-center'}>
            <Text text={card.name} className={'text-link-blue group-hover:text-blue-500'}/>
            <FiArrowRight size={'18px'} className={'text-link-blue group-hover:text-blue-500'}/>
        </div>
    </Link>
);

export default CatalogCategoryCard;