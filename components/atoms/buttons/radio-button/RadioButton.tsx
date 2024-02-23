import React from 'react';
import Text from "@/components/atoms/text/text-base/Text";
import {FieldValues, UseFormReturn} from "react-hook-form";
import ConnectForm from "@/components/organisms/forms/connect-form/ConnectForm";
import {RadioButtonItem} from "@/types/props/RadioButtonItem";

const RadioButton = ({item}: { item: RadioButtonItem }) => {

    const wrapperCN = "rounded-xl bg-bg-light-blue p-5 flex flex-row items-center gap-5"
    const inputCN = "focus:ring-blue focus:bg-orange-500 border-2 border-light-gray"
    const radioId = "radio-".concat(item.value)

    return (
        <ConnectForm>
            {(methods: UseFormReturn<FieldValues, any, FieldValues>) => (
                <fieldset className={wrapperCN}>
                    <input
                        id={radioId} className={inputCN}
                        {...methods.register(item.groupName)}
                        value={item.value} type={"radio"}
                    />
                    <label htmlFor={radioId}>
                        <Text text={item.label}/>
                    </label>
                </fieldset>
            )}
        </ConnectForm>
    );

};

export default RadioButton;
