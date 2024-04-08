import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import React from "react";
import {InputPrefilledData} from "@/types/props/inputs/InputPrefilledData";

const productInputGrid: InputPrefilledData[] = [
    {
        labelText: "Название товара",
        placeholder: "Введите название товара",
        name: "name"
    }, {
        labelText: "Цена товара",
        placeholder: "Введите цену товара",
        readOnly : true,
        name: "price"
    }, {
        labelText: "Скидка",
        placeholder: "Введите скидку на товар",
        numbersOnly: true,
        name: "discountPercent"
    }, {
        labelText: "Размер НДС",
        readOnly : true,
        placeholder: "20",
        name: "taxPercent"
    }
]

const AdminPanelProductInputGrid = () => {

    const inputRowCN: string = "mx-[-28px] px-7 w-full grid grid-cols-3 gap-7 pb-7 border-b-2 border-light-gray"

    return (
        <section className={inputRowCN}>
            {productInputGrid
                .map((inputData, inputIndex) => {
                    return <ControlledTextInput
                        readonly={inputData.readOnly}
                        classNames={{wrapper: `col-span-1`}}
                        key={inputIndex} {...inputData}
                    />
                })}
        </section>
    )

}

export default AdminPanelProductInputGrid