import React, {ReactNode} from 'react';
import {closestCenter, DndContext, DragEndEvent} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import TableWrapper from "@/components/wrappers/table-wrapper/TableWrapper";
import {TableWrapperProps} from "@/types/dto/Table";
import {restrictToVerticalAxis} from "@dnd-kit/modifiers";

type SortableWrapperProps = {
    items: number[],
    onDragEnd?: (event: DragEndEvent) => void,
    children: ReactNode
}

const SortableWrapper = (props: SortableWrapperProps & TableWrapperProps) => (
    <DndContext
        {...props}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
    >
        <SortableContext items={props.items} strategy={verticalListSortingStrategy}>
            <TableWrapper {...props}>
                {props.children}
            </TableWrapper>
        </SortableContext>
    </DndContext>
)

export default SortableWrapper;
