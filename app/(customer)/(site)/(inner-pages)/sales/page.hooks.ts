import {ResponseShortSale} from "@/app/admin/sales/model";
import {BASE_URL} from "@/api";
import {SaleDetails} from "@/app/(customer)/(site)/(inner-pages)/sales/[saleUrlMask]/model";
import {notFound} from "next/navigation";

export const getSales = async (): Promise<ResponseShortSale[]> => {
    return fetch(`${BASE_URL}/catalogue/promo/all`, {cache: 'no-store'})
        .then(response => response.json())
}

export const getSaleById = async (saleId: number): Promise<SaleDetails> => {
    const query = `id=${saleId}`
    return fetch(`${BASE_URL}/catalogue/promo/detail?${query}`, {cache: 'no-store'})
        .then(async response => {
            if (response.ok) {
                return response.json();
            } else {
                notFound();
            }
        })
}