import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";
import {SelectItem} from "@/types/props/SelectItem";

export type SearchBarClassNames = {
    mainWrapper?: string,
    wrapper?: string,
    input?: string
}

export type SearchbarProps<T> = {
    placeholder: string,
    onChange: (value: string) => void,
    hasLink ?: boolean,
    selectedElement ?: ResponseProductSearch,
    onSelect ?: (product : ResponseProductSearch | undefined) => void,
    hasPopover?: boolean,
    classNames?: SearchBarClassNames,
    selectable ?: boolean,
    variants ?: SelectItem<T>[],
    onSelectVariant ?: (variant : SelectItem<T>) => void,
    selectedVariant ?: SelectItem<T> | null,
    value?: string,
}