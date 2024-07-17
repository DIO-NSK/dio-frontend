import {api} from "@/api";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";

export const getOurWatersProducts = async (categoryId : number, filterMap : string) : Promise<ResponseProductSearch[]> => {
    return api.get("/catalogue/product/filter", {
        params: {
            categoryId: categoryId,
            filterMap: filterMap,
        }
    }).then(response => response.data.products)
}