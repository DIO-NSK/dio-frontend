import {createEffect, createEvent, createStore, sample} from "effector";
import {debounce} from "patronum";
import {unauthorizedApi} from "@/api";
import {ResponseSearchList} from "@/types/dto/user/ResponseSearchList";
import {ResponseSearchCatalog} from "@/types/dto/user/catalog/ResponseSearchCatalog";

const DEBOUNCE_TIMEOUT = 400

// region search catalog
const searchCatalog = async (searchName: string) => {
    return unauthorizedApi.get("/catalogue/search", {params: {name: searchName}})
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

const searchCatalogFx = createEffect<string, ResponseSearchList, Error>(searchCatalog)
export const setSearchNameEvent = createEvent<string>()

const debounced = debounce({
    source: setSearchNameEvent,
    timeout: DEBOUNCE_TIMEOUT
})

sample({
    clock: debounced,
    filter: (name) => name.length !== 0,
    target: searchCatalogFx
})

//endregion

//region catalog state

const getCatalog = async (): Promise<CatalogItem[]> => {
    return unauthorizedApi.get("/catalogue")
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}

const getCatalogFx = createEffect<void, CatalogItem[], Error>(getCatalog)
export const getCatalogEvent = createEvent<void>()

const $getCatalogError = createStore<string>("")
export const $catalog = createStore<CatalogItem[]>([])
export const $activeSection = createStore<CatalogItem | null>(null)
export const selectActiveSectionEvent = createEvent<TabBarItem>()
$getCatalogError.on(getCatalogFx.failData, (_, error) => error.message)
$catalog.on(getCatalogFx.doneData, (_, catalog) => catalog)

$activeSection.watch(console.log)

sample({
    clock: getCatalogFx.doneData,
    source : $activeSection,
    fn: (section, catalog: CatalogItem[]) => section ?? catalog[0],
    target: $activeSection
})

sample({
    clock: selectActiveSectionEvent,
    source: $catalog,
    fn: (catalog: CatalogItem[], tabItem: TabBarItem) =>
        catalog.find(section => section.name === tabItem.text)!!,
    target: $activeSection
})

sample({
    clock: getCatalogEvent,
    target: getCatalogFx
})

//endregion

//region catalog popup state

export const $catalogPopupOpen = createStore<boolean>(false)
export const toggleCatalogPopupEvent = createEvent()

$catalogPopupOpen.on(toggleCatalogPopupEvent, (state) => !state)

//endregion

//region search by name

const searchCatalogByName = async (name: string): Promise<ResponseSearchCatalog> => {
    return unauthorizedApi.get("/catalogue/search", {params: {name: name}})
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

const searchCatalogByNameFx = createEffect<string, ResponseSearchCatalog, Error>(searchCatalogByName)
export const searchCatalogByNameEvent = createEvent<string>()

export const $searchValue = createStore<string>("")
export const $searchCatalog = createStore<ResponseSearchCatalog | null>(null)
$searchCatalog.on(searchCatalogByNameFx.doneData, (_, catalog) => catalog)
$searchValue.on(searchCatalogByNameEvent, (_, searchValue) => searchValue)

const debouncedSearchCatalogEvent = debounce({
    source: searchCatalogByNameEvent,
    timeout: DEBOUNCE_TIMEOUT
})

sample({
    clock: debouncedSearchCatalogEvent,
    filter : (name : string) => name.length !== 0,
    target: searchCatalogByNameFx
})