'use client';

import React, {useEffect, useState} from "react";
import {SelectItem} from "@/types/props/SelectItem";
import ChipList from "@/components/moleculas/lists/chip-list/ChipList";
import {OurWaterChip} from "@/app/admin/promo/models/our_waters.model";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";
import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import {getOurWatersProducts} from "@/app/(customer)/(site)/(inner-pages)/our-waters/page.api";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import CatalogPagination from "@/components/moleculas/pagination/CatalogPagination";

const OurWatersCategoryClientScreen = ({waters} : {waters : OurWaterChip[]}) => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const selectableOurWaters : SelectItem<string>[] = waters.map((water) => ({name : `${water.brand} (${water?.amount ?? 0})`, value: water.brand}));

    const [activeWater, setActiveWater] = useState<SelectItem<string>>(selectableOurWaters[0]);
    const [waterCards, setWaterCards] = useState<ResponseProductSearch[]>([]);

    const handleSelectOurWater = async (e : React.MouseEvent<HTMLUListElement>) => {
        const activeName = (e.target as HTMLUListElement).dataset.activeName;

        if (activeName !== undefined) {
            const activeWater = selectableOurWaters.find((water) => water.value === activeName);
            const editableSearchParams = new URLSearchParams(searchParams);

            editableSearchParams.set('brand', activeWater?.value as string);
            router.replace(`${pathname}?${editableSearchParams.toString()}`);
        }
    }

    useEffect(() => {
        const brandQuery = searchParams.get('brand');

        if (brandQuery) {
            getOurWatersProducts(brandQuery).then(setWaterCards);
            setActiveWater(selectableOurWaters.find(water => water.value === brandQuery)!!)
        }
    }, [ searchParams ]);

    return (
        <section className={'col-span-full flex flex-col gap-5 w-full md:grid md:grid-cols-9 xl:grid-cols-12 xl:gap-7'}>
            <ChipList items={selectableOurWaters} activeItem={activeWater} setActiveItem={handleSelectOurWater}/>
            {waterCards?.map((waterCard) => (
                <ProductCard
                    classNames={{mainWrapper: "w-full", textWrapper: "min-h-0"}}
                    productCard={waterCard} key={waterCard.id}
                />
            ))}
        </section>
    )
};

export default OurWatersCategoryClientScreen;