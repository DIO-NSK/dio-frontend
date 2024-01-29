import {useState} from "react";
import {Characteristic} from "@/types/dto/Characteristic";
import {defaultCharBlockState, defaultCharRowState} from "@/data/characteristicState";

export const useCharacteristics = () => {

    const [
        state,
        setState
    ] = useState<Characteristic[]>(defaultCharBlockState)

    const handleAddChar = () => setState(oldChars => [...oldChars, defaultCharRowState])
    const handleDeleteChar = (deleteIndex : number) => {
        const filteredChars = state.filter((_, index) => index !== deleteIndex)
        setState(filteredChars)
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