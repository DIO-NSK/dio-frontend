import {FiSearch} from "react-icons/fi";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

type SearchBarClassNames = {
    wrapper ?: string,
    input ?: string
}

type SearchBarTypes = {
    placeholder: string,
    value: string,
    onChange: (value: string) => void,
    classNames ?: SearchBarClassNames
}

const SearchInput = ({placeholder, value, onChange, classNames}: SearchBarTypes) => {

    const inputCV: ClassValue[] = [
        "w-full px-[30px] py-4 rounded-xl",
        "bg-white border-2 border-light-gray pointer",
        "group-hover:border-blue-400 hoverable",
        "focus:outline-0", classNames?.input
    ]

    const iconCV : ClassValue[] = [
        "absolute z-10 right-[30px] top-1/3 stroke-text-gray pointer",
        "group-hover:stroke-blue-600 hoverable"
    ]

    return (
        <div className={cn("w-full relative group", classNames?.wrapper)}>
            <FiSearch
                size={"22px"}
                className={cn(iconCV)}
            />
            <input
                type={"text"}
                inputMode={"text"}
                placeholder={placeholder}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className={cn(inputCV)}
            />
        </div>
    )
}

export default SearchInput
