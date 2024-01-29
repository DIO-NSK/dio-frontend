"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import {useState} from "react";
import Button from "@/components/atoms/buttons/button/Button";
import AdminPanelCharBlock from "@/components/organisms/blocks/admin-panel-char-block/AdminPanelCharBlock";
import {useCharacteristics} from "@/utlis/hooks/useCharacteristics";

const AdminPanelNewCategoryPage = () => {

    const {...chars} = useCharacteristics()

    const [categoryName, setCategoryName] = useState<string>("")
    const handleSaveChanges = () => console.log("Changes saved")

    return (
        <>
            <HeaderRow
                className={"w-full"}
                theme={"bordered"}
                header={"Новая категория"}
                hasBackIcon
            />

            <div className={"w-full mx-[-28px] px-7 pb-7 border-b-2 border-light-gray"}>
                <TextInput
                    labelText={"Название категории"}
                    placeholder={"Введите название категории"}
                    value={categoryName}
                    onChange={setCategoryName}
                />
            </div>

            <AdminPanelCharBlock
                onChangeChar={chars.handlers.handleChangeChar}
                onDeleteChar={chars.handlers.handleDeleteChar}
                onAddChar={chars.handlers.handleAddChar}
                chars={chars.state}
            />

            <Button
                classNames={{button: "w-[250px]"}}
                text={"Сохранить"}
                onClick={handleSaveChanges}
            />

        </>
    );
};

export default AdminPanelNewCategoryPage;
