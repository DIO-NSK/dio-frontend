import { ResponseProductSearch } from "@/types/dto/user/product/ResponseProductSearch";

export interface ProductGridProps {
  products: ResponseProductSearch[];
  filtersPending: boolean;
}
