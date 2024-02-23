import {FieldValues} from "react-hook-form";
import {SelectItem} from "@/types/props/SelectItem";

export type InputPrefilledData<T extends FieldValues> = {
    placeholder: string,
    labelText: string,
    inputMask?: string,
    selectItems ?: SelectItem<string>[],
    name?: keyof T,
}