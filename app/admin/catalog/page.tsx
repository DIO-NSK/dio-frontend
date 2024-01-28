"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus, FiUpload} from "react-icons/fi";
import SearchInput from "@/components/atoms/inputs/search-input/SearchInput";
import {useState} from "react";
import TextContentTable from "@/components/organisms/tables/TextContentTable";
import {TextTableRow} from "@/types/dto/Table";
import AdminSectionPopup from "@/components/organisms/popups/admin/section/AdminSectionPopup";

const CatalogHeaderRow = () => {

    const handleExportCatalog = () => console.log("Exported")

    const [searchValue, setSearchValue] = useState<string>("")
    const [isPopupVisible, setPopupVisible] = useState<boolean>(false)

    const handleSwitchPopupState = () => setPopupVisible(!isPopupVisible)

    return (
        <>
            {
                isPopupVisible && <AdminSectionPopup
                    placement={"center"}
                    onClose={handleSwitchPopupState}
                />
            }
            <section className={"w-full flex flex-row gap-5"}>

                <Button
                    icon={<FiPlus size={"20px"}/>}
                    text={"Добавить элемент"}
                    onClick={handleSwitchPopupState}
                />
                <Button
                    icon={<FiUpload size={"20px"}/>}
                    text={"Экспортировать"}
                    onClick={handleExportCatalog}
                    buttonType={"SECONDARY"}
                />

                <SearchInput
                    placeholder={"Поиск по каталогу"}
                    value={searchValue}
                    onChange={setSearchValue}
                />

            </section>
        </>
    )
}

const SaveDiscardChangesButtonRow = ({isEditable, onChange}: {
    isEditable: boolean,
    onChange: () => void
}) => {
    return (
        <>
            {
                isEditable ? <div className={"flex flex-row gap-3"}>
                    <Button
                        text={"Сохранить изменения"}
                        onClick={onChange}
                        buttonType={"SECONDARY"} size={"sm"}
                    />
                    <Button
                        text={"Отменить"}
                        onClick={onChange}
                        buttonType={"SECONDARY"} size={"sm"}
                        classNames={{button: "bg-bg-light-blue hover:bg-gray-100 text-text-gray"}}
                    />
                </div> : <Button
                    text={"Редактировать"}
                    onClick={onChange}
                    buttonType={"SECONDARY"}
                    size={"sm"}
                />
            }
        </>
    )
}

const CatalogPage = () => {

    const tableContent: TextTableRow[] = [
        {items: ["Воды питьевые"]},
        {items: ["Бытовая химия и гигиена"]},
        {items: ["Безалкогольные напитки"]},
        {items: ["Одноразовая посуда"]},
        {items: ["Кофе и чай"]},
        {items: ["Добавки к напиткам"]},
    ]

    const [isEditable, setEditable] = useState<boolean>(false)

    const handleSwitchEditable = () => setEditable(!isEditable)

    return (
        <>
            <CatalogHeaderRow />

            <HeaderRow
                theme={"bordered"}
                header={"Разделы"}
                rightContent={
                    <SaveDiscardChangesButtonRow
                        isEditable={isEditable}
                        onChange={handleSwitchEditable}
                    />
                }
            />

            <TextContentTable
                className={"mt-[-28px]"}
                tableContent={tableContent}
                isDraggable={isEditable}
            />

        </>
    );

};

export default CatalogPage;
