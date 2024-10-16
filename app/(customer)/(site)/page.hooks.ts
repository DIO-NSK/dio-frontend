import { BASE_URL } from "@/api";
import { OurWaterChip, ResponseOurWater } from "@/app/admin/promo/models/our_waters.model";
import { ResponseProductSearch } from "@/types/dto/user/product/ResponseProductSearch";

interface ImageUrlDto {
    tabletHorizontalImageUrl : string;
    tabletVerticalImageUrl : string;
    mobileImageUrl : string;
} 

export interface ResponseCustomerBanner {
    id : number;
    link : string;
    mainImageUrl : string;
    imageUrlDto : Partial<ImageUrlDto>;
}

export const getBanners = async (): Promise<ResponseCustomerBanner[]> => {
    return fetch(`${BASE_URL}/banner/all`, {cache: 'no-store'})
        .then(response => response.json())
}

export const getPromotions = async (): Promise<ResponseCustomerBanner[]> => {
    return fetch(`${BASE_URL}/banner/promotion/all`, {cache: 'no-store'})
        .then(response => response.json())
}

export const getOurWaters = async (): Promise<ResponseOurWater[]> => {
    return fetch(`${BASE_URL}/banner/water/all`, {cache: 'no-store'})
        .then(response => response.json())
}

export const getOurWatersChips = async (): Promise<OurWaterChip[]> => {
    return fetch(`${BASE_URL}/catalogue/brand/amount/range`, {cache: 'no-store'})
        .then(response => response.json());
}

export const getSaleProducts = async (): Promise<ResponseProductSearch[]> => {
    const pages = [0, 1];

    const products = await Promise.all(pages.map(async (page) =>
        fetch(`${BASE_URL}/catalogue/product/discount?size=10&page=${page}`, {cache: 'no-store'})
            .then(response => response.json())
            .then(json => json.products)));

    return products.flat();
}

export const getNewProducts = async (): Promise<ResponseProductSearch[]> => {
    const pages = [0, 1];

    const products = await Promise.all(pages.map(async (page) =>
        fetch(`${BASE_URL}/catalogue/product/filter?isNew=true&size=10&page=${page}&sort=discountPercent,asc`, {cache: 'no-store'})
            .then(response => response.json())
            .then(json => json.products)));

    return products.flat();
}

export const getDayProducts = async (): Promise<ResponseProductSearch[]> => {
    return fetch(`${BASE_URL}/catalogue/product/day`, {cache: 'no-store'})
        .then(response => response.json())
}

export const getBucketPhotos = async (): Promise<string[]> => {
    return fetch(`${BASE_URL}/bucket`, {cache: 'no-store'})
        .then(response => response.json())
}