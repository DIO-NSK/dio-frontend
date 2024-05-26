'use client'

import React, {useEffect, useState} from 'react';
import Form from "@/components/atoms/form/Form";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {FieldValues, FormProvider, useForm, useFormContext} from "react-hook-form";
import Text from "@/components/atoms/text/text-base/Text";
import {useRouter} from "next/navigation";
import FormBlock from "@/components/wrappers/form-block/FormBlock";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import ControlledSelectInput
    from "@/components/atoms/inputs/select-input/controlled-select-input/ControlledSelectInput";
import {SelectItem} from "@/types/props/SelectItem";
import {CharacteristicType} from "@/types/dto/Characteristic";
import {useToggle} from "@/utlis/hooks/useToggle";
import ChevronButton from "@/components/atoms/buttons/chevron-button/ChevronButton";
import {
    $categoryPropertyProducts,
    CategoryPropertyProduct,
    createCategoryPropertyStateFx,
    getCategoryPropertyProductsEvent
} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/edit/property/[propertyId]/model";
import {useUnit} from "effector-react";
import {zodResolver} from "@hookform/resolvers/zod";
import {EditCategoryPropertyFormData, EditCategoryPropertySchema} from "@/schemas/admin/CategoryPropertySchema";
import Snackbar from "@/components/organisms/snackbar/Snackbar";
import Button from "@/components/atoms/buttons/button/Button";

const selectItems: SelectItem<CharacteristicType>[] = [
    {name: "Целочисленное значение", value: "NUMBER"},
    {name: "Дробное значение", value: "FLOAT"},
    {name: "Текстовое значение", value: "TEXT"},
]

const ProductRow = ({product, name, index}: { product: CategoryPropertyProduct, name: string, index : number}) => {

    const {formState : {errors}} = useFormContext()

    return (
        <section className={'w-full grid grid-cols-2 gap-7 items-start'}>
            <div className={'col-span-1 flex flex-row gap-4 items-center'}>
                <img
                    className={'rounded-xl object-scale-down aspect-square w-[100px]'}
                    src={product.image} alt={'Изображение продукта'}
                />
                <div className={'w-full flex flex-col gap-1'}>
                    <div className={'w-full flex flex-row items-baseline gap-2'}>
                        <Text text={`Код ${product.crmCode}`} className={'text-text-gray'}/>
                        <Text text={`Группа ${product.crmGroup}`} className={'text-text-gray'}/>
                    </div>
                    <Text text={product.name}/>
                </div>
            </div>
            <ControlledTextInput
                //@ts-ignore
                errors={errors?.filledProperties?.[index]?.value}
                name={`${name}.value`} classNames={{wrapper: 'col-span-1'}}
                placeholder={'Введите значение свойства'}
            />
        </section>
    )

}

const ControlledProductList = () => {

    const propertyProducts = useUnit($categoryPropertyProducts)
    const expandedToggle = useToggle(true)

    return (
        <FormBlock
            header={'Товары'}
            leftContent={<Text
                className={'text-text-gray'}
                text={`${propertyProducts?.length} шт.`}
            />}
            rightContent={<ChevronButton
                isExpanded={expandedToggle.state}
                setExpanded={expandedToggle.toggleState}
            />}
        >
            <section className={'col-span-full flex flex-col gap-7'}>
                {expandedToggle.state && propertyProducts?.map((product, key, array) => (
                    <section className={key !== array.length - 1 ? 'pb-7 border-b-2 border-light-gray' : ''}>
                        <ProductRow name={`filledProperties.${key}`} product={product} index={key} key={key}/>
                    </section>
                ))}
            </section>
        </FormBlock>
    )

}

const NewCategoryPropertyForm = () => (
    <React.Fragment>
        <FormBlock header={'Характеристики свойства'}>
            <ControlledTextInput
                name={'propertyName'}
                placeholder={'Введите название характеристики'}
            />
            <ControlledTextInput
                name={'propertyValueName'}
                placeholder={'Введите единицу характеристики'}
            />
            <ControlledSelectInput
                name={'propertyType'}
                placeholder={'Выберите тип характеристики'}
                items={selectItems}
            />
        </FormBlock>
        <ControlledProductList/>
    </React.Fragment>
)

const AdminNewCategoryPropertyPage = ({params} : {
    params : {
        categoryId : number
    }
}) => {

    const router = useRouter()

    const propertyProducts = useUnit($categoryPropertyProducts)
    const [createProperty, getPropertyProducts] = useUnit([createCategoryPropertyStateFx, getCategoryPropertyProductsEvent])

    const [creationSuccess, setCreationSuccess] = useState<boolean>(false)
    const [creationError, setCreationError] = useState<string>('')

    const methods = useForm<EditCategoryPropertyFormData>({
        resolver: zodResolver(EditCategoryPropertySchema),
        mode: 'onBlur'
    })

    const {formState: {isSubmitting, errors}} = methods

    console.log(methods.watch())

    const onSubmit = (fieldValues: FieldValues) => {
        createProperty(fieldValues as EditCategoryPropertyFormData)
            .then(_ => setCreationSuccess(true))
            .catch(setCreationError)
    }

    useEffect(() => {
        methods.reset({
            categoryId : String(params.categoryId),
            filledProperties: propertyProducts.map(product => ({
                productId: product.productId,
                value: product.propertyValue
            }))
        })
    }, [propertyProducts]);

    useEffect(() => {
        getPropertyProducts(params.categoryId)
    }, []);

    if (propertyProducts) return (
        <FormProvider {...methods}>
            <Snackbar
                onClose={() => setCreationSuccess(false)}
                message={"Вы можете вернуться назад"}
                header={"Новое свойство создано!"}
                action={router.back}
                open={creationSuccess}
                success={true}
            />
            <Snackbar
                message={creationError}
                header={"Ошибка при создании свойства"}
                onClose={() => setCreationError('')}
                open={creationError.length !== 0}
                success={false}
            />
            <Form>
                <HeaderRow
                    className={"w-full"} theme={"bordered"}
                    header={"Новое свойство"}
                    onBackClick={router.back}
                    hasBackIcon
                />
                <NewCategoryPropertyForm/>
                <Button
                    classNames={{button: "mx-7 w-[250px]"}}
                    text={isSubmitting ? "Отправка.." : "Редактировать"}
                    onClick={methods.handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                />
            </Form>
        </FormProvider>
    );

};

export default AdminNewCategoryPropertyPage;