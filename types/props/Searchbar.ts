import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";

export type SearchBarClassNames = {
    mainWrapper?: string,
    wrapper?: string,
    input?: string
}

export type SearchbarProps = {
    placeholder: string,
    onChange: (value: string) => void,
    selectedElement ?: ResponseProductSearch,
    onSelect ?: (product : ResponseProductSearch | undefined) => void,
    hasPopover?: boolean,
    classNames?: SearchBarClassNames,
    value?: string,
}