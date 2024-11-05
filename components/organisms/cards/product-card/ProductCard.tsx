'use client'

import Button from "@/components/atoms/buttons/button/Button";
import LikeButton from "@/components/atoms/buttons/like-button/LikeButton";
import Text from "@/components/atoms/text/text-base/Text";
import BuyButton from "@/components/mobile/moleculas/buy-button/BuyButton";
import { ResponseProductSearch } from "@/types/dto/user/product/ResponseProductSearch";
import { cn } from "@/utlis/cn";
import { useProductCard } from "./ProductCard.hooks";
import { wrapperStyles } from "./ProductCard.styles";
import { ProductCardProps } from "./ProductCard.types";

interface TabletPriceProps {
    newPrice: number;
    price: number;
    discountPercent: number;
}

const TabletPrice = ({ newPrice, price, discountPercent }: TabletPriceProps) => (
    <span className={"w-full hidden md:flex flex-row items-baseline gap-3"}>
        <Text
            className={"xl:text-[22px] lg:text-[20px] font-semibold text-link-blue"}
            text={newPrice.toFixed(2) + " ₽"}
        />
        {discountPercent !== 0 ? <Text
            className={"xl:text-base lg:text-sm text-text-gray line-through"}
            text={price.toFixed(2) + " ₽"}
        /> : null}
    </span>
)

const MobilePrice = ({ newPrice, price, discountPercent }: TabletPriceProps) => (
    <span className={"md:hidden flex flex-col gap-[4px]"}>
        {discountPercent !== 0 && <Text
            className={"text-[14px] text-text-gray line-through"}
            text={price.toFixed(2) + " ₽"}
        />}
        <Text
            className={"text-[18px] font-semibold text-link-blue"}
            text={newPrice.toFixed(2) + " ₽"}
        />
    </span>
)

const Chips = ({ isNew, discountPercent, inStock }: ResponseProductSearch) => (
    <span className={"absolute left-5 top-5 z-10 flex flex-row gap-2"}>
        {
            isNew ? (
                <span className={"px-[10px] py-[6px] rounded-[5px] bg-blue-500"}>
                    <Text
                        className={"uppercase text-[10px] font-medium text-white"}
                        text={'Новинка'}
                    />
                </span>
            ) : null
        }
        {
            discountPercent !== 0 ? (
                <span className={"px-[10px] py-[6px] rounded-[5px] bg-green-500 h-fit"}>
                    <Text
                        className={"uppercase whitespace-nowrap text-[10px] font-medium text-white"}
                        text={`Скидка ${discountPercent} %`}
                    />
                </span>
            ) : null
        }
        {
            !inStock ? (
                <span className={"px-[10px] py-[6px] rounded-[5px] bg-gray-100 h-fit"}>
                    <Text
                        className={"uppercase whitespace-nowrap text-[10px] font-medium text-text-gray"}
                        text={"Нет в наличии"}
                    />
                </span>
            ) : null
        }
    </span>
)

const ProductCard = ({ productCard, classNames }: ProductCardProps) => {
    const {
        isLiked, toggleLike,
        onBuyClick, buttonIcon, buttonText,
        handleCardClick, price, newPrice, isInCart
    } = useProductCard(productCard);

    return (
        <article className={cn(wrapperStyles(classNames?.mainWrapper))} onClick={handleCardClick}>
            <img
                src={productCard.image ?? (productCard as any).mainImage}
                className={"select-none w-full h-[90px] lg:h-[130px] xl:h-[160px] object-scale-down"}
                alt={'Изображение продукта'}
            />
            <div className={"w-full flex flex-col sm:gap-4 xl:gap-5"}>
                <div className={cn("w-full flex flex-col gap-1", classNames?.textWrapper)}>
                    <TabletPrice newPrice={newPrice} price={price} discountPercent={productCard.discountPercent} />
                    <MobilePrice newPrice={newPrice} price={price} discountPercent={productCard.discountPercent} />
                    <span className={"w-full flex flex-col gap-2"}>
                        <Text
                            className={"font-medium text-sm line-clamp-3 md:line-clamp-2 xl:text-base md:min-h-[50px] max-h-fit"}
                            text={productCard.name}
                        />
                        {(productCard as any)?.quantity && <Text
                            text={`${(productCard as any)?.quantity} шт.`}
                            className={"text-base text-text-gray"}
                        />}
                    </span>
                </div>
                <footer className={"flex flex-row items-center gap-3 md:gap-5"}>
                    <Button
                        hasSpinner={false}
                        classNames={{ button: "hidden md:flex" }}
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
                </footer>
            </div>
            <Chips {...productCard} />
        </article>
    )
}

export default ProductCard
