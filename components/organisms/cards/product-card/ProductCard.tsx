import style from "./ProductCard.module.css"
import React, {useState} from "react";
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Text2XL from "@/components/atoms/text/text-2xl/Text2XL";
import {COLOR} from "@/components/colors";
import LinesEllipsis from 'react-lines-ellipsis'
import Button from "@/components/atoms/buttons/button/Button";
import LikeButton from "@/components/atoms/buttons/like-button/LikeButton";
import {FiCheck} from "react-icons/fi";
import {useRouter} from "next/navigation";

type ProductCardDTO = {
    oldPrice?: number | undefined,
    price: number,
    descr: string,
    image: string | StaticImport
}

export type ProductCardTypes = {
    productCard: ProductCardDTO
}

const ProductCard = ({productCard}: ProductCardTypes) => {

    const router = useRouter()

    const [isSelected, setSelected] = useState<boolean>(false)

    const buttonText = isSelected ? "В корзине" : "В корзину"
    const buttonColor = isSelected ? COLOR["link-blue"] : COLOR["light-gray"]
    const buttonIcon = isSelected ? <FiCheck size={"20px"} className={"stroke-white"}/> : null

    return (
        <div
            onClick={() => router.push("/product?product_id=1")}
            className={style.wrapper}
        >
            <Image
                src={productCard.image}
                className={style.image}
                quality={100}
                alt={'/'}
            />
            <div className={style.contentCol}>
                <div className={style.priceDescrCol}>
                    <Text2XL
                        text={productCard.price + " ₽"}
                        color={COLOR["link-blue"]}
                    />
                    <LinesEllipsis
                        text={productCard.descr}
                        maxLine='2'
                        ellipsis='..'
                        trimRight
                        basedOn='letters'
                    />
                </div>
                <div className={style.buttonRow}>
                    <Button
                        text={buttonText}
                        onClick={() => setSelected(!isSelected)}
                        color={buttonColor}
                        icon={buttonIcon}
                    />
                    <LikeButton/>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
