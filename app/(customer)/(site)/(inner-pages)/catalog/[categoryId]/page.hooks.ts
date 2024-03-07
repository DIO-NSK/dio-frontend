import {SelectItem} from "@/types/props/SelectItem";
import {useState} from "react";
import {useRouter} from "next/navigation";

export const useCatalogPage = () => {

    const router = useRouter()

    const selectItems: SelectItem<string>[] = [
        {name: "По возрастанию цены", value: "price_asc"},
        {name: "По убыванию цены", value: "price_desc"},
        {name: "По названию (А-Я)", value: "name"}
    ]

    const [itemList] = useState<SelectItem<string>[]>(selectItems)
    const [selectedItem, selectItem] = useState<SelectItem<string>>(itemList[0])

    const handleFiltersClick = () => router.push("/mobile/filters")

    return {
        selectInput: {selectItem, itemList, selectedItem},
        handleFiltersClick
    }

}