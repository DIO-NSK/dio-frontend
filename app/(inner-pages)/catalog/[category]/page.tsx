"use client"

import style from "../../InnerPages.module.css"
import {mockCardArray} from "@/data/productCardData";
import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import {SelectedItem} from "@/types/select";
import {useState} from "react";
import DropdownInput from "@/components/atoms/inputs/dropdown-input/DropdownInput";

const CatalogScreen = () => {

    const mockDropdownText = [
        "По возрастанию цены",
        "По убыванию цены",
        "По названию (А-Я)"
    ]

    const createItemList = (): SelectedItem[] => {
        return mockDropdownText.map((text) => {
            return {text: text, isSelected: false}
        })
    }

    const initItemList = createItemList()
    const [itemList, setItemList] = useState<SelectedItem[]>(initItemList)
    const [selectedItem, selectItem] = useState<SelectedItem>(itemList[0])

    return (
        <div className={style.content}>

            <div className={"col-span-full grid grid-cols-9 gap-[20px]"}>
                <DropdownInput
                    width={"col-span-3"}
                    items={itemList}
                    onSelect={(item) => selectItem(item)}
                    selectedItem={selectedItem}
                />
            </div>

            {
                mockCardArray.map((card) => {
                    return <ProductCard productCard={card}/>
                })
            }

        </div>
    )
}

export default CatalogScreen
