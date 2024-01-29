"use client"

import style from "../../InnerPages.module.css"
import {mockCardArray} from "@/data/productCardData";
import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import {useCatalogPage} from "@/app/(customer)/(site)/(inner-pages)/catalog/[category]/page.hooks";

const CatalogScreen = () => {

    const {...context} = useCatalogPage()

    return (
        <div className={style.content}>

            <div className={"col-span-full grid grid-cols-9 gap-[20px]"}>
                <SelectInput
                    width={"col-span-3"}
                    items={context.selectInput.itemList}
                    onSelect={(item) => context.selectInput.selectItem(item)}
                    selectedItem={context.selectInput.selectedItem}
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
