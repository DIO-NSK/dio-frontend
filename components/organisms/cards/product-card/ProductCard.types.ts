import { ResponseProductSearch } from "@/types/dto/user/product/ResponseProductSearch";

type ProductCardClassNames = {
    mainWrapper?: string,
    textWrapper?: string
}

type ProductCardProps = {
    productCard: ResponseProductSearch,
    classNames?: ProductCardClassNames
}

interface TabletPriceProps {
    discountPercent: number;
    newPrice: number;
    price: number;
}

export type { ProductCardClassNames, ProductCardProps, TabletPriceProps };
