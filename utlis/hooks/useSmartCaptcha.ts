import {FieldErrors, FieldValues, Path, UseFormTrigger} from "react-hook-form";
import {useToggle} from "@/utlis/hooks/useToggle";
import {useReducer} from "react";

export const useSmartCaptcha = <T extends FieldValues,>(fieldNames : Path<T>[], trigger : UseFormTrigger<T>, errors ?: FieldErrors) => {
    const [resetCaptcha, setResetCaptcha] = useReducer((value) => value + 1, 0);
    const {state : captchaVisible, toggleState : toggleCaptchaVisible} = useToggle(false);

    const handleValidateForm = async () => {
        if (await trigger(fieldNames)) {
            toggleCaptchaVisible();
        } else if (errors) {
            console.log('form errors', errors);
        }
    }

    return [ captchaVisible, toggleCaptchaVisible, handleValidateForm , resetCaptcha, setResetCaptcha] as const;

}