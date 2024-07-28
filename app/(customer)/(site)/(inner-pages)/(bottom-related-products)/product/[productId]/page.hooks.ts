import {BASE_URL} from "@/api";
import {CatalogProducts} from "@/components/organisms/bars/catalog-left-sidebar/model";
import {ResponseProduct} from "@/types/dto/user/product/ResponseProduct";

export const getAllProducts = async (): Promise<CatalogProducts> => {
    return fetch(`${BASE_URL}/catalogue/product/filter?size=5000`, {cache: 'no-store'})
        .then(response => response.json())
}

export const getProductById = async (productId : number) : Promise<ResponseProduct> => {
    const response = await  fetch(`${BASE_URL}/catalogue/product/detail?productId=${productId}`, {cache : 'no-store'});

    if (response.ok) {
        return response.json();
    }

    throw new Error(response.statusText);
}