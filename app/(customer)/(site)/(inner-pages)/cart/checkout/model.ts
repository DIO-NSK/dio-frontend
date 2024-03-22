import {SelectItem} from "@/types/props/SelectItem";
import {createEvent, createStore} from "effector";
import {desktopCheckoutSteps} from "@/data/deskstopCheckoutSteps";

export const $activeStep = createStore<SelectItem<number>>(desktopCheckoutSteps[0])
export const setActiveStepEvent = createEvent<SelectItem<number>>()

$activeStep.on(setActiveStepEvent, (_, activeStep) => activeStep)