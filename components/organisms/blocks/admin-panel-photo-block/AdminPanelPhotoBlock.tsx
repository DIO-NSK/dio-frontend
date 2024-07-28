import React from 'react';
import HeaderDescriptionButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescriptionButtonRow";
import AdminPhotoCard from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard";
import FileURLInput from "@/components/atoms/inputs/file-input/FileURLInput";
import {useFieldArray, useFormContext} from "react-hook-form";
import {closestCenter, DndContext, DragEndEvent} from "@dnd-kit/core";
import {horizontalListSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import SortableItemWrapper from "@/components/wrappers/sortable-wrapper/SortableItemWrapper";

type AdminPanelPhotoBlockProps = {
    header?: string,
    description?: string,
    editMode?: boolean,
    blockName?: string
}

const AdminPanelPhotoBlock = ({blockName = "photos", ...props}: AdminPanelPhotoBlockProps) => {

    const {control} = useFormContext()
    const {fields, append, remove, swap,} = useFieldArray({
        control, name: blockName
    })

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
                header={props.header ?? "Фотографии товара"}
                descr={props.description ?? `Первая фотография в списке будет являться обложкой для карточки товара.
                        Порядок расположения фотографий будет влиять на отображение фотографий в карточке продукта.`}
            />
            <div className={"w-full grid grid-cols-3 gap-7"}>
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
                                <AdminPhotoCard
                                    canDelete draggable={true}
                                    onDelete={() => remove(index)}
                                    name={`${blockName}.${index}`}
                                    key={item.id} {...props}
                                />
                            </SortableItemWrapper>
                        )}
                    </SortableContext>
                </DndContext>
                <FileURLInput
                    onChange={append}
                    placeholder={"Выберите файл"}
                    className={"col-span-1"}
                />
            </div>
        </div>
    );
};

export default AdminPanelPhotoBlock;
