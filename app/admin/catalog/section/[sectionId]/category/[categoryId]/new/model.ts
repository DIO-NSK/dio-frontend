import {api} from "@/api";
import {CategoryPropertyData, CreateProductData} from "@/schemas/admin/CreateProductSchema";
import {RequestAdminProduct} from "@/types/dto/admin/product/RequestAdminProduct";
import {createEffect, createEvent, createStore, sample} from "effector";
import {Category} from "@/types/dto/Category";
import {InputPrefilledData} from "@/types/props/inputs/InputPrefilledData";
import {pending} from "patronum";

type CreateProductParams = {
    categoryId: number,
    productData: CreateProductData,
    productDetails?: RequestAdminProduct
}

type EditProductParams = {
    productId: number
} & Omit<CreateProductParams, "categoryId">

export type GetProductDetailsParams = {
    crmCode: string,
    crmGroup: string
}

const createProduct = async ({categoryId, productData, productDetails}: CreateProductParams) => {
    const {photos, ...rest} = productData
    const product: RequestAdminProduct = convertFormDataToProduct(rest, productDetails!!)
    return api.post("/admin/catalogue/v2/product", {...product, imagesUrl: photos}, {
        params: {categoryId: categoryId},
    }).then(response => response.data)
}

const editProduct = async ({productId, productData}: EditProductParams) => {
    const {photos, ...rest} = productData
    return api.put("/admin/catalogue/v2/product", {...rest, oldImagesUrl: photos}, {
        params: {productId: productId},
    }).then(response => response.data)
}

export const editProductFx = createEffect<EditProductParams, void, Error>(editProduct)

const getCategoryProperties = async (categoryId: number): Promise<Category> => {
    return api.get("/admin/catalogue/category", {params: {categoryId: categoryId}})
        .then(response => response.data)
}

const getProductDetailsFromCRM = async (params: GetProductDetailsParams) => {
    return api.get("/admin/catalogue/product/crm", {params: {crmCode: params.crmCode, crmGroup: params.crmGroup}})
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.message)
        })
}

const getProductDetailsFx = createEffect<GetProductDetailsParams, RequestAdminProduct, Error>(getProductDetailsFromCRM)
export const $isProductDetailsLoading = pending([getProductDetailsFx])

export const getProductDetailsEvent = createEvent<GetProductDetailsParams>()
export const $productDetails = createStore<RequestAdminProduct | null>(null)
export const newProductPageDidMountEvent = createEvent()

const getCategoryPropertiesFx = createEffect<number, Category, Error>(getCategoryProperties)
export const getCategoryPropertiesEvent = createEvent<number>()
export const $categoryProperties = createStore<CategoryPropertyData[]>([])
export const $inputPrefilledData = createStore<Omit<InputPrefilledData, "name">[]>([])

export const createProductFx = createEffect<CreateProductParams, any, Error>(createProduct)

$productDetails
    .on(getProductDetailsFx.doneData, (_, details) => details)
    .reset(newProductPageDidMountEvent)

$categoryProperties
    .on(getCategoryPropertiesFx.doneData, (_, category) => convertCategoryToFormData(category))

$inputPrefilledData.on(getCategoryPropertiesFx.doneData, (_, category) => convertCategoryToInputData(category))

sample({
    clock: getProductDetailsEvent,
    target: getProductDetailsFx
})

sample({
    clock: getCategoryPropertiesEvent,
    target: getCategoryPropertiesFx
})

function convertCategoryToInputData(category: Category): Omit<InputPrefilledData, "name">[] {
    return category.properties.map(prop => ({
        labelText: prop.name,
        placeholder: `Введите ${prop.name.toLowerCase()}`,
        endDecorator: prop.valueName,
    }))
}

const convertFormDataToProduct = (productData: Omit<CreateProductData, "photos">, productDetails: RequestAdminProduct): RequestAdminProduct => {

    const reqProduct = {
        ...productData,
        discountPercent: productDetails.discountPercent ?? 0,
        price: productData.price,
        taxPercent: productDetails.taxPercent,
        crmGroup: productData.crmGroup,
        filledProperties: productData.filledProperties,
        externalProperties: productData?.externalProperties ?? [],
        inPackage: productData.priceType?.value === 'package'
    }

    delete reqProduct['priceType']
    return reqProduct as RequestAdminProduct

}

function convertCategoryToFormData(category: Category): CategoryPropertyData[] {
    return category.properties.map(prop => ({
            propertyId: prop.id!!,
            valueType: prop.valueType,
            value: ""
        })
    )
}