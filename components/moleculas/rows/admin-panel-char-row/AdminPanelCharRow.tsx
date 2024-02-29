import {SelectItem} from "@/types/props/SelectItem";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import {Characteristic, CharacteristicType} from "@/types/dto/Characteristic";
import DraggableRowWrapper from "@/components/wrappers/draggable-row-wrapper/DraggableRowWrapper";

type AdminPanelCharRow = {
    value: Characteristic,
    onChange: (newChar: Characteristic) => void,
    onDelete: () => void
}

const AdminPanelCharRow = (props: AdminPanelCharRow) => {

    const dropdownItems: SelectItem<CharacteristicType>[] = [
        {valueName: "Целочисленное значение", valueType: "Целочисленное значение"},
        {valueName: "Дробное значение", valueType: "Дробное значение"},
        {valueName: "Текстовое значение", valueType: "Текстовое значение"},
    ]

    const handleChangeCharName = (newName: string) => {
        props.onChange({...props.value, valueName: newName})
    }
    const handleChangeCharType = (selectedItem: SelectItem<CharacteristicType>) => {
        props.onChange({...props.value, type: selectedItem})
    }

    return (
        <DraggableRowWrapper {...props}>
            <TextInput
                classNames={{wrapper: "grow"}}
                placeholder={"Введите название характеристики"}
                value={props.value.name}
                onChange={handleChangeCharName}
            />
            <SelectInput
                items={dropdownItems}
                onSelect={handleChangeCharType}
                selectedItem={props.value.type}
                className={"flex-none"}
            />
        </DraggableRowWrapper>
    )

}

export default AdminPanelCharRow