import {api} from "@/api";
import {createEffect, createEvent, sample} from "effector";
import {AdminSale} from "@/types/dto/AdminSale";
import {CreateSaleData} from "@/schemas/admin/CreateSaleSchema";

type CreateSaleRequest = {
    sale : AdminSale,
    images : File[]
}

const createSale = async (request : CreateSaleRequest) : Promise<void> => {

    const {sale, images} = request
    const formData = new FormData()

    images.map(photo => formData.append("images", photo))
    formData.append("promoDto", new Blob([JSON.stringify(sale)], {type: "application/json"}))

    return api.post("/admin/catalogue/promo", formData, {headers: {"Content-type": "multipart/form-data"}})
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})

}

const createSaleFx = createEffect<CreateSaleRequest, void, Error>(createSale)
export const createSaleEvent = createEvent<CreateSaleData>()

sample({
    clock : createSaleEvent,
    fn : (data) => convertSaleDataToRequest(data),
    target : createSaleFx
})

const convertSaleDataToRequest = (data : CreateSaleData) : CreateSaleRequest => {
    return {
        sale : {
            name : data.name,
            crmGroup : data.crmGroup,
            crmCode : data.crmCode,
            description : data.description,
            deadline : "2024-07-08",
            products : data.productIdList,
            ruleList : data.ruleList.map(item => item.rule)
        },
        images : data.photos
    }
}