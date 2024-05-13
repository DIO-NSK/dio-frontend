"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import ControlledTextArea from "@/components/atoms/inputs/controlled-text-area/ControlledTextArea";
import AdminPanelSaleRuleBlock from "@/components/organisms/blocks/admin-panel-sale-rule-block/AdminPanelSaleRuleBlock";
import AdminPanelPhotoBlock from "@/components/organisms/blocks/admin-panel-photo-block/AdminPanelPhotoBlock";
import Button from "@/components/atoms/buttons/button/Button";
import React, {useEffect} from "react";
import {DefaultValues, FieldName, FieldValues, Form, FormProvider, useForm, useFormContext} from "react-hook-form";
import {CreateSaleData, CreateSaleSchema} from "@/schemas/admin/CreateSaleSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import {useUnit} from "effector-react";
import {
    $productDetails,
    getProductDetailsEvent,
    GetProductDetailsParams, newProductPageDidMountEvent
} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/new/model";
import {CreateProductData} from "@/schemas/admin/CreateProductSchema";
import dayjs from "dayjs";
import AdminPanelSearchbarBlock
    from "@/components/organisms/blocks/admin-panel-searchbar-block/AdminPanelSearchbarBlock";
import {createSaleEvent} from "@/app/admin/sales/new/model";

const FirstInputRow = () => {

    const getSaleDetails = useUnit(getProductDetailsEvent)
    const methods = useFormContext()
    const {trigger, getValues, formState: {isSubmitting}} = methods

    const onSubmit = async () => {
        const fieldNames: FieldName<CreateProductData>[] = ["crmCode", "crmGroup"]
        const fieldValues = getValues(fieldNames)
        const params: GetProductDetailsParams = {crmCode: fieldValues[0], crmGroup: fieldValues[1]}
        if (await trigger(fieldNames)) getSaleDetails(params)
    }

    const inputGridData = [
        {
            labelText: "Код акции",
            placeholder: "Введите код акции",
            inputMask: "999999",
            name: "crmCode"
        }, {
            labelText: "Группа акции",
            placeholder: "Введите группу акции",
            name: "crmGroup"
        }
    ]

    useEffect(() => {
        methods.reset()
    }, []);

    return (
        <section className={"w-full px-7 grid grid-cols-5 items-end gap-7 pb-7 border-b-2 border-light-gray"}>
            {inputGridData.map((inputData, key) =>
                <ControlledTextInput classNames={{wrapper: "col-span-2"}} {...inputData} key={key}/>
            )}
            <Button
                classNames={{button: "col-span-1 py-5"}}
                text={"Получить акцию"}
                onClick={onSubmit}
            />
        </section>
    )

}

const SecondInputRow = () => {

    const deadline = dayjs(Date.now()).format("DD.MM.YYYY")

    const inputGridData = [
        {
            labelText: "Название акции",
            placeholder: "Придумайте название акции",
            name: "name"
        }, {
            labelText: "Длительность акции",
            placeholder: `до ${deadline}`,
            inputMask: "до 99.99.9999",
            name: "deadline"
        }
    ]

    return (
        <section className={"w-full px-7 grid grid-cols-2 gap-7 pb-7 border-b-2 border-light-gray"}>
            {inputGridData.map((inputData, key) =>
                <ControlledTextInput classNames={{wrapper: "col-span-1"}} {...inputData} key={key}/>
            )}
        </section>
    )

}

const AdminPanelNewSaleSecondBlock = () => {

    const [saleDetails, createSale] = useUnit([$productDetails, createSaleEvent])

    const {
        handleSubmit,
        reset
    } = useFormContext<CreateSaleData>()

    const onSubmit = (fieldValues: FieldValues) => {
        createSale(fieldValues as CreateSaleData)
    }

    useEffect(() => {
        reset()
        reset(saleDetails as DefaultValues<CreateSaleData>)
    }, [saleDetails])

    return (
        <React.Fragment>
            <SecondInputRow/>
            <ControlledTextArea
                name={"description"}
                labelText={"Описание акции"}
                placeholder={"Придумайте привлекающее описание акции. Идеальная длина описания — 1 предложение."}
                classNames={{
                    wrapper: "px-7",
                    input: "min-h-[150px] max-h-[220px]"
                }}
            />
            <AdminPanelSearchbarBlock
                header={"Товары, участвующие в акции"}
                description={"Данные товары включены в акцию по умолчанию"}
            />
            <AdminPanelSaleRuleBlock/>
            <AdminPanelPhotoBlock
                header={"Фотографии"}
                description={"Данные фотографии будут видны пользователю на сайте"}
            />
            <Button
                text={"Сохранить"}
                onClick={handleSubmit(onSubmit)}
                classNames={{button: "mx-7 w-[250px]"}}
            />
        </React.Fragment>
    )

}


const AdminPanelNewSalePage = () => {

    const [saleDetails, pageDidMount] = useUnit([$productDetails, newProductPageDidMountEvent])

    const methods = useForm<CreateSaleData>({
        resolver: zodResolver(CreateSaleSchema)
    })

    useEffect(() => {
        pageDidMount()
    }, []);

    return (
        <FormProvider {...methods}>
            <Form className={"flex flex-col gap-5"}>
                <HeaderRow
                    className={"w-full"}
                    theme={"bordered"}
                    header={"Новая акция"}
                    hasBackIcon
                />
                <FirstInputRow/>
                {saleDetails && <AdminPanelNewSaleSecondBlock/>}
            </Form>
        </FormProvider>
    )

};

export default AdminPanelNewSalePage;
