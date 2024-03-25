import {TableRow} from "@/types/dto/Table";

export function convertTableRowsToSelectedItems<T, >(tableRows: TableRow<T>[]): number[] {
    return tableRows.map(tableRow => tableRow.id)
}