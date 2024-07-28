import React from 'react';
import RadioButton from "@/components/atoms/buttons/radio-button/RadioButton";
import {RadioButtonItem} from "@/types/props/RadioButtonItem";

type RadioGroupProps = {
    items: RadioButtonItem[],
    name: string
}

const RadioGroup = (props: RadioGroupProps) => {
    return (
        <section className={"w-full flex flex-col gap-3"}>
            {props.items.map((item, itemKey) =>
                <RadioButton key={itemKey} item={item}/>
            )}
        </section>
    );
};

export default RadioGroup;
