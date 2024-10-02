import React from 'react';
import { CatalogCategory } from "@/app/(customer)/(site)/(inner-pages)/catalog/categories/[sectionUrlMask]/model";
import { cn } from "@/utlis/cn";
import { ClassValue } from "clsx";
import Link from "next/link";
import Text from "@/components/atoms/text/text-base/Text";
import { FiArrowRight } from "react-icons/fi";

type CatalogCategoryCardProps = {
    card: CatalogCategory
}

const wrapperCV: ClassValue[] = [
    "w-full p-5 md:col-span-4 lg:p-4 xl:p-5 h-fit flex flex-col items-center justify-center gap-4 bg-white",
    "md:gap-7 md:p-7 rounded-xl md:hover:z-10 md:hover:shadow-lg md:hover:shadow-gray-200/50",
    "md:hover:scale-[1.01] md:hoverable pointer border-2 border-light-gray group",
]

const CatalogCategoryCard = ({ card }: CatalogCategoryCardProps) => (
    <Link
        href={`/catalog/${(card as any).urlMask}`}
        className={cn(wrapperCV)}
    >
        <img
            className={'w-full h-[90px] xl:h-[100px] rounded-xl object-scale-down'}
            alt={'Изображение категории'}
            src={card.image}
        />
        <div className={'flex flex-row gap-2 items-center'}>
            <Text text={card.name} className={'text-link-blue group-hover:text-blue-500 w-fit line-clamp-1'} />
            <FiArrowRight size={'18px'} className={'text-link-blue group-hover:text-blue-500'} />
        </div>
    </Link>
);

export default CatalogCategoryCard;