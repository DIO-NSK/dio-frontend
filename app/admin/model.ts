import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {OrderStatus} from "@/types/dto/user/order/ResponseProfileOrder";

export type OrderGraphPoint = {
    date : string,
    orderStatusMap : Record<OrderStatus, number>
}

export type VisitGraphPoint = {
    date : string,
    totalCountVisits : number,
    uniqueCountVisits : number
}

export type GraphPoint = {
    label : string,
    value : string
}

export type GraphRequestParams = {
    beginDate : string,
    endDate : string
}

const getOrdersGraph = async (params : GraphRequestParams) : Promise<OrderGraphPoint[]> => {
    return api.get("/admin/stat/graph/order", {params : params})
        .then(response => response.data)
}

const getOrderGraphFx = createEffect<GraphRequestParams, OrderGraphPoint[], Error>(getOrdersGraph)
export const getOrdersGraphEvent = createEvent<GraphRequestParams>()
export const $orderGraphPoints = createStore<GraphPoint[]>([])

$orderGraphPoints.on(getOrderGraphFx.doneData, (_, graphPoints) => convertOrderPointsToGraphPoints(graphPoints))

sample({
    clock : getOrdersGraphEvent,
    filter : (dates) => dates.beginDate.length !== 0 && dates.endDate.length !== 0,
    target : getOrderGraphFx
})

const getVisitsGraph = async (params : GraphRequestParams) : Promise<VisitGraphPoint[]> => {
    return api.get("/admin/stat/graph/visit", {params : params})
        .then(response => response.data)
}

const getVisitPointsFx = createEffect<GraphRequestParams, VisitGraphPoint[], Error>(getVisitsGraph)
export const getVisitPointsEvent = createEvent<GraphRequestParams>()
export const $graphVisitPoints = createStore<GraphPoint[]>([])

$graphVisitPoints.on(getVisitPointsFx.doneData, (_, graphPoints) => convertVisitPointsToGraphPoints(graphPoints))

sample({
    clock : getVisitPointsEvent,
    filter : (dates) => dates.beginDate.length !== 0 && dates.endDate.length !== 0,
    target : getVisitPointsFx
})

const convertOrderPointsToGraphPoints = (points : OrderGraphPoint[]) : GraphPoint[] => {
    return points.map(point => {
        const dayValues = Object.values(point.orderStatusMap).reduce((acc, item) => {
            const currentValue = Number.isNaN(Number(item)) ? 0 : Number(item);
            
            return acc + currentValue;
        }, 0);
        
        return {label : point.date, value : String(dayValues)}
    })
}

const convertVisitPointsToGraphPoints = (points : VisitGraphPoint[]) : GraphPoint[] => {
    return points.map(point => ({label : point.date, value : point.totalCountVisits.toString()}))
}