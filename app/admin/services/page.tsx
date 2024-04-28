"use client"

import React, {useEffect, useState} from 'react';
import {TableHeaderItem} from "@/types/dto/Table";
import {useUnit} from "effector-react";
import {CallRequestStatus} from "@/app/admin/call-requests/main.model";
import {SelectItem} from "@/types/props/SelectItem";
import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Text from "@/components/atoms/text/text-base/Text";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import Button from "@/components/atoms/buttons/button/Button";
import {
    $activeServiceType,
    $selectedServices,
    $serviceTableRows,
    getServiceByTypeEvent,
    removeAllServicesEvent,
    selectAllServicesEvent,
    selectServiceEvent,
    setServiceStatusEvent,
    updateServicesEvent
} from "@/app/admin/services/model";
import ServicesContentTable from "@/components/organisms/tables/services-content-table/ServicesContentTable";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import {optionalServiceTypes} from "@/types/dto/admin/service/AdminService";

const servicesTableHeader: TableHeaderItem[] = [
    {text: "Данные клиента", width: "col-span-2"},
    {text: "Дата", width: "col-span-1"},
    {text: "Тип услуги", width: "col-span-1"},
    {text: "Комментарий", width: "col-span-4"},
]

const multiselectElements: SelectItem<CallRequestStatus>[] = [
    {name: "Актуальные", value: "CURRENT"},
    {name: "Архив", value: "ARCHIVE"}
]

const AdminPanelServicesPage = () => {

    const [activeServiceType, setActiveServiceType]
        = useUnit([$activeServiceType, getServiceByTypeEvent])

    const [services, setServiceStatus, updateServices]
        = useUnit([$serviceTableRows, setServiceStatusEvent, updateServicesEvent])

    const [selectedItems, select, selectAll, removeAll] = useUnit([$selectedServices,
        selectServiceEvent, selectAllServicesEvent, removeAllServicesEvent])

    const [activeElement, setActiveElement] = useState<SelectItem<CallRequestStatus>>(multiselectElements[0])
    const updateButtonText = activeElement.value === "CURRENT" ? "Поместить в архив" : "Восстановить"

    const handleUpdateCallRequests = () => {
        if (activeElement.value === "CURRENT") updateServices("ARCHIVE")
        else updateServices("CURRENT")
    }

    useEffect(() => {
        setServiceStatus(activeElement.value)
    }, [activeElement])

    return (
        <React.Fragment>
            <div className={"w-full mx-[-28px] px-7 grid grid-cols-8 gap-5"}>
                <MultiselectButton
                    activeElement={activeElement}
                    selectElement={setActiveElement}
                    elements={multiselectElements}
                    className={"col-span-3"}
                />
                <SelectInput
                    width={"col-span-3 col-start-6"}
                    items={optionalServiceTypes}
                    onSelect={setActiveServiceType}
                    selectedItem={activeServiceType}
                />
            </div>
            <HeaderRow
                theme={"bordered"}
                className={"w-full"}
                header={"Услуги"}
                leftContent={
                    <div className={"w-fit flex flex-row items-baseline gap-4"}>
                        {selectedItems.length > 0 &&
                            <div className={"flex flex-row items-baseline gap-4"}>
                                <Text
                                    text={`Выбрано ${selectedItems.length}`}
                                    className={"text-text-gray"}
                                />
                                <TextButton
                                    className={"text-info-red hover:text-red-700"}
                                    text={"Отменить выбор"}
                                    onClick={removeAll}
                                />
                            </div>
                        }
                        <TextButton
                            text={"Выбрать всё"}
                            onClick={selectAll}
                        />
                    </div>
                }
                rightContent={
                    <Button
                        onClick={handleUpdateCallRequests}
                        buttonType={"SECONDARY"}
                        text={updateButtonText}
                        size={"sm"}
                    />
                }
            />
            {services && <ServicesContentTable
                tableHeader={servicesTableHeader}
                selectedItems={selectedItems}
                tableContent={services}
                onSelect={select}
            />}
        </React.Fragment>
    );
};

export default AdminPanelServicesPage;