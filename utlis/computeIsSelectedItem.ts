import {TableRow} from "@/types/dto/Table";

export const computeIsSelectedItem = <T,>(items : TableRow<T>[], elem: TableRow<T>) => {
    return !!items.find((another) => another.id === elem.id)
}