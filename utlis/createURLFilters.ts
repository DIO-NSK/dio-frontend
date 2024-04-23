import {RequestFilterParams} from "@/components/organisms/bars/catalog-left-sidebar/model";

export const createURLFilters = (params: RequestFilterParams) => {

    let filterMap = ""

    for (const key of Object.keys(params.filterMap)) {
        filterMap += key + ":" + params.filterMap[key] + ","
    }

    return filterMap.slice(0, filterMap.length - 1)

}