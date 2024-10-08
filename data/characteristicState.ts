import {Characteristic} from "@/types/dto/Characteristic";

const defaultCharRowState: Characteristic = {
    name: "",
    type: {
        name: "Целое число",
        value: "NUMBER"
    }
}

const defaultCharBlockState = [defaultCharRowState, defaultCharRowState]

export {
    defaultCharRowState,
    defaultCharBlockState
}