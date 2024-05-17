import React, {useEffect} from 'react';
import HeaderBlock from "@/components/wrappers/header-block/HeaderBlock";
import {FieldError, useFieldArray, useFormContext} from "react-hook-form";
import {CreateProductData} from "@/schemas/admin/CreateProductSchema";
import {useUnit} from "effector-react";
import {
    $categoryProperties,
    $inputPrefilledData
} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/new/model";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import Text from "@/components/atoms/text/text-base/Text";
import {
    $productToEdit
} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/product/[productId]/edit/model";

const AdminPanelFilledPropertiesBlock = () => {

    const {formState: {errors}, control, getValues, reset, watch} = useFormContext<CreateProductData>()
    const {fields} = useFieldArray({control, name: "filledProperties"})

    const [properties, categoryInputGrid] = useUnit([$categoryProperties, $inputPrefilledData])

    useEffect(() => {
        reset({filledProperties: properties})
    }, []);

    console.log(watch())

    const inputRowCN: string = "w-full grid grid-cols-3 gap-7"

    return (
        <HeaderBlock header={"Обязательные характеристики"} className={"sm:px-7 pb-7 border-b-2 border-light-gray"}>
            <section className={inputRowCN}>
                {fields.map((field, index) => (
                    <div className={"col-span-1 flex flex-col gap-3"}>
                        <ControlledTextInput
                            {...categoryInputGrid[index]}
                            classNames={{wrapper: "col-span-1"}}
                            name={`filledProperties.${index}.value`}
                            errors={errors.filledProperties?.[index]?.value}
                            key={field.id}
                        />
                        <Text
                            text={getValues(`filledProperties.${index}.valueType`)}
                            className={"text-text-gray text-sm"}
                        />
                    </div>
                ))}
            </section>
        </HeaderBlock>
    );

};

export default AdminPanelFilledPropertiesBlock;
