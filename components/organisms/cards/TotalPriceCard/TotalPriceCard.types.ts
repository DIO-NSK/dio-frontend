import {
  ResponseCartItem,
  ResponseCartSaleItem,
} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import { ResponseProductSearch } from "@/types/dto/user/product/ResponseProductSearch";

export type CartItem = ResponseCartItem | ResponseProductSearch;

export interface TotalPriceCardProps {
  promos: ResponseCartSaleItem[];
  products: CartItem[];
  buttonText: string;
  onClick: () => void;
}
