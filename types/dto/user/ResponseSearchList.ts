import {ResponsePromoSearch} from "@/types/dto/user/promo/ResponsePromoSearch";

export type ResponseProductSearchShort = {
    id: number,
    name: string,
    price: number
}

export type ResponseSearchList = {
    productList: ResponseProductSearchShort[],
    categoryList: ResponsePromoSearch[],
    promoList: ResponsePromoSearch[]
}