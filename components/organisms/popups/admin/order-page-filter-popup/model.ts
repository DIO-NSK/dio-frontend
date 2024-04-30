import {api} from "@/api";
import {createEffect, createEvent, sample} from "effector";
import {AdminOrder} from "@/types/dto/AdminOrder";

type OrderFilters = {
    status: string,
    created: string,
    deliveryTime: string,
    numberPhone: string,
    firstName: string,
    lastName: string,
    costFrom: number,
    costTo: number,
    orderId: number
}

export type RequestOrderFilters = Partial<OrderFilters>

const filterOrders = async (filters : RequestOrderFilters) : Promise<AdminOrder[]> => {
    return api.get("/order/admin/filter", {
        params : {
            orderFilterDto : filters
        }
    })
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

export const filterOrdersFx = createEffect<RequestOrderFilters, AdminOrder[], Error>(filterOrders)
export const filterOrdersEvent = createEvent<RequestOrderFilters>()

sample({
    clock : filterOrdersEvent,
    target : filterOrdersFx
})
