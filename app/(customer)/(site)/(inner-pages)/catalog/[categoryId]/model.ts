import {api} from "@/api";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";
import {createEffect, createEvent, createStore, sample} from "effector";
import {sendFiltersFx} from "@/components/organisms/bars/catalog-left-sidebar/model";

const getCategoryByName = async (categoryId : number) : Promise<ResponseProductSearch[]> => {
    return api.get("/catalogue/category", {params : {categoryId : categoryId}})
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const getCategoryByNameFx = createEffect<number, ResponseProductSearch[], Error>(getCategoryByName)
export const getCategoryByNameEvent = createEvent<number>()
export const $products = createStore<ResponseProductSearch[]>([])
$products
    .on(getCategoryByNameFx.doneData, (_, products) => products)
    .on(sendFiltersFx.doneData, (_, products) => products)

sample({
    clock : getCategoryByNameEvent,
    target : getCategoryByNameFx
})