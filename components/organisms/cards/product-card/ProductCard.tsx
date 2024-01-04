import React, {useState} from "react";
import Image from "next/image";
import Text2XL from "@/components/atoms/text/text-2xl/Text2XL";
import {COLOR} from "@/components/colors";
import LinesEllipsis from 'react-lines-ellipsis'
import Button from "@/components/atoms/buttons/button/Button";
import LikeButton from "@/components/atoms/buttons/like-button/LikeButton";
import {FiCheck} from "react-icons/fi";
import {useRouter} from "next/navigation";
import {ProductCardDTO} from "@/types/product";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

export type ProductCardTypes = {
    productCard: ProductCardDTO
}

const ProductCard = ({productCard}: ProductCardTypes) => {

    const router = useRouter()

    const [isSelected, setSelected] = useState<boolean>(false)

    const buttonText = isSelected ? "В корзине" : "В корзину"
    const buttonIcon = isSelected ? <FiCheck size={"20px"} className={"stroke-white"}/> : null

    const wrapperCV : ClassValue[] = [
        "col-span-3 h-fit flex flex-col gap-[30px] p-[30px] rounded-xl bg-white",
        "hover:z-10 hover:shadow-xl hoverable pointer"
    ]

    return (
        <div className={cn(wrapperCV)}>
            <Image
                src={productCard.image}
                className={"w-full h-[160px] object-fill"}
                quality={100}
                alt={'/'}
            />
            <div className={"flex flex-col gap-[20px]"}>
                <div
                    className={"flex flex-col gap-[8px] min-h-[80px]"}
                    onClick={() => router.push("/product?product_id=1")}
                >
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
                <div className={"flex flex-row items-center gap-[20px]"}>
                    <Button
                        buttonType={isSelected ? "PRIMARY" : "SECONDARY"}
                        text={buttonText}
                        onClick={() => setSelected(!isSelected)}
                        icon={buttonIcon}
                    />
                    <LikeButton/>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
