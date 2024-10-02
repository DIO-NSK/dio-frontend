"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import ControlledTextArea from "@/components/atoms/inputs/controlled-text-area/ControlledTextArea";
import AdminPanelPhotoBlock from "@/components/organisms/blocks/admin-panel-photo-block/AdminPanelPhotoBlock";
import HeaderDescriptionButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescriptionButtonRow";
import Button from "@/components/atoms/buttons/button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProductData, CreateProductSchema } from "@/schemas/admin/CreateProductSchema";
import { DefaultValues, FieldName, FieldValues, FormProvider, useForm, useFormContext } from "react-hook-form";
import Form from "@/components/atoms/form/Form";
import ControlledSwitch from "@/components/atoms/switch/ControlledSwitch";
import { useUnit } from "effector-react";
import { useRouter } from "next/navigation";
import {
    $categoryProperties,
    $isProductDetailsLoading,
    $productDetails,
    createProductFx,
    getCategoryPropertiesEvent,
    getProductDetailsEvent,
    GetProductDetailsParams,
    newProductPageDidMountEvent
} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/new/model";
import AdminPanelProductInputGrid
    from "@/components/organisms/blocks/admin-panel-product-input-grid/AdminPanelProductInputGrid";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import React, { useEffect, useState } from "react";
import { cn } from "@/utlis/cn";
import AdminPanelFilledPropertiesBlock
    from "@/components/organisms/blocks/admin-panel-filled-properties-block/AdminPanelFilledPropertiesBlock";
import { RequestAdminProduct } from "@/types/dto/admin/product/RequestAdminProduct";
import Snackbar from "@/components/organisms/snackbar/Snackbar";
import AdminPanelExternalPropertiesBlock
    from "@/components/organisms/blocks/admin-panel-filled-properties-block/AdminPanelExternalPropertiesBlock";
import { SeoBlock } from "@/components/organisms/seo-block/SeoBlock";

const productOfTheDayDescription: string =
    `Если чекбокс включён, то данный товар будет отображаться
     в каталоге с уникальным тегом «Товар дня»`

const textAreaDescription: string = "Придумайте привлекающее описание товара. Идеальная длина описания — 3 предложения."

const CreateProductFirstStep = () => {

    const rowCV = [
        "items-end px-7 w-full grid grid-cols-3",
        "gap-7 pb-7 border-b-2 border-light-gray"
    ]

    const [getProductDetails, isSubmitting] = useUnit([getProductDetailsEvent, $isProductDetailsLoading])

    const methods = useFormContext()

    const {
        trigger,
        getValues,
        reset
    } = methods

    const onSubmit = async () => {
        const fieldNames: FieldName<CreateProductData>[] = ["crmCode", "crmGroup"]
        const fieldValues = getValues(fieldNames)
        const params: GetProductDetailsParams = { crmCode: fieldValues[0], crmGroup: fieldValues[1] }
        if (await trigger(fieldNames)) {
            getProductDetails(params)
        }
    }

    useEffect(() => {
        reset()
    }, []);

    return (
        <div className={cn(rowCV)}>
            <ControlledTextInput
                disabled={isSubmitting}
                labelText={"Код товара"}
                placeholder={"Введите код товара"}
                name={"crmCode"}
                numbersOnly
            />
            <ControlledTextInput
                disabled={isSubmitting}
                labelText={"Группа товара"}
                placeholder={"Введите группу товара"}
                name={"crmGroup"}
            />
            <Button
                disabled={isSubmitting}
                text={isSubmitting ? "Отправка" : "Получить товар"}
                classNames={{ button: "h-[65px]" }}
                onClick={onSubmit}
            />
        </div>
    )

}

const CreateProductSecondStep = ({ categoryId }: {
    categoryId: number
}) => {

    const router = useRouter()
    const filledProperties = useUnit($categoryProperties)

    const [createProduct, getCategoryProperties, productDetails] = useUnit([createProductFx, getCategoryPropertiesEvent, $productDetails])
    const [creationSuccess, setCreationSuccess] = useState<boolean>(false)
    const [creationError, setCreationError] = useState<string>('')

    const handleBack = () => {
        router.back()
    }

    const {
        handleSubmit,
        formState: { isSubmitting },
        reset
    } = useFormContext<CreateProductData>()

    const onSubmit = (formData: FieldValues) => createProduct({
        categoryId: categoryId,
        productData: formData as CreateProductData,
        productDetails: productDetails as RequestAdminProduct
    })
        .then(_ => setCreationSuccess(true))
        .catch(error => setCreationError(error))

    useEffect(() => {
        getCategoryProperties(categoryId)
    }, [])

    useEffect(() => {
        reset()
        reset({
            ...productDetails,
            photos: [],
            filledProperties: filledProperties,
            price: productDetails?.price,
            taxPercent: productDetails?.taxPercent
        } as DefaultValues<CreateProductData>)
    }, [filledProperties, productDetails])

    return (
        <React.Fragment>
            <Snackbar
                onClose={() => setCreationSuccess(false)}
                message={"Вы можете вернуться назад"}
                header={"Товар успешно создан!"}
                action={handleBack}
                open={creationSuccess}
                success={true}
            />
            <Snackbar
                onClose={() => setCreationError('')}
                message={creationError}
                header={"Ошибка при создании товара"}
                open={creationError.length !== 0}
                success={false}
            />
            <AdminPanelProductInputGrid />
            <AdminPanelFilledPropertiesBlock />
            <AdminPanelExternalPropertiesBlock blockName={"externalProperties"} />
            <ControlledTextArea
                labelText={"Описание товара"}
                placeholder={textAreaDescription}
                name={"description"}
                classNames={{
                    wrapper: "w-full px-7 pb-7 border-b-2 border-light-gray",
                    input: "min-h-[150px] max-h-[300px]"
                }}
            />
            <AdminPanelPhotoBlock />
            <HeaderDescriptionButtonRow
                className={"px-7 pb-7 border-b-2 border-light-gray"}
                button={<ControlledSwitch name={"isProductOfTheDay"} />}
                descr={productOfTheDayDescription}
                header={"Товар дня"}
            />
            <div className="w-full px-7 pb-7 border-b-2 border-light-gray">
                <SeoBlock hintUrl="/voda-baikal-19-litrov" />
            </div>
            <Button
                text={isSubmitting ? "Отправка.." : "Сохранить"}
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmit)}
                classNames={{ button: "mx-7 w-[250px]" }}
            />
        </React.Fragment>
    )

}

const AdminPanelNewProductPage = ({ params }: {
    params: {
        categoryId: number,
        sectionId: number
    }
}) => {

    const router = useRouter()

    const createProductMethods = useForm<CreateProductData>({
        resolver: zodResolver(CreateProductSchema),
        mode: "onSubmit"
    })

    const { reset } = createProductMethods
    const [productDetails, pageDidMount] = useUnit([$productDetails, newProductPageDidMountEvent])

    const handleBack = () => {
        router.back()
    }

    useEffect(() => {
        pageDidMount()
        reset({ isProductOfTheDay: false })
    }, []);

    return (
        <FormProvider {...createProductMethods}>
            <Form>
                <HeaderRow
                    className={"w-full"}
                    theme={"bordered"}
                    header={"Новый товар"}
                    hasBackIcon
                    onBackClick={handleBack}
                />
                <CreateProductFirstStep />
                {productDetails && <CreateProductSecondStep
                    categoryId={params.categoryId}
                />}
            </Form>
        </FormProvider>
    );

};

export default AdminPanelNewProductPage;
