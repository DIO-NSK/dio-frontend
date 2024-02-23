import React from 'react';
import {SelectItem} from "@/types/props/SelectItem";
import {Controller, FieldValues, Path, UseFormReturn} from "react-hook-form";
import ConnectForm from "@/components/organisms/forms/connect-form/ConnectForm";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";

type ControlledSelectInputProps = {
    items: SelectItem<string>[],
    className ?: string,
    name: string,
    placeholder : string,
    labelText : string
}

const ControlledSelectInput = <T extends FieldValues, >(props : ControlledSelectInputProps) => {
    return (
        <ConnectForm>
            {(methods: UseFormReturn<T, any, T>) => <Controller
                control={methods.control}
                name={props.name as Path<T>}
                render={({field: {onChange, value}}) => (
                    <SelectInput
                        items={props.items}
                        onSelect={onChange}
                        selectedItem={value}
                        className={props.className}
                        placeholder={props.placeholder}
                        labelText={props.labelText}
                        error={methods.formState.errors?.[props.name]?.message as string}
                    />
                )}
            />}
        </ConnectForm>
    );
};

export default ControlledSelectInput;
