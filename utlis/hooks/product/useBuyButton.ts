import { removeProductFromCartEvent } from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import { addToCartEvent } from "@/components/organisms/cards/product-price-card/model";
import { useUnit } from "effector-react";
import { MouseEventHandler, useEffect, useState } from "react";

export const useBuyButton = (inCart: boolean, productId: number, isSale?: boolean) => {
  const [addToCart, removeFromCart] = useUnit([addToCartEvent, removeProductFromCartEvent]);
  const [isSelected, setSelected] = useState<boolean>(inCart);

  const onClick: MouseEventHandler = (event) => {
    event.stopPropagation();

    if (isSelected) {
      if (isSale) {
        removeFromCart({ promoId: productId });
      } else {
        removeFromCart({ productId: productId });
      }
    } else {
      if (isSale) {
        addToCart({ promoId: productId, quantityPromo: 1 });
      } else {
        addToCart({ productId: productId, quantityProduct: 1 });
      }
    }

    setSelected(!isSelected);
  };

  /** Принудительно обновляет значение, если данные изменились. */
  useEffect(() => setSelected(inCart), [inCart]);

  return [isSelected, onClick] as const;
};
