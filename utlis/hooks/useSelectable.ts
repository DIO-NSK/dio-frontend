import {useState} from "react";

export const useSelectable = <T, >(items: T[], callback ?: (item : T) => boolean) => {

    const [
        selectedItems,
        setSelectedItems
    ] = useState<T[]>([])

    const handleSelectItem = (selectedItem: T) => {
        const itemToDelete = selectedItems.find((item) => item === selectedItem)
        if (itemToDelete) setSelectedItems(state => state.filter((item) => item !== selectedItem))
        else setSelectedItems(state => [...state, selectedItem])
    }
    const handleSelectAllItems = () => {
        if (callback === undefined) setSelectedItems(items)
        else setSelectedItems(items.filter(callback))
    }
    const handleRemoveSelectAll = () => setSelectedItems([])

    return {
        selectedItems, handleSelectItem,
        handleSelectAllItems, handleRemoveSelectAll
    }

}