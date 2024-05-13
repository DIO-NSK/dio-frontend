import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {FiPlus, FiX} from "react-icons/fi";
import Text from "@/components/atoms/text/text-base/Text";
import {useAdminPhotoCard} from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard.utils";
import {LinearProgress} from "@mui/joy";

type FileInputProps = {
    onChange: (url : string) => void,
    placeholder: string,
    accept?: string,
    className?: string
}

const FileInput = ({accept = ".img,.png,.jpg,.jpeg", ...props}: FileInputProps) => {

    const {uploadForm, isSuccess, progress, reset} = useAdminPhotoCard()
    const [url, setURL] = useState<string>('')

    const inputRef = useRef<HTMLInputElement>(null)

    const wrapperCV: ClassValue[] = [
        "w-full h-[140px] rounded-xl flex items-center justify-center border-dashed border-2",
        "border-link-blue hoverable pointer hover:bg-blue-50 text-text-gray border-border-gray",
        "hover:text-link-blue hover:border-link-blue",
        {'text-green-600 border-green-600 bg-green-50': isSuccess === true},
        {'hover:bg-green-100 hover:text-green-600, hover:border-green-600': isSuccess === true},
        {'text-red-500 border-red-500 bg-red-50': isSuccess === false},
        {'hover:text-red-500 hover:border-red-500 hover:bg-red-100': isSuccess === false},
        props.className
    ]

    const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const fileToChange = event.target.files?.[0]
        if (fileToChange) {
            setURL(await uploadForm(fileToChange))
        }
    }

    const handleInputClick = () => {
        if (inputRef) inputRef.current?.click()
    }

    const handleInputClear = () => {
        if (inputRef.current) inputRef.current.value = ""
    }

    useEffect(() => {
        if (isSuccess === true) {
            props.onChange(url)
            reset()
        }
    }, [isSuccess]);

    return (
        <div className={"w-full flex flex-col gap-3"}>
            <div className={cn(wrapperCV)} onClick={handleInputClick}>
                {
                    (progress === false || isSuccess !== undefined) ? (
                        <div className={'w-full flex flex-row gap-2 justify-center items-center'}>
                            {isSuccess === false ? <FiX size={"18px"}/> : <FiPlus size={"18px"}/>}
                            <Text text={isSuccess === false ? 'Слишком большое фото' : props.placeholder}/>
                        </div>
                    ) : (<Text text={`Загружаем фото — ${progress}%`}/>)
                }
                <input
                    ref={inputRef}
                    type={"file"}
                    accept={accept}
                    onClick={handleInputClear}
                    onChange={handleChangeFile}
                    className={"hidden w-full h-full"}
                />
            </div>
            {progress !== false && <LinearProgress
                color={isSuccess === false ? 'danger' : 'primary'}
                value={progress}
                determinate
            />}
        </div>
    );

};

export default FileInput;
