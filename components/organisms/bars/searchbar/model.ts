import {createEffect, createEvent, sample} from "effector";
import {debounce} from "patronum";
import {api} from "@/api";
import {ResponseSearchList} from "@/types/dto/user/ResponseSearchList";

const DEBOUNCE_TIMEOUT = 400

const searchCatalog = async (searchName : string) => {
    return api.get("/catalogue/search", {params : {name : searchName}})
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const searchCatalogFx = createEffect<string, ResponseSearchList, Error>(searchCatalog)
export const setSearchNameEvent = createEvent<string>()

const debounced = debounce({
    source : setSearchNameEvent,
    timeout : DEBOUNCE_TIMEOUT
})

sample({
    clock : debounced,
    filter : (name) => name.length !== 0,
    target : searchCatalogFx
})