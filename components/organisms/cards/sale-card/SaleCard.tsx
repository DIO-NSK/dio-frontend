import style from "./SaleCard.module.css"
import Text2XL from "@/components/atoms/text/text-2xl/Text2XL";
import {COLOR} from "@/components/colors";
import Image from "next/image";
import {ImageHeaderDescrCard} from "@/types/cards";

const SaleCard = ({saleCard}: {saleCard : ImageHeaderDescrCard}) => {
    return (
        <div className={style.wrapper}>
            <div className={style.textCol}>
                <Text2XL text={saleCard.header} color={COLOR["link-blue"]} isUppercase={true}/>
                <Text2XL text={saleCard.descr}/>
            </div>
            <Image
                className={style.image}
                width={300} height={300}
                quality={100} src={saleCard.image}
                alt={'/'}
            />
        </div>
    )
}

export default SaleCard
