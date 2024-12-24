import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import { SkeletonProductCardList } from "./ProductGrid.loading";
import { ProductGridProps } from "./ProductGrid.types";

export const ProductsGrid = ({ filtersPending, products }: ProductGridProps) => {
  if (filtersPending) {
    return <SkeletonProductCardList />;
  }

  return products.map((card) => (
    <ProductCard classNames={{ mainWrapper: "w-full", textWrapper: "min-h-0" }} productCard={card} />
  ));
};
