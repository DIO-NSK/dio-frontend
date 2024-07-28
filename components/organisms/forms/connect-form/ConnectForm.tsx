import {FieldValues, useFormContext, UseFormReturn} from "react-hook-form";
import React from "react";

type ConnectFormProps<T extends FieldValues> = {
    children(methods : UseFormReturn<T, any, T>) : React.ReactNode
}

const ConnectForm = <T extends FieldValues, >({children} : ConnectFormProps<T>) => {
    const methods = useFormContext<T>()
    return children({...methods})
}

export default ConnectForm