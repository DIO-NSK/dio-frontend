import React from 'react';
import {InputPrefilledData} from "@/types/props/inputs/InputPrefilledData";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";

type InputListWrapperProps = {
    inputs: InputPrefilledData[]
}

const InputListWrapper = (props: InputListWrapperProps) => {
    return (
        <React.Fragment>
            {props.inputs.map((input, inputKey) =>
                <TextInput {...input} key={inputKey}/>
            )}
        </React.Fragment>
    );
};

export default InputListWrapper;
