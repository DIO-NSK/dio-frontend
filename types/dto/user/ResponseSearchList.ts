import {ResponsePromoSearch} from "@/types/dto/user/promo/ResponsePromoSearch";

export type ResponseSearchList = {
    productList: ResponseSearchList[],
    categoryList: ResponsePromoSearch[],
    promoList: ResponsePromoSearch[]
}