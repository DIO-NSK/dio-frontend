import style from "./Breadcrumbs.module.css"

import {TextLink} from "@/types/links";
import Link from "next/link";
import TextBase from "@/components/atoms/text/text-base/TextBase";
import {COLOR} from "@/components/colors";
import {FiChevronRight} from "react-icons/fi";

const BreadCrumbs = ({breadcrumbs}: {
    breadcrumbs: TextLink[]
}) => {
    return (
        <div className={style.wrapper}>
            {
                breadcrumbs.map((item) => {
                    return <div className={style.itemRow}>
                        <Link href={item.path}>
                            <TextBase text={item.text} color={COLOR["text-gray"]}/>
                        </Link>
                        <FiChevronRight size={"18px"} className={"stroke-text-gray"}/>
                    </div>
                })
            }
        </div>
    )
}

export default BreadCrumbs
