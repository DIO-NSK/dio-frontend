export type VariableBlock<T> = {
    onAddItem: () => void,
    onChangeItem: (index: number, value: T) => void,
    onDeleteItem: (index: number) => void,
    items: T[]
}