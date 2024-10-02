import {Breadcrumbs} from "@/types/dto/Breadcrumbs";
import {BASE_URL} from "@/api";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";
import {notFound} from "next/navigation";

export const getCategoryBreadcrumbs = async (categoryId: number): Promise<Breadcrumbs> => {
    return fetch(`${BASE_URL}/catalogue/breadcrumb/category?categoryId=${categoryId}`, {cache: 'no-store'})
        .then(response => response.json())
}

export const getCategoryProducts = async (categoryId: number): Promise<ResponseProductSearch[]> => {
    const response = await  fetch(`${BASE_URL}/catalogue/category?categoryId=${categoryId}`, {cache: 'no-store'});

    if (response.ok) {
        return response.json();
    }

    throw new Error(response.statusText);
}