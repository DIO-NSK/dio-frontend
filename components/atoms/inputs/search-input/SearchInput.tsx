import {FiSearch} from "react-icons/fi";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

type SearchBarTypes = {
    placeholder: string,
    value: string,
    onChange: (value: string) => void,
    className ?: string
}

const SearchInput = ({placeholder, value, onChange, className}: SearchBarTypes) => {

    const inputCV: ClassValue[] = [
        "w-full px-[30px] py-4 rounded-xl",
        "bg-white border-2 border-light-gray pointer",
        "group-hover:border-blue-400 hoverable",
        "focus:outline-0",
    ]

    const iconCV : ClassValue[] = [
        "absolute z-10 right-[30px] top-1/3 stroke-text-gray pointer",
        "group-hover:stroke-blue-600 hoverable"
    ]

    return (
        <div className={cn("w-full relative group", className)}>
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
