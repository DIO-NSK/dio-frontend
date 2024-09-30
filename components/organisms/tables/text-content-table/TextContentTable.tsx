import React from 'react';
import TableWrapper from "@/components/wrappers/table-wrapper/TableWrapper";
import {TableRow, TableWrapperProps, TextTableRow} from "@/types/dto/Table";
import TextContentTableRow from "@/components/organisms/tables/text-content-table/TextContentTableRow";
import SortableWrapper from "@/components/wrappers/sortable-wrapper/SortableWrapper";
import {DragEndEvent} from "@dnd-kit/core";
import SortableItemWrapper from "@/components/wrappers/sortable-wrapper/SortableItemWrapper";

type TextContentTableProps = {
    tableContent: TextTableRow[],
    isDraggable?: boolean,
    onDragEnd?: (event: DragEndEvent) => void,
    onRowClick?: (rowIndex: number) => void,
    onEdit?: (tableRow: TableRow<string[]>) => void,
    onDelete?: (tableRow: TableRow<string[]>) => void,
    hasTooltip ?: boolean,
} & Omit<TableWrapperProps, "children">

export const TableContent = (props: TextContentTableProps) => (
    <React.Fragment>
        {props.tableContent.map((tableRow, rowKey) =>
            props.isDraggable ? (
                <SortableItemWrapper sequenceNumber={tableRow.id} key={tableRow.id}>
                    <TextContentTableRow tableRow={tableRow} {...props}/>
                </SortableItemWrapper>
            ) : (<TextContentTableRow tableRow={tableRow} key={rowKey} {...props}/>)
        )}
    </React.Fragment>
)

const TextContentTable = (props: TextContentTableProps) => (
    props.isDraggable ? (
        <SortableWrapper {...props} items={props.tableContent.map(row => row.id)}>
            <TableContent {...props}/>
        </SortableWrapper>
    ) : (
        <TableWrapper {...props}>
            <TableContent {...props}/>
        </TableWrapper>
    )
)

export default TextContentTable;
