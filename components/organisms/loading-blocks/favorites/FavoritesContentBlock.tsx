import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import { ResponseProductSearch } from "@/types/dto/user/product/ResponseProductSearch";
import { cn } from "@/utlis/cn";
import { Box } from "@chakra-ui/react";

const wrapperCN = [
  "w-full md:col-span-8 xl:col-span-9 flex flex-col gap-3 md:gap-5",
  "xl:gap-7 md:grid md:grid-cols-8 xl:grid-cols-9",
];

export const FavoritesContentBlock = ({ products }: { products: ResponseProductSearch[] }) => (
  <Box className={cn(wrapperCN)}>
    {products.map((card, index) => (
      <ProductCard classNames={{ mainWrapper: "w-full md:col-span-4 xl:col-span-3" }} productCard={card} key={index} />
    ))}
  </Box>
);
