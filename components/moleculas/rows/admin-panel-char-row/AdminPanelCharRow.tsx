import {SelectItem} from "@/types/props/Select";
import SquareIcon from "@/components/atoms/icons/square-icon/SquareIcon";
import {FiMenu, FiTrash2} from "react-icons/fi";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import {Characteristic, CharacteristicType} from "@/types/dto/Characteristic";

type AdminPanelCharRow = {
    value : Characteristic,
    onChange : (newChar : Characteristic) => void,
    onDelete : () => void
}

const AdminPanelCharRow = (props : AdminPanelCharRow) => {

    const dropdownItems: SelectItem<CharacteristicType>[] = [
        {name: "Целое число", value: "int"},
        {name: "Дробное число", value: "float"},
        {name: "Строка", value: "string"},
    ]

    const handleChangeCharName = (newName : string) => {
        props.onChange({...props.value, name : newName})
    }
    const handleChangeCharType = (selectedItem : SelectItem<CharacteristicType>) => {
        props.onChange({...props.value, type : selectedItem})
    }

    return (
        <div className={"w-full grid grid-cols-3 gap-x-5 items-center"}>
            <div className={"col-span-2 flex flex-row items-center gap-5"}>
                <SquareIcon icon={<FiMenu size={"18px"}/>}/>
                <TextInput
                    classNames={{wrapper : "grow"}}
                    placeholder={"Введите название характеристики"}
                    value={props.value.name}
                    onChange={handleChangeCharName}
                />
            </div>
            <div className={"col-span-1 flex flex-row items-center gap-5"}>
                <SelectInput
                    items={dropdownItems}
                    onSelect={handleChangeCharType}
                    selectedItem={props.value.type}
                    className={"flex-none"}
                />
                <SquareIcon
                    className={"text-info-red hover:bg-red-100 hover:text-red-800 pointer hoverable"}
                    icon={<FiTrash2 size={"18px"}/>}
                    onClick={props.onDelete}
                />
            </div>
        </div>
    )

}

export default AdminPanelCharRow