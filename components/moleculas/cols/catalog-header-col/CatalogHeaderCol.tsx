import style from "./CatalogHeaderCol.module.css"
import Text2XL from "@/components/atoms/text/text-2xl/Text2XL";
import TextBase from "@/components/atoms/text/text-base/TextBase";
import {TextLink} from "@/types/dto/text";
import Breadcrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";

type CatalogHeaderCol = {
    text : string,
    amount : number,
    breadcrumbs : TextLink[]
}

const CatalogHeaderCol = ({text, amount, breadcrumbs} : CatalogHeaderCol) => {
    return (
        <div className={style.wrapper}>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <div className={style.headerRow}>
                <Text2XL text={text} />
                <TextBase text={`Всего ${amount}`} className={"text-text-gray"}/>
            </div>
        </div>
    )
}

export default CatalogHeaderCol
