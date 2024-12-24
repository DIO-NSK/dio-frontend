"use client";

import { cn } from "@/utlis/cn";
import { Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Body } from "./Body/Body";
import { Chips } from "./Chips/Chips";
import { Footer } from "./Footer/Footer";
import { Container, InnerContainer, wrapperStyles } from "./ProductCard.styles";
import { ProductCardProps } from "./ProductCard.types";
import { ProductCardContextProvider } from "./ProductCardContext";

const ProductCard = ({ productCard, classNames, controlled }: ProductCardProps) => {
  const router = useRouter();

  const handleCardClick = () => router.push(`/product/${(productCard as any).urlMask}`);

  return (
    <ProductCardContextProvider productCard={productCard} classNames={classNames} controlled={controlled}>
      <Container className={cn(wrapperStyles(classNames?.mainWrapper))} onClick={handleCardClick}>
        <Image
          className="select-none w-full h-[90px] lg:h-[130px] xl:h-[160px] object-scale-down"
          src={productCard.image ?? (productCard as any).mainImage}
          alt="Изображение продукта"
        />
        <InnerContainer className="sm:gap-4 xl:gap-5">
          <Body />
          <Footer />
        </InnerContainer>
        <Chips {...productCard} />
      </Container>
    </ProductCardContextProvider>
  );
};

export default ProductCard;
