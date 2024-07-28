import {useState} from "react";

export type ToggleProps = {
    state: boolean,
    toggleState: () => void
}

export const useToggle = (defaultState: boolean = false) => {

    const [state, setState] = useState<boolean>(defaultState)
    const toggleState = () => setState(!state)

    return {state, toggleState}

}