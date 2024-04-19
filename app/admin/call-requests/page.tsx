"use client"

import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import React, {useEffect, useState} from "react";
import SearchInput from "@/components/atoms/inputs/search-input/SearchInput";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Text from "@/components/atoms/text/text-base/Text";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import Button from "@/components/atoms/buttons/button/Button";
import CallRequestsContentTable
    from "@/components/organisms/tables/call-requests-content-table/CallRequestsContentTable";
import {useUnit} from "effector-react";
import {
    $callRequestTableRows,
    $searchCallRequest,
    $selectedCallRequests,
    CallRequestStatus,
    removeAllCallRequests,
    selectAllCallRequestEvent,
    selectCallRequestEvent,
    setCallRequestStatusEvent,
    setSearchCallRequestEvent,
    updateCallRequestEvent
} from "@/app/admin/call-requests/main.model";
import {TableHeaderItem} from "@/types/dto/Table";
import {SelectItem} from "@/types/props/SelectItem";
import {$selectedVariant, selectVariantEvent, VariantType} from "@/app/admin/call-requests/variants.model";

const callRequestsTableHeader: TableHeaderItem[] = [
    {text: "Данные клиента", width: "col-span-2"},
    {text: "Дата", width: "col-span-1"},
    {text: "Комментарий", width: "col-span-5"},
]

const multiselectElements: SelectItem<CallRequestStatus>[] = [
    {name: "Актуальные", value: "CURRENT"},
    {name: "Архив", value: "ARCHIVE"}
]

const variants: SelectItem<VariantType>[] = [
    {name: "по телефону", value: "phone_number"},
    {name: "по имени", value: "name"},
]

const AdminPanelCallRequestsPage = () => {

    const callRequests = useUnit($callRequestTableRows)
    const [selectedVariant, selectVariants] = useUnit([$selectedVariant, selectVariantEvent])
    const [searchCallRequest, setSearchCallRequest] = useUnit([$searchCallRequest, setSearchCallRequestEvent])

    const [selectedItems, select, selectAll, removeAll] = useUnit([$selectedCallRequests,
        selectCallRequestEvent, selectAllCallRequestEvent, removeAllCallRequests])

    const [updateCallRequest, setCallRequestStatus] = useUnit([updateCallRequestEvent, setCallRequestStatusEvent])

    const [activeElement, setActiveElement] = useState<SelectItem<CallRequestStatus>>(multiselectElements[0])
    const updateButtonText = activeElement.value === "CURRENT" ? "Поместить в архив" : "Восстановить"

    const handleUpdateCallRequests = () => {
        if (activeElement.value === "CURRENT") updateCallRequest("ARCHIVE")
        else updateCallRequest("CURRENT")
    }

    useEffect(() => {
        setCallRequestStatus(activeElement.value)
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
                <SearchInput
                    classNames={{mainWrapper: "col-span-5", input: "h-[60px]"}}
                    placeholder={"Поиск заявок"}
                    onChange={setSearchCallRequest}
                    value={searchCallRequest}
                    variants={variants}
                    selectedVariant={selectedVariant}
                    onSelectVariant={selectVariants}
                    selectable
                />
            </div>

            <HeaderRow
                theme={"bordered"}
                className={"w-full"}
                header={"Заявки на звонок"}
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

            {callRequests && <CallRequestsContentTable
                tableHeader={callRequestsTableHeader}
                selectedItems={selectedItems}
                tableContent={callRequests}
                onSelect={select}
            />}

        </React.Fragment>
    );
};

export default AdminPanelCallRequestsPage;
