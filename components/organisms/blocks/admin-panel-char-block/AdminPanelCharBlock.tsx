import React from 'react';
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import {CharacteristicType} from "@/types/dto/Characteristic";
import HeaderDescrButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescrButtonRow";
import {useFieldArray, useFormContext} from "react-hook-form";
import {CreateCategoryData, defaultCharacteristicData} from "@/schemas/admin/CreateCategorySchema";
import DraggableRowWrapper from "@/components/wrappers/draggable-row-wrapper/DraggableRowWrapper";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import ControlledSelectInput
    from "@/components/atoms/inputs/select-input/controlled-select-input/ControlledSelectInput";
import {SelectItem} from "@/types/props/SelectItem";

const selectItems: SelectItem<CharacteristicType>[] = [
    {name: "Целочисленное значение", value: "INTEGER"},
    {name: "Дробное значение", value: "FLOAT"},
    {name: "Текстовое значение", value: "TEXT"},
]

const AdminPanelCharBlock = () => {

    const {control, formState: {errors}} = useFormContext<CreateCategoryData>()
    const {fields, append, remove} = useFieldArray({
        control, name: "properties"
    })

    const handleAppendRow = () => append({
        ...defaultCharacteristicData,
        sequenceNumber: fields.length
    })

    const handleDeleteRow = (index: number) => remove(index)

    return (
        <div className={"w-full mx-[-28px] px-7 flex flex-col gap-5 pb-7 border-b-2 border-light-gray"}>

            <HeaderDescrButtonRow
                header={"Дополнительные характеристики"}
                descr={"Данные характеристики будут видны только в карточке товара" +
                    " и не будут учитываться при поиске продукта"}
                button={
                    <Button
                        classNames={{button: "h-fit"}}
                        icon={<FiPlus size={"18px"}/>}
                        buttonType={"SECONDARY"}
                        text={"Добавить ещё"}
                        onClick={handleAppendRow}
                        size={"sm"}
                    />
                }
            />

            <div className={"w-full flex flex-col gap-5"}>
                {
                    fields.map((item, index) =>
                        <DraggableRowWrapper
                            className={"w-full grid grid-cols-7 gap-5"}
                            onDelete={() => handleDeleteRow(index)}
                            key={item.id}
                        >
                            <ControlledTextInput
                                classNames={{wrapper: "col-span-3"}}
                                placeholder={"Введите название характеристики"}
                                name={`properties.${index}.name` as const}
                                errors={errors?.properties?.[index]?.name}
                            />
                            <ControlledTextInput
                                classNames={{wrapper: "col-span-2"}}
                                placeholder={"Единица характеристики"}
                                name={`properties.${index}.valueName` as const}
                                errors={errors?.properties?.[index]?.valueName}
                            />
                            <ControlledSelectInput
                                width={"col-span-2"}
                                placeholder={"Целочисленное значение"}
                                name={`properties.${index}.valueType` as const}
                                items={selectItems}
                            />
                        </DraggableRowWrapper>
                    )
                }
            </div>

        </div>
    );

};

export default AdminPanelCharBlock;
