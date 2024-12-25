import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import { cn } from "@/utlis/cn";
import { Box } from "@chakra-ui/react";
import { useMemo } from "react";
import { wrapperCN } from "./FavoritesContentBlock.styles";
import { FavoritesContentBlockProps } from "./FavoritesContentBlock.types";

export const FavoritesContentBlock = ({ products }: FavoritesContentBlockProps) => {
  const sortedProducts = useMemo(() => products.sort((fst, snd) => fst.id - snd.id), [products]);

  return (
    <Box className={cn(wrapperCN)}>
      {sortedProducts.map((card) => (
        <ProductCard
          classNames={{ mainWrapper: "w-full md:col-span-4 xl:col-span-3" }}
          productCard={card}
          key={card.id}
        />
      ))}
    </Box>
  );
};
