"use client"

import {useUnit} from "effector-react";
import {selectActiveSectionEvent, toggleCatalogPopupEvent} from "@/components/organisms/bars/searchbar/model";
import React from "react";
import {Link} from "@mui/joy";
import Text from "@/components/atoms/text/text-base/Text";
import {TextLink} from "@/types/dto/text";
import {TabBarItem} from "@/types/props/SideTabBar";
import {cn} from "@/utlis/cn";

const itemStyle = (isLast: boolean) => [
    "whitespace-nowrap text-text-gray",
    {"w-fit whitespace-normal line-clamp-1": isLast}
]

const CatalogBreadcrumbs = ({breadcrumbs}: { breadcrumbs: TextLink[] }) => {

    console.log(breadcrumbs);

    const [togglePopup, setActiveSection] = useUnit([toggleCatalogPopupEvent, selectActiveSectionEvent])

    const handleOpenCatalogue = (sectionName: string) => {
        setActiveSection({text: sectionName} as TabBarItem)
        togglePopup()
    }

    return (
        <section className={"w-full sm:col-span-full flex flex-row gap-2"}>
            {breadcrumbs.map((breadcrumb, key, arr) => (
                <div className={'flex flex-row items-center gap-2'} key={key}>
                    {
                        typeof breadcrumb.link === "string"
                            ? (
                                <Link color={"neutral"} href={breadcrumb.link} key={key}>
                                    <Text text={breadcrumb.text} className={cn(itemStyle(key === arr.length - 1))}/>
                                </Link>
                            ) : (
                                <Link color={"neutral"} onClick={() => handleOpenCatalogue(breadcrumb.text)} key={key}>
                                    <Text text={breadcrumb.text} className={cn(itemStyle(key === arr.length - 1))}/>
                                </Link>
                            )
                    }
                    {key !== arr.length - 1 ? <Text text={'/'} className={'text-text-gray'}/> : null}
                </div>
            ))}
        </section>
    )

}

export default CatalogBreadcrumbs