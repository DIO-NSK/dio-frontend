import {BASE_URL} from "@/api";
import {ResponseBanner} from "@/app/admin/promo/models/banner.model";
import {ResponsePromotion} from "@/app/admin/promo/models/promotion.model";
import {ResponseOurWater} from "@/app/admin/promo/models/our_waters.model";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";

export const getBanners = async (): Promise<ResponseBanner[]> => {
    return fetch(`${BASE_URL}/banner/all`, {cache: 'no-store'})
        .then(response => response.json())
}

export const getPromotions = async (): Promise<ResponsePromotion[]> => {
    return fetch(`${BASE_URL}/banner/promotion/all`, {cache: 'no-store'})
        .then(response => response.json())
}

export const getOurWaters = async (): Promise<ResponseOurWater[]> => {
    return fetch(`${BASE_URL}/banner/water/all`, {cache: 'no-store'})
        .then(response => response.json())
}

export const getSaleProducts = async (): Promise<ResponseProductSearch[]> => {
    const pages = [0, 1];

    const products = await Promise.all(pages.map(async (page) =>
        fetch(`${BASE_URL}/catalogue/product/filter?discountPercent=0&size=10&page=${page}`, {cache: 'no-store'})
            .then(response => response.json())
            .then(json => json.products)));

    return products.flat();
}

export const getDayProducts = async (): Promise<ResponseProductSearch[]> => {
    return fetch(`${BASE_URL}/catalogue/product/day`, {cache: 'no-store'})
        .then(response => response.json())
}