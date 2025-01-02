import { createContext, useContext } from "react";
import { ProductCardProps } from "../ProductCard.types";

const defaultValues: ProductCardProps = {
  productCard: null as any,
  classNames: undefined,
};

export const ProductCardContext = createContext<ProductCardProps>(defaultValues);

export const useProductCardContext = () => {
  const context = useContext(ProductCardContext);

  if (!context.productCard) {
    throw new Error("Сущность productCard отсутствует в контексте ProductCardContext.");
  }

  return context;
};
