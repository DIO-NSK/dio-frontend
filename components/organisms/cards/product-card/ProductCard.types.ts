import { ResponseProductSearch } from "@/types/dto/user/product/ResponseProductSearch";

type ProductCardClassNames = {
    mainWrapper?: string,
    textWrapper?: string
}

type ProductCardProps = {
    productCard: ResponseProductSearch,
    classNames?: ProductCardClassNames
}

export type { ProductCardClassNames, ProductCardProps };
