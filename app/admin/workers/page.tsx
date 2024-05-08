"use client"

import React, {useEffect} from 'react';
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import {TableHeaderItem, TextTableRow} from "@/types/dto/Table";
import TextContentTable from "@/components/organisms/tables/text-content-table/TextContentTable";
import {usePathname, useRouter} from "next/navigation";
import {useUnit} from "effector-react";
import {$workers, getWorkersEvent} from "@/app/admin/workers/model";

const tableHeader: TableHeaderItem[] = [
    {text: "Имя", width: "col-span-2"},
    {text: "Телефон", width: "col-span-2"},
    {text: "Роль", width: "col-span-2"},
]

const AdminPanelWorkersPage = () => {

    const [workers, getWorkers] = useUnit([$workers, getWorkersEvent])

    const pathname = usePathname()
    const router = useRouter()

    const handleAddWorker = () => router.push(pathname.concat("/new"))

    useEffect(() => {
        getWorkers()
    }, []);

    return (
        <React.Fragment>
            <HeaderRow
                className={"w-full"}
                theme={"bordered"}
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
                tableContent={workers}
            />
        </React.Fragment>
    );
};

export default AdminPanelWorkersPage;
