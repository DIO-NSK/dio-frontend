import React from 'react';
import TableWrapper from "@/components/wrappers/table-wrapper/TableWrapper";
import {TableRow, TableWrapperProps, TextTableRow} from "@/types/dto/Table";
import TextContentTableRow from "@/components/organisms/tables/text-content-table/TextContentTableRow";

type TextContentTableProps = {
    tableContent: TextTableRow[],
    isDraggable?: boolean,
    onRowClick?: (rowIndex: number) => void,
    onEdit?: (tableRow: TableRow<string[]>) => void,
    onDelete?: (tableRow: TableRow<string[]>) => void
} & Omit<TableWrapperProps, "children">

const TextContentTable = (props: TextContentTableProps) => {

    return (
        <TableWrapper {...props}>
            {props.tableContent.map((tableRow, rowKey) =>
                <TextContentTableRow 
                    tableRow={tableRow} 
                    key={rowKey} 
                    {...props}
                />
            )}
        </TableWrapper>
    );

};

export default TextContentTable;
