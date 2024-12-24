import { PropsWithChildren } from "react";
import { ProductCardProps } from "../ProductCard.types";
import { ProductCardContext } from "./ProductCardContext";

export const ProductCardContextProvider = ({ children, ...value }: PropsWithChildren<ProductCardProps>) => (
  <ProductCardContext.Provider value={value}>{children}</ProductCardContext.Provider>
);
