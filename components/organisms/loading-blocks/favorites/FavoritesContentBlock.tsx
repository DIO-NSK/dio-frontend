import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import { cn } from "@/utlis/cn";
import { Box } from "@chakra-ui/react";
import { wrapperCN } from "./FavoritesContentBlock.styles";
import { FavoritesContentBlockProps } from "./FavoritesContentBlock.types";

export const FavoritesContentBlock = ({ products }: FavoritesContentBlockProps) => (
  <Box className={cn(wrapperCN)}>
    {products.map((card, index) => (
      <ProductCard
        classNames={{ mainWrapper: "w-full md:col-span-4 xl:col-span-3" }}
        productCard={card}
        key={index}
        controlled
      />
    ))}
  </Box>
);
