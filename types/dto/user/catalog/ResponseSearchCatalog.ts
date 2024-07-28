import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";
import {ResponsePromoSearch} from "@/types/dto/user/promo/ResponsePromoSearch";

export type ResponseSearchCatalog = {
    productList : ResponseProductSearch[],
    categoryList : ResponsePromoSearch[],
    promoList : ResponsePromoSearch[]
}