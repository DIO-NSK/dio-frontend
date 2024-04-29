import React from 'react';
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import HeaderDescriptionButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescriptionButtonRow";
import {useFieldArray, useFormContext} from "react-hook-form";
import DraggableRowWrapper from "@/components/wrappers/draggable-row-wrapper/DraggableRowWrapper";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";

const characteristicMessage = "Данные характеристики будут отражаться только в карточке товара"

const AdminPanelExternalPropertiesBlock = ({blockName}: {
    blockName: string
}) => {

    const {control, formState: {errors}} = useFormContext()
    const {fields, append, remove} = useFieldArray({
        control, name: blockName
    })

    const handleAppendRow = () => append({
        name: "", value: ""
    })

    const handleDeleteRow = (index: number) => remove(index)

    return (
        <div className={"w-full mx-[-28px] px-7 flex flex-col gap-5 pb-7 border-b-2 border-light-gray"}>
            <HeaderDescriptionButtonRow
                header={"Дополнительные характеристики"}
                descr={characteristicMessage}
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
                {fields.map((item, index) =>
                    <DraggableRowWrapper
                        className={"w-full flex flex-row gap-5"}
                        onDelete={() => handleDeleteRow(index)}
                        key={item.id}
                    >
                        <ControlledTextInput
                            classNames={{wrapper : "w-full"}}
                            placeholder={"Введите название характеристики"}
                            name={`${blockName}.${index}.name` as const}
                            //@ts-ignore
                            errors={errors?.[blockName]?.[index]?.name}
                        />
                        <ControlledTextInput
                            classNames={{wrapper : "w-full"}}
                            placeholder={"Введите значение характеристки"}
                            name={`${blockName}.${index}.value` as const}
                            //@ts-ignore
                            errors={errors?.[blockName]?.[index]?.value}
                        />
                    </DraggableRowWrapper>
                )}
            </div>
        </div>
    );

};

export default AdminPanelExternalPropertiesBlock;
