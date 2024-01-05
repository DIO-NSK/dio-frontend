"use client"

import {TextLink} from "@/types/dto/text";
import TextBase from "@/components/atoms/text/text-base/TextBase";
import {FiChevronRight} from "react-icons/fi";
import {useRouter} from "next/navigation";

const BreadCrumbs = ({breadcrumbs}: {
    breadcrumbs: TextLink[]
}) => {

    const router = useRouter()

    return (
        <div className={"flex flex-row items-center gap-[5px]"}>
            {
                breadcrumbs.map((item, index) => {
                    return <div className={"flex flex-row items-center gap-[5px]"}>
                        <TextBase
                            text={item.text}
                            className={"text-text-gray hover:text-link-blue hoverable pointer"}
                            onClick={() => router.push(item.link)}
                        />
                        {
                            index !== breadcrumbs.length - 1 && <FiChevronRight
                                size={"18px"}
                                className={"stroke-text-gray"}
                            />
                        }
                    </div>
                })
            }
        </div>
    )
}

export default BreadCrumbs
