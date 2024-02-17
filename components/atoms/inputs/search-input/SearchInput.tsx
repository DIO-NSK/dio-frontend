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
        "w-full p-5 sm:px-[30px] py-4 rounded-xl bg-bg-light-blue border-0",
        "sm:bg-white sm:border-2 border-light-gray pointer",
        "group-hover:border-blue-400 hoverable",
        "focus:outline-0", classNames?.input
    ]

    const iconCV : ClassValue[] = [
        "absolute z-10 right-5 sm:right-[30px] top-1/3 stroke-text-gray sm:pointer",
        "w-5 h-5 sm:w-6 sm:h-6 sm:group-hover:stroke-blue-600 sm:hoverable"
    ]

    return (
        <div className={cn("w-full relative group", classNames?.wrapper)}>
            <FiSearch className={cn(iconCV)}/>
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
