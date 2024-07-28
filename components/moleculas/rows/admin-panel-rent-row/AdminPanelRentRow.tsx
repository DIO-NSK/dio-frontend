import React from 'react';
import {CategoryRent} from "@/types/dto/CategoryRent";
import SearchInput from "@/components/atoms/inputs/search-input/SearchInput";
import {convertIndexToDuration} from "@/utlis/convertIndexToDuration";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import {cn} from "@/utlis/cn";
import {FiTrash2} from "react-icons/fi";
import SquareIcon from "@/components/atoms/icons/square-icon/SquareIcon";

type AdminPanelRentRowProps = {
    item: CategoryRent,
    onChange: (categoryRent: CategoryRent) => void,
    onDelete: () => void,
    className ?: string
}

const AdminPanelRentRow = (props: AdminPanelRentRowProps) => {

    const inputRowData = [
        {labelText: "Стоимость за сутки"}, {labelText: "Стоимость за месяц"},
        {labelText: "Стоимость за 6 месяцев"}, {labelText: "Стоимость за год"}
    ]

    const handleChangeCategory = (category: string) => {
        const changedCategoryRent: CategoryRent = {...props.item, category: category}
        props.onChange(changedCategoryRent)
    }

    const handleChangeRentDuration = (index: number, newPrice: string) => {
        const duration = convertIndexToDuration(index)
        if (duration) {
            props.item.rent[duration] = newPrice
            const changedCategoryRent = {...props.item, rent: props.item.rent}
            props.onChange(changedCategoryRent)
        }
    }

    return (
        <div className={cn("w-full flex flex-col gap-5", props.className)}>
            <div className={"w-full flex flex-row items-center gap-5"}>
                <SearchInput
                    classNames={{input: "py-5 bg-bg-light-blue"}}
                    placeholder={"Введите название категории"}
                    onChange={handleChangeCategory}
                    value={props.item.category}
                />
                <SquareIcon
                    className={"w-fit text-info-red hover:bg-red-100 hover:text-red-800 pointer hoverable"}
                    icon={<FiTrash2 size={"18px"}/>}
                    onClick={props.onDelete}
                />
            </div>
            <div className={"w-full flex flex-row gap-5"}>
                {
                    Object.values(props.item.rent).map((price, key) =>
                        <TextInput
                            placeholder={"0 ₽"}
                            labelText={inputRowData[key].labelText}
                            onChange={(price: string) => handleChangeRentDuration(key, price)}
                            value={price} numbersOnly
                        />
                    )
                }
            </div>
        </div>
    );

};

export default AdminPanelRentRow;
