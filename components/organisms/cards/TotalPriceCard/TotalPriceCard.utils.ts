import { ResponseCartItem } from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import { MINIMUM_CART_PRICE, MINIMUM_OUR_WATER_AMOUNT_IN_CART, OUR_WATER_CATEGORY_ID } from "@/constants";
import { CartItem } from "./TotalPriceCard.types";

export const validateCart = (totalPrice: number, products: CartItem[]) => {
  const waterAmountInCart = products.reduce((acc, item) => {
    if ((item as ResponseCartItem).categoryId === OUR_WATER_CATEGORY_ID) {
      return acc + (item as ResponseCartItem).quantity;
    }
    return acc;
  }, 0);

  return waterAmountInCart >= MINIMUM_OUR_WATER_AMOUNT_IN_CART || totalPrice >= MINIMUM_CART_PRICE;
};
