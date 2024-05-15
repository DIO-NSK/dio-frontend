"use client"

import React, {useEffect, useState} from 'react';
import {useUnit} from "effector-react";
import {DefaultValues, FieldValues, Form, FormProvider, useForm, useFormContext} from "react-hook-form";
import {CreateSaleData, CreateSaleSchema} from "@/schemas/admin/CreateSaleSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import Button from "@/components/atoms/buttons/button/Button";
import dayjs from "dayjs";
import ControlledTextArea from "@/components/atoms/inputs/controlled-text-area/ControlledTextArea";
import AdminPanelSearchbarBlock
    from "@/components/organisms/blocks/admin-panel-searchbar-block/AdminPanelSearchbarBlock";
import AdminPanelSaleRuleBlock from "@/components/organisms/blocks/admin-panel-sale-rule-block/AdminPanelSaleRuleBlock";
import AdminPanelPhotoBlock from "@/components/organisms/blocks/admin-panel-photo-block/AdminPanelPhotoBlock";
import {$promoDetails, editSaleFx, getPromoEvent} from "@/app/admin/sales/[saleId]/edit/model";
import Snackbar from "@/components/organisms/snackbar/Snackbar";
import {CreateSaleRequest} from "@/app/admin/sales/new/model";
import {useRouter} from "next/navigation";

const inputRowCN = 'w-full px-7 grid grid-cols-2 gap-7 pb-7 border-b-2 border-light-gray'

const convertSaleDataToRequest = (req: { data: CreateSaleData, promoId: number }): CreateSaleRequest => {
    const {promoId, data} = req
    return {
        sale: {
            name: data.name,
            crmGroup: data.crmGroup,
            crmCode: data.crmCode,
            description: data.description,
            deadline: '2024-01-01',
            products: data.productIdList as any,
            ruleList: data.ruleList.map(item => item.rule)
        },
        images: data.photos,
        promoId: promoId
    }
}

const SecondInputRow = () => {

    const deadline = dayjs(Date.now()).format("DD.MM.YYYY")

    const firstData = [
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

    const secondData = [
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
        <React.Fragment>
            <section className={inputRowCN}>
                {firstData.map((inputData, key) =>
                    <ControlledTextInput
                        classNames={{wrapper: "col-span-1"}}
                        {...inputData} key={key}
                    />
                )}
            </section>
            <section className={inputRowCN}>
                {secondData.map((inputData, key) =>
                    <ControlledTextInput
                        classNames={{wrapper: "col-span-1"}}
                        {...inputData} key={key}
                    />
                )}
            </section>
        </React.Fragment>
    )

}

const AdminPanelSaleContentBlock = ({id}: { id: number }) => {

    const router = useRouter()

    const [promoDetails, editPromo] = useUnit([$promoDetails, editSaleFx])
    const [editSuccess, setEditSuccess] = useState<string>('')
    const [editFailure, setEditFailure] = useState<string>('')

    const {
        handleSubmit,
        reset, formState: {errors}
    } = useFormContext<CreateSaleData>()

    const onSubmit = (fieldValues: FieldValues) => {
        editPromo(convertSaleDataToRequest({data: fieldValues as CreateSaleData, promoId: id}))
            .then(_ => setEditSuccess('Вы можете вернуться обратно'))
            .catch(message => setEditFailure(message))
    }

    useEffect(() => {
        reset({
            ...promoDetails,
            photos: promoDetails?.images,
            productIdList: promoDetails?.products.map(product => ({
                productId: product.productId,
                quantity: product.quantity
            })),
            ruleList: promoDetails?.ruleList.map(rule => ({rule: rule}))
        } as DefaultValues<CreateSaleData>)
    }, [promoDetails])

    return (
        <React.Fragment>
            <Snackbar
                success={true}
                header={'Акция успешно отредактирована!'}
                message={editSuccess}
                action={() => router.back()}
                open={editSuccess.length !== 0}
                onClose={() => setEditSuccess('')}
            />
            <Snackbar
                success={false}
                header={'Возникли ошибки при редактировании акции'}
                message={editFailure}
                open={editFailure.length !== 0}
                onClose={() => setEditFailure('')}
            />
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

const AdminEditSalePage = ({params}: {
    params: {
        saleId: number
    }
}) => {

    const [promo, getPromo] = useUnit([$promoDetails, getPromoEvent])

    const methods = useForm<CreateSaleData>({
        resolver: zodResolver(CreateSaleSchema),
        mode: 'onSubmit'
    })

    useEffect(() => {
        console.log(methods.formState.errors)
    }, [methods.formState.errors]);

    useEffect(() => {
        getPromo(params.saleId)
    }, []);

    return (
        <FormProvider {...methods}>
            <Form className={"flex flex-col gap-5"}>
                <HeaderRow
                    className={"w-full"}
                    theme={"bordered"}
                    header={"Редактирование акции"}
                    hasBackIcon
                />
                {promo && <AdminPanelSaleContentBlock id={params.saleId}/>}
            </Form>
        </FormProvider>
    )

};

export default AdminEditSalePage;