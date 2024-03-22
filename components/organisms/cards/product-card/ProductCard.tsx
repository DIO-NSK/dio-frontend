import React, {MouseEventHandler, useState} from "react";
import LinesEllipsis from 'react-lines-ellipsis'
import Button from "@/components/atoms/buttons/button/Button";
import LikeButton from "@/components/atoms/buttons/like-button/LikeButton";
import {FiCheck} from "react-icons/fi";
import {useRouter} from "next/navigation";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";
import BuyButton from "@/components/mobile/moleculas/buy-button/BuyButton";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";
import {useUnit} from "effector-react";
import {addToCartEvent} from "@/components/organisms/cards/product-price-card/model";
import {
    $cart,
    removeProductFromCartEvent
} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import {useLike} from "@/utlis/hooks/product/useLike";

type ProductCardClassNames = {
    mainWrapper?: string,
    textWrapper?: string
}

const ProductCard = ({productCard, classNames}: {
    productCard: ResponseProductSearch,
    classNames?: ProductCardClassNames
}) => {

    const [addToCart, removeFromCart, cart] = useUnit([addToCartEvent, removeProductFromCartEvent, $cart])
    const router = useRouter()

    const isInCart = (): boolean => {
        const inCart = cart?.responseCart.products.find(product => product.name === productCard.name)
        return Boolean(inCart)
    }

    const [isSelected, setSelected] = useState<boolean>(isInCart)
    const [isLiked, toggleLike] = useLike(productCard.id)

    const buttonText = isSelected ? "В корзине" : "В корзину"
    const buttonIcon = isSelected ? <FiCheck size={"20px"} className={"stroke-white"}/> : null

    const discountPrice = 0.01 * productCard.discountPercent * productCard.price
    const newPrice = discountPrice === 0 ? productCard.price : productCard.price - discountPrice

    const wrapperCV: ClassValue[] = [
        "w-[70vw] sm:w-full sm:col-span-3 h-fit flex flex-col gap-4 p-5 bg-white",
        "sm:gap-7 sm:p-7 rounded-xl sm:hover:z-10 sm:hover:shadow-xl sm:hoverable pointer",
        "border-2 border-light-gray sm:border-0", classNames?.mainWrapper
    ]

    const handleCardClick = () => router.push(`/product/${productCard.id}`)
    const handleBuyClick: MouseEventHandler = (event) => {
        event.stopPropagation()
        if (isSelected) removeFromCart(productCard.id)
        else addToCart(productCard.id)
        setSelected(!isSelected)
    }

    return (
        <div
            className={cn(wrapperCV)}
            onClick={handleCardClick}
        >
            <img
                src={productCard.image}
                className={"w-full h-[100px] sm:h-[160px] object-cover"}
                alt={'Изображение продукта'}
            />
            <div className={"w-full flex flex-col gap-4 sm:gap-5"}>
                <div className={cn("w-full flex flex-col gap-1 min-h-[50px] sm:min-h-[85px]", classNames?.textWrapper)}>
                    <div className={"w-full hidden sm:flex flex-row items-baseline gap-3"}>
                        <Text
                            text={newPrice.toFixed(2) + " ₽"}
                            className={"text-[22px] font-semibold text-link-blue"}
                        />
                        {
                            discountPrice !== 0 && <Text
                                text={productCard?.price?.toFixed(2) + " ₽"}
                                className={"text-base text-text-gray line-through"}
                            />
                        }
                    </div>
                    <LinesEllipsis
                        className={"font-medium text-base"}
                        text={productCard.name}
                        maxLine={'2'}
                        ellipsis={'..'}
                        basedOn={'letters'}
                        trimRight
                    />
                </div>
                <div className={"w-full flex flex-row items-center justify-between"}>
                    <div className={"sm:hidden flex flex-col"}>
                        {
                            discountPrice !== 0 && <Text
                                text={productCard?.price?.toFixed(2) + " ₽"}
                                className={"text-sm text-text-gray line-through"}
                            />
                        }
                        <Text
                            text={newPrice.toFixed(2) + " ₽"}
                            className={"text-[20px] sm:text-[24px] font-semibold text-link-blue"}
                        />
                    </div>
                    <div className={"flex flex-row items-center gap-4 sm:gap-5"}>
                        <Button
                            classNames={{button: "hidden sm:flex"}}
                            buttonType={isSelected ? "PRIMARY" : "SECONDARY"}
                            text={buttonText}
                            onClick={handleBuyClick}
                            icon={buttonIcon}
                        />
                        <LikeButton
                            toggleLike={toggleLike}
                            isLiked={isLiked}
                        />
                        <BuyButton/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
