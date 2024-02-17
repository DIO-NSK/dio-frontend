"use client"

import Text from "@/components/atoms/text/text-base/Text";
import {Category} from "@/types/dto/Category";
import ChevronButton from "@/components/atoms/buttons/chevron-button/ChevronButton";
import {categories, initSubcategories} from "@/data/catalogData";
import {cn} from "@/utlis/cn";
import {useState} from "react";

const CategoryBlock = ({category}: { category: Category }) => {

    const [expandedState, setExpandedState] = useState<boolean>(false)
    const subcategories = initSubcategories.find(sub => sub.id === category.id)

    const rowCN = "flex flex-row pb-5 border-b-2 border-light-gray"

    return (
        <div className={"flex flex-col gap-5"}>
            <div className={cn(rowCN, "items-center justify-between")}>
                <Text text={category.text}/>
                <ChevronButton
                    setExpanded={() => setExpandedState(!expandedState)}
                    isExpanded={expandedState}
                />
            </div>
            {
                expandedState && subcategories?.items.map((sub, index) =>
                    <div className={cn(rowCN, "pl-5")}>
                        <Text text={sub} key={index}/>
                    </div>
                )
            }
        </div>
    )

}

const MobileCatalogMenu = () => {
    return (
        <section className={"w-full flex flex-col gap-7"}>
            <Text text={"Товары"} className={"text-[18px]"}/>
            <div className={"w-full flex flex-col gap-5"}>
                {
                    categories.map((category, categoryIndex) =>
                        <CategoryBlock category={category} key={categoryIndex}/>
                    )
                }
            </div>
        </section>
    );
};

export default MobileCatalogMenu;
