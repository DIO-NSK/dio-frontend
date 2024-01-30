import React, {ChangeEvent, useRef} from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {FiPlus} from "react-icons/fi";
import Text from "@/components/atoms/text/text-base/Text";

type FileInputProps = {
    onChange: (file: File) => void,
    placeholder: string,
    accept ?: string,
    className?: string
}

const FileInput = ({accept = ".img,.png,.jpg", ...props}: FileInputProps) => {

    const wrapperCV: ClassValue[] = [
        "w-full h-[140px] rounded-xl flex items-center justify-center border-dashed border-2",
        "border-link-blue hoverable pointer hover:bg-blue-50 text-text-gray border-border-gray",
        "hover:text-link-blue hover:border-link-blue", props.className
    ]

    const inputRef = useRef<HTMLInputElement>(null)

    const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
        const fileToChange = event.target.files?.[0]
        if (fileToChange) props.onChange(fileToChange)
    }

    const handleInputClick = () => {
        if (inputRef) inputRef.current?.click()
    }

    const handleInputClear = () => {
        if (inputRef.current) inputRef.current.value = ""
    }

    return (
        <div className={cn(wrapperCV)} onClick={handleInputClick}>
            <div className={"flex flex-row items-center gap-2"}>
                <FiPlus size={"18px"}/> <Text text={props.placeholder}/>
            </div>
            <input
                ref={inputRef}
                type={"file"}
                accept={accept}
                onClick={handleInputClear}
                onChange={handleChangeFile}
                className={"hidden w-full h-full"}
            />
        </div>
    );

};

export default FileInput;
