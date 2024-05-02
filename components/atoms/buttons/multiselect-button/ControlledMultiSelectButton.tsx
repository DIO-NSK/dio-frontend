import React from 'react';
import {Controller, FieldValues, Path, UseFormReturn} from "react-hook-form";
import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import ConnectForm from "@/components/organisms/forms/connect-form/ConnectForm";
import {SelectItem} from "@/types/props/SelectItem";

type ControlledMultiselectButtonProps<T extends FieldValues, R> = {
    name: Path<T>,
    items: SelectItem<R>[],
    labelText?: string
}

const ControlledMultiselectButton = <T extends FieldValues, R, >(props: ControlledMultiselectButtonProps<T, R>) => (
    <ConnectForm>
        {(methods: UseFormReturn<FieldValues, any, FieldValues>) => (
            <Controller
                name={props.name}
                control={methods.control}
                render={({field: {onChange, value}}) => (
                    <MultiselectButton
                        className={"h-[100px]"}
                        activeElement={value ?? props.items[0]}
                        labelText={props.labelText}
                        selectElement={onChange}
                        elements={props.items}
                    />
                )}
            />
        )}
    </ConnectForm>
)

export default ControlledMultiselectButton;
