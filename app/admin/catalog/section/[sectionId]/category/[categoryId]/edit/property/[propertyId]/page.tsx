'use client'

import React, {useEffect, useState} from 'react';
import Form from "@/components/atoms/form/Form";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {FieldValues, FormProvider, useForm, useFormContext} from "react-hook-form";
import Text from "@/components/atoms/text/text-base/Text";
import {FiChevronRight} from "react-icons/fi";
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
    $categoryPropertyState,
    CategoryPropertyProduct,
    editCategoryPropertyStateFx,
    getCategoryPropertyStateEvent
} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/edit/property/[propertyId]/model";
import {useUnit} from "effector-react";
import {zodResolver} from "@hookform/resolvers/zod";
import {CategoryPropertyFormData, CategoryPropertySchema} from "@/schemas/admin/CategoryPropertySchema";
import Snackbar from "@/components/organisms/snackbar/Snackbar";
import Button from "@/components/atoms/buttons/button/Button";

const selectItems: SelectItem<CharacteristicType>[] = [
    {name: "Целочисленное значение", value: "NUMBER"},
    {name: "Дробное значение", value: "FLOAT"},
    {name: "Текстовое значение", value: "TEXT"},
]

const HeaderPropertyRow = ({categoryName, propertyName}: { categoryName: string, propertyName: string }) => (
    <section className={'flex flex-row items-center gap-2'}>
        <Text className={'text-base text-text-gray'} text={categoryName}/>
        <FiChevronRight className={'text-text-gray'} size={'18px'}/>
        <Text className={'text-base text-text-gray'} text={propertyName}/>
    </section>
)

const ProductRow = ({product, name}: { product: CategoryPropertyProduct, name: string }) => {

    const {getValues, watch} = useFormContext()

    const [propertyName, setPropertyName] = useState<string>('')
    const [valueName, setValueName] = useState<string>('')
    const unit = valueName ? `, ${valueName}` : ''

    useEffect(() => {
        setPropertyName(getValues('propertyName'))
    }, [getValues('propertyName')]);

    useEffect(() => {
        setValueName(getValues('propertyValueName'))
    }, [getValues('propertyValueName')]);

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
                name={`${name}.value`} classNames={{wrapper: 'col-span-1'}}
                labelText={`${propertyName}${unit}`}
                placeholder={'Введите значение свойства'}
            />
        </section>
    )

}

const ControlledProductList = () => {

    const property = useUnit($categoryPropertyState)
    const expandedToggle = useToggle(true)

    return (
        <FormBlock
            header={'Товары'}
            leftContent={<Text
                className={'text-text-gray'}
                text={`${property?.productsProperties.length} шт.`}
            />}
            rightContent={<ChevronButton
                isExpanded={expandedToggle.state}
                setExpanded={expandedToggle.toggleState}
            />}
        >
            <section className={'col-span-full flex flex-col gap-7'}>
                {expandedToggle.state && property?.productsProperties.map((product, key, array) => (
                    <section className={key !== array.length - 1 ? 'pb-7 border-b-2 border-light-gray' : ''}>
                        <ProductRow name={`filledProperties.${key}`} product={product} key={key}/>
                    </section>
                ))}
            </section>
        </FormBlock>
    )

}

const EditCategoryPropertyForm = () => (
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

const AdminEditCategoryPropertyPage = ({params}: {
    params: {
        propertyId: string
    }
}) => {

    const router = useRouter()

    const editProperty = useUnit(editCategoryPropertyStateFx)
    const [property, getProperty] = useUnit([$categoryPropertyState, getCategoryPropertyStateEvent])

    const [creationSuccess, setCreationSuccess] = useState<boolean>(false)
    const [creationError, setCreationError] = useState<string>('')

    const methods = useForm<CategoryPropertyFormData>({
        resolver: zodResolver(CategoryPropertySchema),
        mode: 'onBlur'
    })

    const {formState: {isSubmitting, errors}} = methods

    console.log(methods.watch())

    const onSubmit = (fieldValues: FieldValues) => {
        editProperty(fieldValues as CategoryPropertyFormData)
            .then(_ => setCreationSuccess(true))
            .catch(setCreationError)
    }

    useEffect(() => {
        methods.reset({
            propertyId: params.propertyId,
            propertyName: property?.propertyName,
            propertyValueName: property?.propertyValueType,
            propertyType: {
                name: property?.propertyType,
                value: property?.propertyType
            },
            filledProperties: property?.productsProperties.map(product => ({
                productId: product.productId,
                value: product.propertyValue,
                propertyName: property?.propertyName,
                propertyValueName: property?.propertyValueType,
            }))
        })
    }, [property]);

    useEffect(() => {
        getProperty(+params.propertyId)
    }, []);

    if (property) return (
        <FormProvider {...methods}>
            <Snackbar
                onClose={() => setCreationSuccess(false)}
                message={"Вы можете вернуться назад"}
                header={"Свойство изменено!"}
                action={router.back}
                open={creationSuccess}
                success={true}
            />
            <Snackbar
                message={creationError}
                header={"Ошибка при редактировании свойства"}
                onClose={() => setCreationError('')}
                open={creationError.length !== 0}
                success={false}
            />
            <Form>
                <HeaderRow
                    className={"w-full"} theme={"bordered"}
                    header={"Редактирование свойства"}
                    onBackClick={router.back}
                    hasBackIcon
                    leftContent={<HeaderPropertyRow
                        categoryName={property.categoryName}
                        propertyName={property.propertyName}
                    />}
                />
                <EditCategoryPropertyForm/>
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

export default AdminEditCategoryPropertyPage;