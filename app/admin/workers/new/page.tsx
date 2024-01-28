"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import {useState} from "react";
import DropdownInput from "@/components/atoms/inputs/dropdown-input/DropdownInput";
import {SelectedItem} from "@/types/select";
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";

const AddNewWorkerPage = () => {

    const dropdownItems: SelectedItem[] = [
        {text: "Администратор", isSelected: true},
        {text: "Модератор", isSelected: false},
        {text: "Организатор", isSelected: false},
    ]

    const [
        activeItem,
        setActiveItem
    ] = useState<SelectedItem>(dropdownItems[0])

    const [username, setUsername] = useState<string>("")
    const [surname, setSurname] = useState<string>("")
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const workerInputData = [
        {
            labelText: "Имя сотрудника",
            placeholder: "Введите имя сотрудника",
            value: username,
            onChange: setUsername
        }, {
            labelText: "Фамилия сотрудника",
            placeholder: "Введите фамилию сотрудника",
            value: surname,
            onChange: setSurname
        }, {
            labelText: "Номер телефона",
            placeholder: "+_ (___) ___-__-__",
            inputMask: "+9 (999) 999-99-99",
            value: phoneNumber,
            onChange: setPhoneNumber
        }, {
            labelText: "Пароль",
            placeholder: "Придумайте надёжный пароль",
            isPassword: true,
            value: password,
            onChange: setPassword
        },
    ]

    const handleAddWorker = () => console.log("Worker was added!")

    return (
        <>
            <HeaderRow
                theme={"bordered"}
                header={"Добавить сотрудника"}
                hasBackIcon
            />
            {
                Array.from({length: workerInputData.length / 2}, (_, index) =>
                    <section className={"w-full flex flex-row gap-7 border-b-2 pb-7 border-light-gray"}>
                        {
                            workerInputData.slice(index * 2, (index + 1) * 2).map((inputData, key) =>
                                <TextInput
                                    labelText={inputData.labelText}
                                    placeholder={inputData.placeholder}
                                    inputMask={inputData.inputMask}
                                    isPassword={inputData.isPassword}
                                    onChange={inputData.onChange}
                                    value={inputData.value}
                                />
                            )
                        }
                    </section>
                )
            }
            <section className={"w-full grid grid-cols-2 gap-7 border-b-2 pb-7 border-light-gray"}>
                <DropdownInput
                    width={"col-span-1"}
                    label={"Роль пользователя"}
                    items={dropdownItems}
                    onSelect={setActiveItem}
                    selectedItem={activeItem}
                />
            </section>
            <Button
                classNames={{button : "w-[300px]"}}
                icon={<FiPlus size={"20px"}/>}
                text={"Добавить сотрудника"}
                onClick={handleAddWorker}
            />
        </>
    );
};

export default AddNewWorkerPage;
