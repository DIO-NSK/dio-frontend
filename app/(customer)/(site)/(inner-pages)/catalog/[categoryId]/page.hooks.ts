import {Breadcrumbs} from "@/types/dto/Breadcrumbs";
import {BASE_URL} from "@/api";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";

export const getCategoryBreadcrumbs = async (categoryId : number) : Promise<Breadcrumbs> => {
    return fetch(`${BASE_URL}/catalogue/breadcrumb/category?categoryId=${categoryId}`, {cache : 'no-store'})
        .then(response => response.json())
}

export const getCategoryProducts = async (categoryId : number) : Promise<ResponseProductSearch[]> => {
    return fetch(`${BASE_URL}/catalogue/category?categoryId=${categoryId}`, {cache : 'no-store'})
        .then(response => response.json())
}