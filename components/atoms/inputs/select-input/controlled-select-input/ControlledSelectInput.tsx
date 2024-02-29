import React from 'react';
import {SelectItem} from "@/types/props/SelectItem";
import {Controller, FieldValues, Path, UseFormReturn} from "react-hook-form";
import ConnectForm from "@/components/organisms/forms/connect-form/ConnectForm";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";

type ControlledSelectInputProps = {
    items: SelectItem<string>[],
    width ?: string,
    className ?: string,
    name: string,
    placeholder : string,
    labelText ?: string
}

const ControlledSelectInput = <T extends FieldValues, >(props : ControlledSelectInputProps) => {
    return (
        <ConnectForm>
            {(methods: UseFormReturn<T, any, T>) => <Controller
                control={methods.control}
                name={props.name as Path<T>}
                render={({field: {onChange, value}}) => (
                    <SelectInput
                        error={methods.formState.errors?.[props.name]?.message as string}
                        selectedItem={value}
                        onSelect={onChange}
                        {...props}
                    />
                )}
            />}
        </ConnectForm>
    );
};

export default ControlledSelectInput;
