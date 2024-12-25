import { ResponseProductSearch } from "@/types/dto/user/product/ResponseProductSearch";

interface ProductCardClassNames {
  mainWrapper?: string;
  textWrapper?: string;
}

interface ProductCardProps {
  productCard: ResponseProductSearch;
  classNames?: ProductCardClassNames;
}

interface TabletPriceProps {
  discountPercent: number;
  newPrice: number;
  price: number;
}

export type { ProductCardClassNames, ProductCardProps, TabletPriceProps };
