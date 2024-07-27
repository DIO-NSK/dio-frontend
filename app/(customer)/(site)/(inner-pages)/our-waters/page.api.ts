import {api} from "@/api";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";

export const getOurWatersProducts = async (brand : string) : Promise<ResponseProductSearch[]> => {
    return api.get("catalogue/product/brand", {params: {brand}})
        .then(response => response.data)
        .catch(err => console.log(err))
}