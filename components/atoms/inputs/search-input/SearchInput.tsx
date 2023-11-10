import style from "./SearchInput.module.css"
import {FiSearch} from "react-icons/fi";

type SearchBarTypes = {
    placeholder : string,
    value : string,
    onChange : (value : string) => void
}

const SearchInput = ({placeholder, value, onChange} : SearchBarTypes) => {
    return (
        <div className={style.wrapper}>
            <FiSearch
                size={"24px"}
                className={style.rightIcon}
            />
            <input
            type={"text"}
            placeholder={placeholder}
            inputMode={"text"}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className={style.input}
            />
        </div>
    )
}

export default SearchInput
