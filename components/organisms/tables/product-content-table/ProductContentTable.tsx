import React from 'react';
import {ProductTableRow, TableWrapperProps} from "@/types/dto/Table";
import TableWrapper from "@/components/wrappers/table-wrapper/TableWrapper";
import {ResponseAdminProductSearch} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/page.hooks";
import SortableItemWrapper, {SortableHandlerProps} from "@/components/wrappers/sortable-wrapper/SortableItemWrapper";
import SortableWrapper from "@/components/wrappers/sortable-wrapper/SortableWrapper";
import {DragEndEvent} from "@dnd-kit/core";
import ProductRow from "@/components/organisms/tables/product-content-table/ProductRow";
import {ResponseShortSale} from "@/app/admin/sales/model";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";

export type ProductEntity = ResponseAdminProductSearch | ResponseShortSale | ResponseProductSearch

type ProductContentTableProps = {
    onDragEnd?: (event: DragEndEvent) => void,
    tableContent: ProductTableRow<ProductEntity>[],
    isDraggable?: boolean,
    onProductClick: (tableRow: ProductTableRow<ProductEntity>) => void,
    onEdit ?: (tableRow: ProductTableRow<ProductEntity>) => void,
    onDelete: (tableRow: ProductTableRow<ProductEntity>) => void,
    overrideTooltip ?: React.ReactNode,
} & Omit<TableWrapperProps, "children"> & SortableHandlerProps

const TableContent = (props: ProductContentTableProps) => (
    <React.Fragment>
        {props.tableContent.map((tableRow, rowKey) =>
            props.isDraggable ? (
                <SortableItemWrapper
                    sequenceNumber={tableRow.id}
                    key={tableRow.id}
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
                    tableRow={tableRow}
                    key={rowKey}
                    {...props}
                />
            )
        )}
    </React.Fragment>
)

const ProductContentTable = (props: ProductContentTableProps) => (
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

export default ProductContentTable;
