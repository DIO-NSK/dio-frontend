import React from 'react';
import ConnectForm from "@/components/organisms/forms/connect-form/ConnectForm";
import {Controller, FieldValues, UseFormReturn} from "react-hook-form";
import Switch from "@/components/atoms/switch/Switch";

const ControlledSwitch = ({name}: { name: string }) => {
    return (
        <ConnectForm>
            {(methods: UseFormReturn<FieldValues, any, FieldValues>) => (
                <Controller
                    render={({field: {onChange, value}}) => (
                        <Switch isSelected={value} onSelect={() => onChange(!value)}/>
                    )}
                    control={methods.control}
                    name={name}
                />
            )}
        </ConnectForm>
    );
};

export default ControlledSwitch;
