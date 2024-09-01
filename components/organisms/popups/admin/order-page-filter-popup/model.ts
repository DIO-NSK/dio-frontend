import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {AdminOrder} from "@/types/dto/AdminOrder";
import {OrderFilterData} from "@/schemas/admin/OrderFiltersSchema";

type OrderFilters = {
    status: string,
    created: string,
    paymentType: string,
    paymentTime: string,
    numberPhone: string,
    firstName: string,
    lastName: string,
    costFrom: number,
    costTo: number,
    orderId: number,
    page : number,
}

type PriceRange = {
    min : number,
    max : number
}

export type RequestOrderFilters = Partial<OrderFilters>

export type PageableOrdersFilterData = OrderFilterData & {page : number}

export type ResponseFilterOrders = {
    count : number,
    orders : AdminOrder[]
}

const filterOrders = async (filters: RequestOrderFilters): Promise<ResponseFilterOrders> => {
    return api.get(`/admin/order/filter?page=${filters.page}&size=30`, {params: filters})
        .then(response => response.data)
}

export const filterOrdersFx = createEffect<RequestOrderFilters, ResponseFilterOrders, Error>(filterOrders)

export const filterOrdersEvent = createEvent<PageableOrdersFilterData>()

export const saveFiltersEvent = createEvent<PageableOrdersFilterData>()

export const resetFiltersEvent = createEvent<void>()

export const savePriceRangeEvent = createEvent<PriceRange>()

export const $savedFilters = createStore<PageableOrdersFilterData | null>(null)
export const $savedPriceRange = createStore<PriceRange | null>(null)
export const $ordersLength = createStore<number>(0);

$ordersLength.on(filterOrdersFx.doneData, (_, response) => response.count)

$savedFilters
    .on(saveFiltersEvent, (_, filters) => filters)
    .on(resetFiltersEvent, () => null)

$savedPriceRange.on(savePriceRangeEvent, (_, range) => range)

sample({
    clock: filterOrdersEvent,
    fn: (data) => convertDataToRequest(data),
    target: filterOrdersFx
})

const convertDataToRequest = (data: PageableOrdersFilterData): RequestOrderFilters => ({
    created : data.created?.length ? parseDate(data.created) : undefined,
    costFrom : data?.cost?.from ?? undefined,
    costTo : data?.cost?.to ?? undefined,
    paymentType: data.paymentType?.value,
    paymentTime: data.paymentDate,
    status: data.status?.value,
    page : data.page
} as RequestOrderFilters)

export const parseDate = (date : string) => {
    const [day, month, year] = date.split('.')
    return [year, month, day].join('-')
}