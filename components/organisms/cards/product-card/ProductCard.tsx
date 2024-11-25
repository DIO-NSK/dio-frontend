"use client";

import Button from "@/components/atoms/buttons/button/Button";
import LikeButton from "@/components/atoms/buttons/like-button/LikeButton";
import Text from "@/components/atoms/Text/Text";
import BuyButton from "@/components/mobile/moleculas/buy-button/BuyButton";
import { cn } from "@/utlis/cn";
import { Chips } from "./Chips/Chips";
import { MobilePrice } from "./MobilePrice/MobileAccess";
import { useProductCard } from "./ProductCard.hooks";
import { wrapperStyles } from "./ProductCard.styles";
import { ProductCardProps } from "./ProductCard.types";
import { TabletPrice } from "./TabletPrice/TabletPrice";

const ProductCard = ({ productCard, classNames }: ProductCardProps) => {
  const { isLiked, toggleLike, onBuyClick, buttonIcon, buttonText, handleCardClick, price, newPrice, isInCart } =
    useProductCard(productCard);

  return (
    <article className={cn(wrapperStyles(classNames?.mainWrapper))} onClick={handleCardClick}>
      <img
        src={productCard.image ?? (productCard as any).mainImage}
        className={"select-none w-full h-[90px] lg:h-[130px] xl:h-[160px] object-scale-down"}
        alt={"Изображение продукта"}
      />
      <div className={"w-full flex flex-col sm:gap-4 xl:gap-5"}>
        <div className={cn("w-full flex flex-col gap-1", classNames?.textWrapper)}>
          <TabletPrice newPrice={newPrice} price={price} discountPercent={productCard.discountPercent} />
          <MobilePrice newPrice={newPrice} price={price} discountPercent={productCard.discountPercent} />
          <span className={"w-full flex flex-col gap-2"}>
            <Text
              className={"font-medium text-sm line-clamp-2 xl:text-base xl:min-h-[50px] max-h-fit"}
              text={productCard.name}
            />
            {(productCard as any)?.quantity && (
              <Text text={`${(productCard as any)?.quantity} шт.`} className={"text-base text-text-gray"} />
            )}
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
          <LikeButton toggleLike={toggleLike} isLiked={isLiked} />
          <BuyButton isInCart={isInCart} onClick={onBuyClick} />
        </footer>
      </div>
      <Chips {...productCard} />
    </article>
  );
};

export default ProductCard;
