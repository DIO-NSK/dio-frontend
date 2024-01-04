import {FiSearch} from "react-icons/fi";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

type SearchBarTypes = {
    placeholder: string,
    value: string,
    onChange: (value: string) => void
}

const SearchInput = ({placeholder, value, onChange}: SearchBarTypes) => {

    const inputCV: ClassValue[] = [
        "w-full px-[30px] py-[20px] rounded-xl",
        "bg-white border-2 border-light-gray pointer",
        "hover:border-blue-400 hover:duration-200 transition",
        "focus:outline-0"
    ]

    const iconCV : ClassValue[] = [
        "absolute z-10 right-[30px] top-1/3 stroke-text-gray pointer",
        "hover:stroke-blue-600 hover:duration-200 transition"
    ]

    return (
        <div className={"w-full relative"}>
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
