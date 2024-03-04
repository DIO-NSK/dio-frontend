import {api} from "@/api";
import {CreateProductData} from "@/schemas/admin/CreateProductSchema";
import {AdminFilledProperty, RequestAdminProduct} from "@/types/dto/product/RequestAdminProduct";
import {createEffect, createStore} from "effector";

type CreateProductParams = {
    categoryId: number,
    productData: CreateProductData
}

const createProduct = async ({categoryId, productData}: CreateProductParams) => {

    const {photos, ...rest} = productData

    const product: RequestAdminProduct = convertFormDataToProduct(rest)
    const formData = new FormData()

    photos.map(photo => formData.append("images", photo))
    formData.append("product", new Blob([JSON.stringify(product)], {type: "application/json"}))

    return api.post("/admin/catalogue/product", formData, {
        params: {categoryId: categoryId},
        headers : {"Content-type" : "multipart/form-data"}
    })
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})

}
export const createProductFx = createEffect<CreateProductParams, any, Error>(createProduct)
export const $createProductError = createStore<string>("")

$createProductError.on(createProductFx.failData, (_, error) => error.message)

const convertFormDataToProduct = (productData: Omit<CreateProductData, "photos">): RequestAdminProduct => {
    return {
        ...productData,
        crmGroup: productData.crmGroup.value,
        filledProperties: productData.filledProperties
            .map((property, index) : AdminFilledProperty =>
                ({value : property.name, propertyId : index}))
    }
}