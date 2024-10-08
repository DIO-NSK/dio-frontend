import React from 'react';
import Button from "@/components/atoms/buttons/button/Button";
import {FiEdit, FiPlus} from "react-icons/fi";
import {CharacteristicType} from "@/types/dto/Characteristic";
import HeaderDescriptionButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescriptionButtonRow";
import {useFieldArray, useFormContext} from "react-hook-form";
import DraggableRowWrapper from "@/components/wrappers/draggable-row-wrapper/DraggableRowWrapper";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import ControlledSelectInput
    from "@/components/atoms/inputs/select-input/controlled-select-input/ControlledSelectInput";
import {SelectItem} from "@/types/props/SelectItem";
import {defaultCharacteristicData} from "@/schemas/dto/CharacteristicSchema";
import {closestCenter, DndContext, DragEndEvent} from "@dnd-kit/core";
import {horizontalListSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import SortableItemWrapper from "@/components/wrappers/sortable-wrapper/SortableItemWrapper";
import SquareIcon from "@/components/atoms/icons/square-icon/SquareIcon";
import {usePathname, useRouter} from "next/navigation";
import {useUnit} from "effector-react";
import {$formData} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/edit/model";

const selectItems: SelectItem<CharacteristicType>[] = [
    {name: "Целочисленное значение", value: "NUMBER"},
    {name: "Дробное значение", value: "FLOAT"},
    {name: "Текстовое значение", value: "TEXT"},
]

const characteristicMessage = "С помощью данных характеристик пользователь сможет отфильтровать каталог и найти нужные товары."

const AdminPanelCharBlock = ({blockName, disabled = false}: {
    blockName: string,
    disabled?: boolean
}) => {

    const router = useRouter()
    const pathname = usePathname()

    const formData = useUnit($formData)

    const {control, formState: {errors}} = useFormContext()
    const {fields, append, remove, swap} = useFieldArray({
        control, name: blockName
    })

    const handleAppendRow = () => {
        if (disabled) {
            router.push(pathname.concat('/property/new'))
        } else {
            append({
                ...defaultCharacteristicData,
                sequenceNumber: fields.length + 1
            })
        }
    }

    const handleDeleteRow = (index: number) => remove(index)
    const handleEditProperty = (index: number) => {
        router.push(pathname.concat(`/property/${formData?.properties[index].id}`))
    }

    const handleChangeOrder = (event: DragEndEvent) => {
        const {active, over} = event
        if (active.id !== over?.id) {
            const oldIndex = fields.findIndex((item) => item.id === active.id);
            const newIndex = fields.findIndex((item) => item.id === over?.id);
            swap(oldIndex, newIndex);
        }
    }

    return (
        <div className={"w-full px-7 pb-7 flex flex-col gap-5 border-b-2 border-light-gray"}>
            <HeaderDescriptionButtonRow
                header={"Характеристики"}
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
                <DndContext
                    onDragEnd={handleChangeOrder}
                    collisionDetection={closestCenter}
                >
                    <SortableContext
                        items={fields.map(field => field.id)}
                        strategy={horizontalListSortingStrategy}
                    >
                        {fields.map((item, index) =>
                            <SortableItemWrapper sequenceNumber={item.id} key={item.id}>
                                <DraggableRowWrapper
                                    className={"w-full grid grid-cols-7 gap-5"}
                                    onEdit={() => handleEditProperty(index)}
                                    onDelete={() => handleDeleteRow(index)}
                                    key={item.id}
                                >
                                    <ControlledTextInput
                                        readonly={disabled}
                                        classNames={{wrapper: "col-span-3"}}
                                        placeholder={"Введите название характеристики"}
                                        name={`${blockName}.${index}.name` as const}
                                        //@ts-ignore
                                        errors={errors?.[blockName]?.[index]?.name}
                                    />
                                    <ControlledTextInput
                                        readonly={disabled}
                                        classNames={{wrapper: "col-span-2"}}
                                        placeholder={"Единица характеристики"}
                                        name={`${blockName}.${index}.valueName` as const}
                                        //@ts-ignore
                                        errors={errors?.[blockName]?.[index]?.valueName}
                                    />
                                    <ControlledSelectInput
                                        width={"col-span-2"}
                                        placeholder={"Целочисленное значение"}
                                        name={`${blockName}.${index}.valueType` as const}
                                        items={selectItems} readonly={disabled}
                                    />
                                </DraggableRowWrapper>
                            </SortableItemWrapper>
                        )}
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );

};

export default AdminPanelCharBlock;
