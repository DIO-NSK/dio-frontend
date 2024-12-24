import { $cart } from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import ShoppingCartProductCard from "@/components/organisms/cards/ShoppingCartProductCard/ShoppingCartProductCard";
import { HeaderGroupWrapper } from "@/components/organisms/loading-blocks/cart/HeaderGroupWrapper/HeaderGroupWrapper";
import { useUnit } from "effector-react";
import { createStyles } from "./ProductGroup.styles";

export const ProductsGroup = () => {
  const cart = useUnit($cart);

  return (
    <HeaderGroupWrapper header="Продукты" amount={cart?.products.length}>
      {cart?.products.map((product, productIndex, arr) => (
        <ShoppingCartProductCard
          className={createStyles(productIndex !== arr.length - 1)}
          key={productIndex}
          card={product}
        />
      ))}
    </HeaderGroupWrapper>
  );
};
