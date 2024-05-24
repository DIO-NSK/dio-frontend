import {useUnit} from "effector-react";
import {selectActiveSectionEvent, toggleCatalogPopupEvent} from "@/components/organisms/bars/searchbar/model";
import React from "react";
import {Breadcrumbs, Link} from "@mui/joy";
import Text from "@/components/atoms/text/text-base/Text";
import {TextLink} from "@/types/dto/text";
import {TabBarItem} from "@/types/props/SideTabBar";

const CatalogBreadcrumbs = ({breadcrumbs}: { breadcrumbs: TextLink[] }) => {

    const [togglePopup, setActiveSection] = useUnit([toggleCatalogPopupEvent, selectActiveSectionEvent])

    const handleOpenCatalogue = (sectionName: string) => {
        setActiveSection({text: sectionName} as TabBarItem)
        togglePopup()
    }

    return (
        <section className={"w-full sm:col-span-full flex-row"}>
            <Breadcrumbs
                sx={{
                    "--Breadcrumbs-gap": "10px",
                    marginLeft: "-10px",
                    marginBottom: "-10px",
                }}
            >
                {breadcrumbs.map((breadcrumb, key) => (
                    typeof breadcrumb.link === "string"
                        ? <Link color={"neutral"} href={breadcrumb.link} key={key}>
                            <Text text={breadcrumb.text} className={"text-text-gray"}/>
                        </Link> :
                        <Link color={"neutral"} onClick={() => handleOpenCatalogue(breadcrumb.text)} key={key}>
                            <Text text={breadcrumb.text} className={"text-text-gray"}/>
                        </Link>
                ))}
            </Breadcrumbs>
        </section>
    )

}

export default CatalogBreadcrumbs