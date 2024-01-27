"use client"

import React from 'react';
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import {TableHeaderItem, TextTableRow} from "@/types/dto/Table";
import TextContentTable from "@/components/organisms/tables/TextContentTable";

const AdminPanelWorkersPage = () => {

    const tableHeader: TableHeaderItem[] = [
        {text: "Имя", width: "col-span-2"},
        {text: "Телефон", width: "col-span-2"},
        {text: "Роль", width: "col-span-2"},
    ]

    const tableContent: TextTableRow[] = [
        {items: ["Артём Александрович", "+7 (913) 939-11-94", "Администратор"]},
        {items: ["Артём Александрович", "+7 (913) 939-11-94", "Администратор"]},
        {items: ["Артём Александрович", "+7 (913) 939-11-94", "Администратор"]},
    ]

    const handleAddWorker = () => console.log("Add worker")

    return (
        <>
            <HeaderRow
                className={"mx-[-28px] px-7 pb-7 border-b-2 border-light-gray"}
                header={"Сотрудники"}
                rightContent={
                    <Button
                        size={"sm"}
                        buttonType={"SECONDARY"}
                        icon={<FiPlus size={"18px"}/>}
                        text={"Добавить сотрудника"}
                        onClick={handleAddWorker}
                    />
                }
            />
            <TextContentTable
                tableHeader={tableHeader}
                tableContent={tableContent}
            />
        </>
    );
};

export default AdminPanelWorkersPage;
