import React from 'react';
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import HeaderDescriptionButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescriptionButtonRow";
import {useFieldArray, useFormContext} from "react-hook-form";
import DraggableRowWrapper from "@/components/wrappers/draggable-row-wrapper/DraggableRowWrapper";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import {closestCenter, DndContext, DragEndEvent} from "@dnd-kit/core";
import {horizontalListSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import SortableItemWrapper from "@/components/wrappers/sortable-wrapper/SortableItemWrapper";

const characteristicMessage = "Данные характеристики будут отражаться только в карточке товара"

const AdminPanelExternalPropertiesBlock = ({blockName}: {
    blockName: string
}) => {

    const {control, formState: {errors}} = useFormContext()
    const {fields, append, remove, swap} = useFieldArray({
        control, name: blockName
    })

    const handleAppendRow = () => append({
        name: "", value: ""
    })

    const handleDeleteRow = (index: number) => remove(index)

    const handleChangeOrder = (event: DragEndEvent) => {
        const {active, over} = event
        if (active.id !== over?.id) {
            const oldIndex = fields.findIndex((item) => item.id === active.id);
            const newIndex = fields.findIndex((item) => item.id === over?.id);
            swap(oldIndex, newIndex);
        }
    }

    return (
        <div className={"w-full px-7 flex flex-col gap-5 pb-7 border-b-2 border-light-gray"}>
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
                                    className={"w-full flex flex-row gap-5"}
                                    onDelete={() => handleDeleteRow(index)}
                                    key={item.id}
                                >
                                    <ControlledTextInput
                                        classNames={{wrapper: "w-full"}}
                                        placeholder={"Введите название характеристики"}
                                        name={`${blockName}.${index}.name` as const}
                                        //@ts-ignore
                                        errors={errors?.[blockName]?.[index]?.name}
                                    />
                                    <ControlledTextInput
                                        classNames={{wrapper: "w-full"}}
                                        placeholder={"Введите значение характеристки"}
                                        name={`${blockName}.${index}.value` as const}
                                        //@ts-ignore
                                        errors={errors?.[blockName]?.[index]?.value}
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

export default AdminPanelExternalPropertiesBlock;
