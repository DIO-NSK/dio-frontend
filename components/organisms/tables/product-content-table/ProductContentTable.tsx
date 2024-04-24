import React from 'react';
import {ProductTableRow, TableWrapperProps} from "@/types/dto/Table";
import TableWrapper from "@/components/wrappers/table-wrapper/TableWrapper";
import {ResponseAdminProductSearch} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/page.hooks";
import SortableItemWrapper, {SortableHandlerProps} from "@/components/wrappers/sortable-wrapper/SortableItemWrapper";
import SortableWrapper from "@/components/wrappers/sortable-wrapper/SortableWrapper";
import {DragEndEvent} from "@dnd-kit/core";
import ProductRow from "@/components/organisms/tables/product-content-table/ProductRow";

type ProductContentTableProps = {
    onDragEnd?: (event: DragEndEvent) => void,
    tableContent: ProductTableRow<ResponseAdminProductSearch>[],
    isDraggable?: boolean,
    onProductClick: (tableRow: ProductTableRow<ResponseAdminProductSearch>) => void,
    onEdit: (tableRow: ProductTableRow<ResponseAdminProductSearch>) => void,
    onDelete: (tableRow: ProductTableRow<ResponseAdminProductSearch>) => void,
} & Omit<TableWrapperProps, "children"> & SortableHandlerProps

const TableContent = (props: ProductContentTableProps) => (
    <React.Fragment>
        {props.tableContent.map((tableRow, rowKey) =>
            props.isDraggable ? (
                <SortableItemWrapper
                    sequenceNumber={tableRow.sequenceNumber!!}
                    key={tableRow.sequenceNumber!!}
                >
                    <ProductRow
                        onClick={props.onProductClick}
                        tableRow={tableRow}
                        {...props}
                    />
                </SortableItemWrapper>
            ) : (
                <ProductRow
                    onClick={props.onProductClick}
                    tableRow={tableRow} key={rowKey}
                    {...props}
                />
            )
        )}
    </React.Fragment>
)

const ProductContentTable = (props: ProductContentTableProps) => (
    props.isDraggable ? (
        <SortableWrapper {...props} items={props.tableContent.map(row => row.sequenceNumber!!)}>
            <TableContent {...props}/>
        </SortableWrapper>
    ) : (
        <TableWrapper {...props}>
            <TableContent {...props}/>
        </TableWrapper>
    )
)

export default ProductContentTable;
