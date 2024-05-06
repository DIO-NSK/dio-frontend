import React from "react";
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
import {useLike} from "@/utlis/hooks/product/useLike";
import {useBuyButton} from "@/utlis/hooks/product/useBuyButton";
import {useDiscount} from "@/utlis/hooks/product/useDiscount";
import {useSwiper} from "swiper/react";

type ProductCardClassNames = {
    mainWrapper?: string,
    textWrapper?: string
}

const ProductCard = ({productCard, classNames}: {
    productCard: ResponseProductSearch,
    classNames?: ProductCardClassNames
}) => {

    const router = useRouter()

    const [isLiked, toggleLike] = useLike(productCard.inFavourites, productCard.id)
    const [isInCart, onBuyClick] = useBuyButton(productCard.inCart, productCard.id)
    const [newPrice, price] = useDiscount(productCard.price, productCard.discountPercent)

    const buttonText = productCard.inStock ? isInCart ? "В корзине" : "В корзину" : "Нет в наличии"
    const buttonIcon = isInCart ? <FiCheck size={"20px"} className={"stroke-white"}/> : null

    const wrapperCV: ClassValue[] = [
        "w-full sm:col-span-3 h-fit flex flex-col gap-4 p-5 bg-white",
        "sm:gap-7 sm:p-7 rounded-xl sm:hover:z-10 sm:hover:shadow-lg sm:hover:shadow-gray-200/50 sm:hover:scale-[1.01] sm:hoverable pointer",
        "border-2 border-light-gray sm:border-0 relative", classNames?.mainWrapper
    ]

    const handleCardClick = () => router.push(`/product/${productCard.id}`)

    return (
        <div className={cn(wrapperCV)} onClick={handleCardClick}>
            <img
                src={productCard.image}
                className={"select-none w-full h-[100px] sm:h-[160px] object-scale-down"}
                alt={'Изображение продукта'}
            />
            <div className={"w-full flex flex-col gap-4 sm:gap-5"}>
                <div className={cn("w-full flex flex-col gap-1 min-h-[50px] sm:min-h-[85px]", classNames?.textWrapper)}>
                    <div className={"w-full hidden sm:flex flex-row items-baseline gap-3"}>
                        <Text
                            text={newPrice.toFixed(2) + " ₽"}
                            className={"text-[22px] font-semibold text-link-blue"}
                        />
                        {productCard.discountPercent !== 0 && <Text
                            text={price.toFixed(2) + " ₽"}
                            className={"text-base text-text-gray line-through"}
                        />}
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
                        {productCard.discountPercent !== 0 && <Text
                            text={price.toFixed(2) + " ₽"}
                            className={"text-sm text-text-gray line-through"}
                        />}
                        <Text
                            text={newPrice.toFixed(2) + " ₽"}
                            className={"text-[20px] sm:text-[24px] font-semibold text-link-blue"}
                        />
                    </div>
                    <div className={"flex flex-row items-center gap-4 sm:gap-5"}>
                        <Button
                            hasSpinner={false}
                            classNames={{button: "hidden sm:flex"}}
                            buttonType={isInCart ? "PRIMARY" : "SECONDARY"}
                            disabled={!productCard.inStock}
                            text={buttonText}
                            onClick={onBuyClick}
                            icon={buttonIcon}
                        />
                        <LikeButton
                            toggleLike={toggleLike}
                            isLiked={isLiked}
                        />
                        <BuyButton
                            isInCart={isInCart}
                            onClick={onBuyClick}
                        />
                    </div>
                </div>
            </div>
            <div className={"absolute left-5 top-5 z-10 flex flex-row gap-2"}>
                {
                    productCard.discountPercent !== 0 &&
                    <div className={"px-3 py-2 rounded-lg bg-green-500"}>
                        <Text
                            text={`Скидка ${productCard.discountPercent} %`}
                            className={"uppercase text-[12px] font-medium text-white"}
                        />
                    </div>
                }
                {
                    !productCard.inStock &&
                    <div className={"px-3 py-2 rounded-lg bg-gray-100"}>
                        <Text
                            className={"uppercase text-[12px] font-medium text-text-gray"}
                            text={"Нет в наличии"}
                        />
                    </div>
                }
            </div>

        </div>
    )
}

export default ProductCard
