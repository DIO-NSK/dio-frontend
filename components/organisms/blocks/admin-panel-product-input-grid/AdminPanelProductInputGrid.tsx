import ControlledSelectInput
    from "@/components/atoms/inputs/select-input/controlled-select-input/ControlledSelectInput";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import React from "react";
import {SelectItem} from "@/types/props/SelectItem";

const dropdownItems: SelectItem<string>[] = [
    {name: "Салфетки", value: "napkins"},
    {name: "Одноразовая посуда", value: "dish"},
    {name: "Пластиковые стаканы", value: "plastic cups"},
]

const inputGridData = [
    {
        labelText: "Название товара",
        placeholder: "Введите название товара",
        name: "name"
    }, {
        labelText: "Код товара",
        placeholder: "Введите код товара",
        numbersOnly: true,
        name: "crmCode"
    }, {
        labelText: "Цена товара",
        placeholder: "Введите цену товара",
        numbersOnly: true,
        name: "price"
    }, {
        labelText: "Скидка",
        placeholder: "Введите скидку на товар",
        numbersOnly: true,
        name: "discountPercent"
    }, {
        labelText: "Размер НДС",
        placeholder: "20",
        numbersOnly: true,
        name: "taxPercent"
    }
]

const AdminPanelProductInputGrid = () => {

    const itemsPerRow = 3
    const gridColAmount = Math.ceil(inputGridData.length / itemsPerRow)
    const inputRowCN: string = "mx-[-28px] px-7 w-full grid grid-cols-3 gap-7 pb-7 border-b-2 border-light-gray"

    return (
        <>
            {
                Array.from({length: gridColAmount}, (_, rowIndex) =>
                    <div key={rowIndex} className={inputRowCN}>
                        {
                            inputGridData
                                .slice(rowIndex * 2, (rowIndex + 1) * 2 + 1)
                                .map((inputData, inputIndex) => {
                                    return rowIndex === 0 && inputIndex === 2 ? <ControlledSelectInput
                                        width={"col-span-1"}
                                        labelText={"Группа товара"}
                                        placeholder={"Выберите группу товаров"}
                                        items={dropdownItems}
                                        name={"crmGroup"}
                                        key={inputIndex}
                                    /> : <ControlledTextInput
                                        classNames={{wrapper: "col-span-1"}}
                                        key={inputIndex} {...inputData}
                                    />
                                })
                        }
                    </div>
                )
            }
        </>
    )
}

export default AdminPanelProductInputGrid