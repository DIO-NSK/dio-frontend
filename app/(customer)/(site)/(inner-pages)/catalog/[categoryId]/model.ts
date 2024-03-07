import {api} from "@/api";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";
import {createEffect, createEvent, createStore, sample} from "effector";

const getCategoryByName = async (categoryId : number) : Promise<ResponseProductSearch[]> => {
    return api.get("/catalogue/category", {params : {categoryId : categoryId}})
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const getCategoryByNameFx = createEffect<number, ResponseProductSearch[], Error>(getCategoryByName)
export const getCategoryByNameEvent = createEvent<number>()
export const $categories = createStore<ResponseProductSearch[]>([])
$categories.on(getCategoryByNameFx.doneData, (_, categories) => categories)

sample({
    clock : getCategoryByNameEvent,
    target : getCategoryByNameFx
})