"use client"

import React, {useEffect, useState} from 'react';
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import {TableHeaderItem, TableRow} from "@/types/dto/Table";
import TextContentTable from "@/components/organisms/tables/text-content-table/TextContentTable";
import {usePathname, useRouter} from "next/navigation";
import {useUnit} from "effector-react";
import {$workers, deleteWorkerEvent, getWorkersEvent} from "@/app/admin/workers/model";
import DeletePopup from "@/components/organisms/popups/admin/delete-popup/DeletePopup";

const tableHeader: TableHeaderItem[] = [
    {text: "Имя", width: "col-span-2"},
    {text: "Телефон", width: "col-span-2"},
    {text: "Роль", width: "col-span-2"},
]

const AdminPanelWorkersPage = () => {

    const deleteWorker = useUnit(deleteWorkerEvent)
    const [workers, getWorkers] = useUnit([$workers, getWorkersEvent])
    const [workerToDelete, setWorkerToDelete] = useState<TableRow<string[]> | undefined>(undefined)

    const pathname = usePathname()
    const router = useRouter()

    const handleAddWorker = () => router.push(pathname.concat("/new"))

    const handleDeleteWorker = (staffId: number) => {
        deleteWorker(staffId)
        setWorkerToDelete(undefined)
    }

    useEffect(() => {
        getWorkers()
    }, []);

    return (
        <React.Fragment>
            {workerToDelete && <DeletePopup
                header={"Удалить сотрудника"}
                message={"Вы точно хотите удалить сотрудника? Данное действие невозможно отменить."}
                buttonText={'Удалить сотрудника'}
                onClose={() => setWorkerToDelete(undefined)}
                onDelete={handleDeleteWorker}
                tableRow={workerToDelete}
            />}
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
                hasTooltip={true}
                onDelete={setWorkerToDelete}
                tableHeader={tableHeader}
                tableContent={workers}
            />
        </React.Fragment>
    );

};

export default AdminPanelWorkersPage;
