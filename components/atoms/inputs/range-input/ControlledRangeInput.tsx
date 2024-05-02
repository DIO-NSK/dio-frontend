import React from 'react';
import {Controller, FieldPathValue, FieldValues, Path, useFormContext} from "react-hook-form";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";
import RangeInput from "@/components/atoms/inputs/range-input/RangeInput";

type ControlledRangeInputProps<T extends FieldValues> = {
    name: Path<T>,
    className?: string,
    minValue: string,
    maxValue: string,
    labelText ?: string,
}

const ControlledRangeInput = <T extends FieldValues, >(props: ControlledRangeInputProps<T>) => {

    const methods = useFormContext()

    const handleChangeFromValue = (newValue: string) => {
        methods.setValue(`${props.name}.from`, newValue as FieldPathValue<FieldValues, Path<T>>)
    }

    const handleChangeToValue = (newValue: string) => {
        methods.setValue(`${props.name}.to`, newValue as FieldPathValue<FieldValues, Path<T>>)
    }

    return (
        <Controller
            name={props.name}
            control={methods.control}
            render={() => (
                <div className={cn("w-full flex flex-col gap-2", props.className)}>
                    <RangeInput
                        onChangeFromValue={handleChangeFromValue}
                        onChangeToValue={handleChangeToValue}
                        minValue={props.minValue} maxValue={props.maxValue}
                        fromValue={methods.getValues(`${props.name}.from`) ?? props.minValue}
                        toValue={methods.getValues(`${props.name}.to`) ?? props.maxValue}
                        labelText={props.labelText}
                    />
                    {methods.formState?.errors[props.name]?.message && <Text
                        text={methods.formState?.errors?.[props.name]?.message as string}
                        className={cn("text-info-red", "text-[14px]")}
                    />}
                </div>
            )}
        />
    )

}

export default ControlledRangeInput;
