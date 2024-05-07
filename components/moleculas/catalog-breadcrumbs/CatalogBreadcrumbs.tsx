import {useUnit} from "effector-react";
import {selectActiveSectionEvent, toggleCatalogPopupEvent} from "@/components/organisms/bars/searchbar/model";
import React from "react";
import {Breadcrumbs, Link} from "@mui/joy";
import Text from "@/components/atoms/text/text-base/Text";
import {TextLink} from "@/types/dto/text";

const CatalogBreadcrumbs = ({breadcrumbs}: { breadcrumbs: TextLink[] }) => {

    const [togglePopup, setActiveSection] = useUnit([toggleCatalogPopupEvent, selectActiveSectionEvent])

    const handleOpenCatalogue = (sectionName: string) => {
        setActiveSection({text: sectionName} as TabBarItem)
        togglePopup()
    }

    return (
        <React.Fragment>
            <section className={"col-span-full hidden sm:flex flex-row"}>
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
            <section className={"sm:hidden whitespace-nowrap overflow-clip w-full flex flex-row items-center gap-2"}>
                {breadcrumbs.map((breadcrumb, key) => (
                    <div className={"flex flex-row items-center gap-2"}>
                        {
                            typeof breadcrumb.link === "string"
                                ? <Link color={"neutral"} href={breadcrumb.link} key={key}>
                                    <Text text={breadcrumb.text} className={"text-text-gray"}/>
                                </Link> :
                                <Link color={"neutral"} onClick={() => handleOpenCatalogue(breadcrumb.text)} key={key}>
                                    <Text text={breadcrumb.text} className={"text-text-gray"}/>
                                </Link>
                        }
                        {
                            key !== breadcrumbs.length - 1 && <Text
                                className={'text-gray-600'}
                                text={'/'}
                            />
                        }
                    </div>
                ))}
            </section>
        </React.Fragment>
    )

}

export default CatalogBreadcrumbs