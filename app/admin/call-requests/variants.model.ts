import {SelectItem} from "@/types/props/SelectItem";
import {createEvent, createStore} from "effector";

export type VariantType = "phone_number" | "name"

export const $selectedVariant = createStore<SelectItem<VariantType> | null>(null)
export const selectVariantEvent = createEvent<SelectItem<VariantType>>()

$selectedVariant.on(selectVariantEvent, (state, variant) => {
    return state?.value === variant.value ? null : variant
})

$selectedVariant.watch(console.log)