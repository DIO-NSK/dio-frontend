import React, {useEffect} from 'react';
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import HeaderDescriptionButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescriptionButtonRow";
import AdminPanelBlockWrapper from "@/components/wrappers/admin-panel-block-wrapper/AdminPanelBlockWrapper";
import {useFieldArray, useFormContext} from "react-hook-form";
import {closestCenter, DndContext, DragEndEvent} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import SortableItemWrapper from "@/components/wrappers/sortable-wrapper/SortableItemWrapper";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import DraggableRowWrapper from "@/components/wrappers/draggable-row-wrapper/DraggableRowWrapper";

const AdminPanelSaleRuleBlock = () => {

    const {control, reset} = useFormContext()
    const {fields, append, remove, swap}
        = useFieldArray({control, name: "ruleList"})

    const handleChangeOrder = (event: DragEndEvent) => {
        const {active, over} = event
        if (active.id !== over?.id) {
            const oldIndex = fields.findIndex((item) => item.id === active.id);
            const newIndex = fields.findIndex((item) => item.id === over?.id);
            swap(oldIndex, newIndex);
        }
    }

    useEffect(() => {
        reset({ruleList: [{rule : ""}]})
    }, []);

    return (
        <AdminPanelBlockWrapper className={"mx-0 px-7"}>
            <HeaderDescriptionButtonRow
                header={"Правила для участия в акции"}
                descr={"Введите каждое правило в отдельном поле для того, чтобы информация" +
                    "корректно отображалась у пользователей."}
                button={
                    <Button
                        onClick={() => append({rule : ""})}
                        classNames={{button: "h-fit"}}
                        icon={<FiPlus size={"18px"}/>}
                        buttonType={"SECONDARY"}
                        text={"Добавить ещё"}
                        size={"sm"}
                    />
                }
            />
            <section className={"w-full flex flex-col gap-5"}>
                <DndContext
                    onDragEnd={handleChangeOrder}
                    collisionDetection={closestCenter}
                >
                    <SortableContext
                        items={fields.map(field => field.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {fields.map((rule, key) =>
                            <SortableItemWrapper sequenceNumber={rule.id} key={rule.id}>
                                <DraggableRowWrapper className={"w-full"} onDelete={() => remove(key)} key={rule.id}>
                                    <ControlledTextInput placeholder={"Введите правило"} name={`ruleList.${key}.rule`}/>
                                </DraggableRowWrapper>
                            </SortableItemWrapper>
                        )}
                    </SortableContext>
                </DndContext>
            </section>

        </AdminPanelBlockWrapper>
    );
};

export default AdminPanelSaleRuleBlock;
