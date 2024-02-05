import {useState} from "react";

const MIN_LENGTH = 1

export const useVariableItemRow = <T, >(defaultItem : T) => {

    const [state, setState] = useState<T[]>([defaultItem])

    const handleAddItem = () => setState(oldState => [...oldState, defaultItem])
    const handleDeleteItem = (indexToDelete: number) => {
        if (state.length !== MIN_LENGTH) {
            const filteredChars = state.filter((_, index) => index !== indexToDelete)
            setState(filteredChars)
        }
    }
    const handleChangeItem = (indexToChange: number, newItem: T) => {
        setState(oldState => oldState.map((item, index) => {
            return indexToChange == index ? newItem : item
        }))
    }

    return {
        state, handlers: {
            handleAddItem,
            handleDeleteItem,
            handleChangeItem
        }
    }

}