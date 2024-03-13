import React, {useEffect} from 'react';
import HeaderBlock from "@/components/wrappers/header-block/HeaderBlock";
import {useFieldArray, useFormContext} from "react-hook-form";
import {CreateProductData} from "@/schemas/admin/CreateProductSchema";
import {useUnit} from "effector-react";
import {
    $categoryProperties,
    $inputPrefilledData
} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/new/model";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";

const AdminPanelFilledPropertiesBlock = () => {

    const {control, reset} = useFormContext<CreateProductData>()
    const {fields} = useFieldArray({control, name: "filledProperties"})

    const [properties, categoryInputGrid] = useUnit([$categoryProperties, $inputPrefilledData])

    useEffect(() => {
        reset({filledProperties: properties})
    }, [properties]);

    const inputRowCN: string = "mx-[-28px] px-7 w-full grid grid-cols-3 gap-7 pb-7 border-b-2 border-light-gray"

    return (
        <HeaderBlock header={"Дополнительные характеристики"}>
            <section className={inputRowCN}>
                {
                    fields.map((field, index) => (
                        <ControlledTextInput
                            classNames={{wrapper: "col-span-1"}}
                            name={`filledProperties.${index}.value`}
                            key={field.id} {...categoryInputGrid[index]}
                        />
                    ))
                }
            </section>
        </HeaderBlock>
    );

};

export default AdminPanelFilledPropertiesBlock;
