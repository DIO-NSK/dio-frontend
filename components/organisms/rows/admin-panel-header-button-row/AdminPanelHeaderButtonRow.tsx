import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus, FiUpload} from "react-icons/fi";
import SearchInput from "@/components/atoms/inputs/search-input/SearchInput";

type CatalogHeaderRowProps = {
    onExportCatalog?: () => void,
    onAddNewItem: () => void,
    searchInputValue: string,
    searchInputOnChange: (value: string) => void
}

const AdminPanelHeaderButtonRow = (props: CatalogHeaderRowProps) => {
    return (
        <section className={"w-full px-7 flex flex-row gap-5"}>
            <Button
                icon={<FiPlus size={"20px"}/>}
                text={"Добавить элемент"}
                onClick={props.onAddNewItem}
            />
            {
                props.onExportCatalog && <Button
                    disabled={true} hasSpinner={false}
                    icon={<FiUpload size={"20px"}/>}
                    text={"Экспортировать"}
                    onClick={props.onExportCatalog}
                    buttonType={"SECONDARY"}
                />
            }
            <SearchInput
                placeholder={"Поиск по каталогу"}
                value={props.searchInputValue}
                onChange={props.searchInputOnChange}
            />
        </section>
    )
}

export default AdminPanelHeaderButtonRow