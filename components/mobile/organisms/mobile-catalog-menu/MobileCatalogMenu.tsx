"use client"

import Text from "@/components/atoms/text/text-base/Text";
import ChevronButton from "@/components/atoms/buttons/chevron-button/ChevronButton";
import {cn} from "@/utlis/cn";
import {useState} from "react";
import {useUnit} from "effector-react";
import {$catalog} from "@/components/organisms/bars/searchbar/model";
import Link from "next/link";

const CategoryBlock = ({category}: { category: CatalogItem }) => {

    const [expandedState, setExpandedState] = useState<boolean>(false)

    const rowCN = "flex flex-row pb-5 border-b-2 border-light-gray"

    return (
        <div className={"flex flex-col gap-5"}>
            <div className={cn(rowCN, "items-center justify-between")}>
                <Text text={category.name}/>
                <ChevronButton
                    setExpanded={() => setExpandedState(!expandedState)}
                    isExpanded={expandedState}
                />
            </div>
            {expandedState && category.categories.map((sub, index) =>
                <div className={cn(rowCN, "pl-5")} key={index}>
                    <Link href={`/catalog/${sub.id}`}>
                        <Text text={sub.name} key={index}/>
                    </Link>
                </div>
            )}
        </div>
    )

}

const MobileCatalogMenu = () => {

    const catalog = useUnit($catalog)

    if (catalog) return (
        <section className={"w-full flex flex-col gap-7"}>
            <Text text={"Категории"} className={"text-[18px] font-medium"}/>
            <div className={"w-full flex flex-col gap-5"}>
                {catalog.map((category, categoryIndex) =>
                    <CategoryBlock category={category} key={categoryIndex}/>
                )}
            </div>
        </section>
    );

};

export default MobileCatalogMenu;
