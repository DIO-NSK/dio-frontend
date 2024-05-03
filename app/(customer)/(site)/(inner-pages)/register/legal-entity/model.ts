import {createEvent, createStore} from "effector";
import {SelectItem} from "@/types/props/SelectItem";
import {legalEntityCheckoutSteps} from "@/data/deskstopCheckoutSteps";
import {LegalEntityData} from "@/schemas/customer/authorization/LegalEntitySchema";

export const $activeStep = createStore<SelectItem<number>>(legalEntityCheckoutSteps[0])
export const setActiveStepEvent = createEvent<SelectItem<number>>()
export const $firstStepData = createStore<Partial<LegalEntityData> | null>(null)
export const submitFirstStepEvent = createEvent<Partial<LegalEntityData>>()

$firstStepData.on(submitFirstStepEvent, (_, data) => data)
$activeStep.on(setActiveStepEvent, (_, activeStep) => activeStep)