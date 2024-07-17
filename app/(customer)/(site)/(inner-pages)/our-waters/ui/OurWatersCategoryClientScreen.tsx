'use client';

import React, {useEffect, useState} from "react";
import {SelectItem} from "@/types/props/SelectItem";
import ChipList from "@/components/moleculas/lists/chip-list/ChipList";
import {ResponseOurWater} from "@/app/admin/promo/models/our_waters.model";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";
import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import {getOurWatersProducts} from "@/app/(customer)/(site)/(inner-pages)/our-waters/page.api";
import {parseFilterMap} from "@/utlis/parseFilterMap";

const OurWatersCategoryClientScreen = ({waters} : {waters : ResponseOurWater[]}) => {
    const selectableOurWaters = waters.map((water) => ({name : water.name, value: water.id}));

    const [activeWater, setActiveWater] = useState<SelectItem<number>>(selectableOurWaters[0]);
    const [waterCards, setWaterCards] = useState<ResponseProductSearch[]>([]);

    const [categoryId, _, queryFilterMap] = parseFilterMap(waters[0].filterCharacteristic);
    getOurWatersProducts(categoryId, queryFilterMap).then(setWaterCards)

    const handleSelectOurWater = async (e : React.MouseEvent<HTMLUListElement>) => {
        const activeIndex = (e.target as HTMLUListElement).dataset.activeIndex;

        if (activeIndex !== undefined) {
            const activeWater = selectableOurWaters.find((water) => water.value === Number(activeIndex));
            const realWater = waters.find((water) => water.id === Number(activeIndex))!!;

            const ourWatersProducts = await getOurWatersProducts(Number(activeIndex), realWater?.filterCharacteristic)

            setActiveWater(activeWater as SelectItem<number>);
            setWaterCards(ourWatersProducts);
        }
    }

    return (
        <React.Fragment>
            <ChipList items={selectableOurWaters} activeItem={activeWater} setActiveItem={handleSelectOurWater}/>
            {waterCards.map((waterCard) => (
                <ProductCard
                    classNames={{mainWrapper: "w-full", textWrapper: "min-h-0"}}
                    productCard={waterCard} key={waterCard.id}
                />
            ))}
        </React.Fragment>
    )
}

export default OurWatersCategoryClientScreen;