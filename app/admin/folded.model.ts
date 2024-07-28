import {createEvent, createStore} from "effector";

export const $isFolded = createStore<boolean>(false)
export const toggleFoldedStateEvent = createEvent<void>()

$isFolded.on(toggleFoldedStateEvent, (state) => !state)