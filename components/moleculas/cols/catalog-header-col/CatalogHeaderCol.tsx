import Text from "@/components/atoms/text/text-base/Text";
import {TextLink} from "@/types/dto/text";
import Breadcrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";

type CatalogHeaderCol = {
    text : string,
    amount : number,
    breadcrumbs : TextLink[]
}

const CatalogHeaderCol = ({text, amount, breadcrumbs} : CatalogHeaderCol) => {
    return (
        <div className={"w-full px-5 sm:px-[100px] sm:col-span-full flex flex-col gap-1"}>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <div className={"w-full flex flex-row items-baseline gap-[10px]"}>
                <Text text={text} className={"text-[20px] sm:text-[24px] font-semibold"}/>
                <Text text={`Всего ${amount}`} className={"text-[14px] sm:text-base text-text-gray"}/>
            </div>
        </div>
    )
}

export default CatalogHeaderCol
