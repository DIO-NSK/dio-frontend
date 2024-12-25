import { ResponseCartItem } from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";

export type ShoppingCartProductCardProps = {
  card: ResponseCartItem;
  canInteract?: boolean;
  className?: string;
  hasLink?: boolean;
  isOrder?: boolean;
};
