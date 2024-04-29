"use client"

import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import {useUnit} from "effector-react";
import {
    $categoryProperties,
    $inputPrefilledData,
    editProductFx,
    getCategoryPropertiesEvent
} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/new/model";
import {DefaultValues, FieldValues, FormProvider, useForm} from "react-hook-form";
import {CategoryPropertyData, CreateProductData, CreateProductSchema} from "@/schemas/admin/CreateProductSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Form from "@/components/atoms/form/Form";
import ControlledTextArea from "@/components/atoms/inputs/controlled-text-area/ControlledTextArea";
import AdminPanelPhotoBlock from "@/components/organisms/blocks/admin-panel-photo-block/AdminPanelPhotoBlock";
import HeaderDescriptionButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescriptionButtonRow";
import ControlledSwitch from "@/components/atoms/switch/ControlledSwitch";
import Button from "@/components/atoms/buttons/button/Button";
import AdminPanelProductInputGrid
    from "@/components/organisms/blocks/admin-panel-product-input-grid/AdminPanelProductInputGrid";
import {
    $productToEdit,
    getProductToEditEvent
} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/product/[productId]/edit/model";
import AdminPanelFilledPropertiesBlock
    from "@/components/organisms/blocks/admin-panel-filled-properties-block/AdminPanelFilledPropertiesBlock";
import {cn} from "@/utlis/cn";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import Text from "@/components/atoms/text/text-base/Text";
import AdminPanelExternalPropertiesBlock
    from "@/components/organisms/blocks/admin-panel-filled-properties-block/AdminPanelExternalPropertiesBlock";
import Snackbar from "@/components/organisms/snackbar/Snackbar";

const editMessage: string =
    `На данный момент нельзя отредактировать группу и код товара.
     У каждого товара уникальный код и группа.`

const productOfTheDayDescription: string =
    `Если чекбокс включён, то данный товар будет отображаться
     в каталоге с уникальным тегом «Товар дня»`

const textAreaDescription: string = "Придумайте привлекающее описание товара. Идеальная длина описания — 3 предложения."

const AdminPanelEditProductPage = ({params}: {
    params: {
        categoryId: number,
        productId: number
    }
}) => {

    const router = useRouter()

    const categoryData = useUnit($inputPrefilledData)

    const [getCategoryProperties, properties] = useUnit([getCategoryPropertiesEvent, $categoryProperties])
    const [getProduct, editProduct, product] = useUnit([getProductToEditEvent, editProductFx, $productToEdit])

    const [creationStatus, setCreationStatus] = useState<boolean | undefined>(undefined)

    const editProductMethods = useForm<CreateProductData>({
        resolver: zodResolver(CreateProductSchema),
        mode: "onSubmit"
    })

    const {
        handleSubmit,
        formState: {isSubmitting, errors},
        reset, watch
    } = editProductMethods

    const rowCV = [
        "mx-[-28px] items-end px-7 w-full grid grid-cols-3",
        "gap-7 pb-7 border-b-2 border-light-gray"
    ]

    const onSubmit = (formData: FieldValues) => editProduct({
        productId: params.productId,
        productData: {
            ...formData,
            isInvisible: false,
            filledProperties: formData.filledProperties.map((prop: CategoryPropertyData) =>
                ({value: prop.value, propertyId: prop.propertyId})
            )
        } as CreateProductData
    })

    useEffect(() => {
        if (product) {
            const productProperties = categoryData.map((inputData, index) => {
                const filledValue = product.properties?.find(p => p.name === inputData.labelText)
                return filledValue && ({value: filledValue?.value, valueType: properties[index].valueType, propertyId: properties[index].propertyId})
            })
            reset({
                ...product,
                photos: product.images,
                filledProperties: productProperties,
                externalProperties: product.extraProperties
            } as DefaultValues<CreateProductData>)
        }
    }, [product])

    console.log(watch())

    useEffect(() => {
        console.log(errors)
    }, [errors]);


    useEffect(() => {
        getCategoryProperties(params.categoryId)
        getProduct(params.productId)
    }, [])

    return (
        <React.Fragment>
            <Snackbar
                success={creationStatus === true}
                header={creationStatus ? "Товар успешно отредактирован!" : "Возникли ошибки при редактировании товара"}
                message={creationStatus ? "Вы можете вернуться назад" : "Заполните все поля и попробуйте снова"}
                action={() => router.back()}
                open={creationStatus !== undefined}
                onClose={() => setCreationStatus(undefined)}
            />
            <FormProvider {...editProductMethods}>
                <Form>
                    <HeaderRow
                        className={"w-full"}
                        theme={"bordered"}
                        header={"Редактирование товара"}
                        hasBackIcon
                    />
                    <div className={cn(rowCV)}>
                        <ControlledTextInput
                            disabled
                            labelText={"Код товара"}
                            placeholder={"Введите код товара"}
                            name={"crmCode"}
                            numbersOnly
                        />
                        <ControlledTextInput
                            disabled
                            labelText={"Группа товара"}
                            placeholder={"Введите группу товара"}
                            name={"crmGroup"}
                        />
                        <Text
                            className={"text-text-gray"}
                            text={editMessage}
                        />
                    </div>
                    <AdminPanelProductInputGrid/>
                    <AdminPanelFilledPropertiesBlock/>
                    <AdminPanelExternalPropertiesBlock blockName={"externalProperties"}/>
                    <ControlledTextArea
                        labelText={"Описание товара"}
                        placeholder={textAreaDescription}
                        name={"description"}
                        classNames={{
                            wrapper: "w-full mx-[-28px] px-7 pb-7 border-b-2 border-light-gray",
                            input: "min-h-[150px] max-h-[300px]"
                        }}
                    />
                    <AdminPanelPhotoBlock/>
                    <HeaderDescriptionButtonRow
                        className={"mx-[-28px] px-7 pb-7 border-b-2 border-light-gray"}
                        button={<ControlledSwitch name={"isProductOfTheDay"}/>}
                        descr={productOfTheDayDescription}
                        header={"Товар дня"}
                    />
                    <div className={"flex flex-row gap-5 items-center"}>
                        <Button
                            text={isSubmitting ? "Отправка.." : "Сохранить"}
                            disabled={isSubmitting}
                            onClick={handleSubmit(onSubmit)}
                            classNames={{button: "w-[250px]"}}
                        />
                    </div>
                </Form>
            </FormProvider>
        </React.Fragment>
    );

};


export default AdminPanelEditProductPage;
