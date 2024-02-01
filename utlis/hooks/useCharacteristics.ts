import {useState} from "react";
import {Characteristic} from "@/types/dto/Characteristic";
import {defaultCharBlockState, defaultCharRowState} from "@/data/characteristicState";

const MIN_LENGTH = 1

export const useCharacteristics = () => {

    const [
        state,
        setState
    ] = useState<Characteristic[]>(defaultCharBlockState)

    const handleAddChar = () => setState(oldChars => [...oldChars, defaultCharRowState])
    const handleDeleteChar = (deleteIndex : number) => {
        if (state.length !== MIN_LENGTH) {
            const filteredChars = state.filter((_, index) => index !== deleteIndex)
            setState(filteredChars)
        }
    }
    const handleChangeChar = (changedChar: Characteristic, changedIndex: number) => {
        setState(oldChars => oldChars.map((char, index) => {
            return changedIndex == index ? changedChar : char
        }))
    }

    return {
        handlers : {handleAddChar, handleDeleteChar, handleChangeChar},
        state, setState,
    }

}