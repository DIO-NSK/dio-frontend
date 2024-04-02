import {api} from "@/api";
import {createEffect} from "effector";
import {AdminSale} from "@/types/dto/AdminSale";

type CreateSaleRequest = {
    sale : AdminSale,
    images : string[]
}

const createSale = async (request : CreateSaleRequest) : Promise<void> => {
    return api.post("/admin/catalogue/promo", request)
        .then(response => response.data)
}

export const createSaleFx = createEffect<CreateSaleRequest, void, Error>(createSale)