import React, {ChangeEvent, useRef} from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";

type FileInputProps = {
    onChange : (file : File) => void,
    placeholder: string,
    accept?: string,
    className?: string
}

const FileURLInput = ({accept = ".img,.png,.jpg,.jpeg", ...props}: FileInputProps) => {

    const inputRef = useRef<HTMLInputElement>(null)

    const wrapperCV: ClassValue[] = [
        "w-full h-[140px] rounded-xl flex items-center justify-center border-dashed border-2",
        "border-link-blue hoverable pointer hover:bg-blue-50 text-text-gray border-border-gray",
        "hover:text-link-blue hover:border-link-blue",
        props.className
    ]

    const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
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
            <Text text={props.placeholder}/>
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

export default FileURLInput;
