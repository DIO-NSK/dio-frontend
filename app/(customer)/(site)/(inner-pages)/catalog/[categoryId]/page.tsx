"use client"

import style from "../../InnerPages.module.css"
import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import {useCatalogPage} from "@/app/(customer)/(site)/(inner-pages)/catalog/[categoryId]/page.hooks";
import Button from "@/components/atoms/buttons/button/Button";
import {FiSliders} from "react-icons/fi";
import {useUnit} from "effector-react";
import {$categories, getCategoryByNameEvent} from "@/app/(customer)/(site)/(inner-pages)/catalog/[categoryId]/model";
import {useEffect} from "react";

const CatalogScreen = ({params} : {
    params : {
        categoryId : number
    }
}) => {

    const [categories, getCategories] = useUnit([$categories, getCategoryByNameEvent])
    const {...context} = useCatalogPage()

    useEffect(() => {
        getCategories(params.categoryId)
    }, [])

    return (
        <div className={style.content}>

            <div className={"w-full flex flex-row gap-3 sm:col-span-full sm:grid sm:grid-cols-9 sm:gap-[20px]"}>
                <Button
                    classNames={{button : "sm:hidden bg-bg-light-blue border-2 border-light-gray"}}
                    onClick={context.handleFiltersClick}
                    icon={<FiSliders size={"18px"}/>}
                    buttonType={"SECONDARY"}
                    size={"sm"}
                />
                <SelectInput
                    width={"sm:col-span-3 w-full"}
                    items={context.selectInput.itemList}
                    onSelect={(item) => context.selectInput.selectItem(item)}
                    selectedItem={context.selectInput.selectedItem}
                />
            </div>

            {
                categories.map((card) => {
                    return <ProductCard
                        classNames={{mainWrapper : "w-full", textWrapper : "min-h-0"}}
                        productCard={card}
                    />
                })
            }

        </div>
    )
}

export default CatalogScreen
