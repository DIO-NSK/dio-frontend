"use client"

import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import {useEffect, useState} from "react";
import SearchInput from "@/components/atoms/inputs/search-input/SearchInput";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Text from "@/components/atoms/text/text-base/Text";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import Button from "@/components/atoms/buttons/button/Button";
import CallRequestsContentTable
    from "@/components/organisms/tables/call-requests-content-table/CallRequestsContentTable";
import {callRequestsTableContent, callRequestsTableHeader} from "@/data/tables/adminCallRequestsTable";
import {useSelectable} from "@/utlis/hooks/useSelectable";
import React from "react";
import {useUnit} from "effector-react";
import {
    $callRequests,
    $searchCallRequest,
    CallRequestStatus,
    getCallRequestByStatusEvent, setSearchCallRequestEvent
} from "@/app/admin/call-requests/model";

const AdminPanelCallRequestsPage = () => {

    const [getCallRequestsByStatus, callRequests] = useUnit([getCallRequestByStatusEvent, $callRequests])
    const [searchCallRequest, setSearchCallRequest] = useUnit([$searchCallRequest, setSearchCallRequestEvent])

    const multiselectElements = ["Акутальные", "Архив"]
    const [activeElement, setActiveElement] = useState<string>(multiselectElements[0])

    const defaultSelectableItems = callRequestsTableContent.map(i => i.item)
    const {...selectableContext} = useSelectable(defaultSelectableItems)

    const handleMarkRequestsArchive = () => console.log("Archived")

    useEffect(() => {
        const requestStatus: CallRequestStatus = activeElement === "Актуальные" ? "CURRENT" : "ARCHIVE"
        getCallRequestsByStatus(requestStatus)
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
                />
            </div>

            <HeaderRow
                theme={"bordered"}
                className={"w-full"}
                header={"Заявки на звонок"}
                leftContent={
                    <div className={"w-fit flex flex-row items-baseline gap-4"}>
                        {
                            selectableContext.selectedItems.length > 0 &&
                            <div className={"flex flex-row items-baseline gap-4"}>
                                <Text
                                    text={`Выбрано ${selectableContext.selectedItems.length}`}
                                    className={"text-text-gray"}
                                />
                                <TextButton
                                    onClick={selectableContext.handleRemoveSelectAll}
                                    text={"Отменить выбор"}
                                    className={"text-info-red hover:text-red-700"}
                                />
                            </div>
                        }
                        <TextButton onClick={selectableContext.handleSelectAllItems} text={"Выбрать всё"}/>
                    </div>
                }
                rightContent={
                    <Button
                        onClick={handleMarkRequestsArchive}
                        text={"Поместить в архив"}
                        buttonType={"SECONDARY"}
                        size={"sm"}
                    />
                }
            />

            {callRequests && <CallRequestsContentTable
                tableHeader={callRequestsTableHeader}
                tableContent={callRequestsTableContent}
                onSelect={selectableContext.handleSelectItem}
                selectedItems={selectableContext.selectedItems}
            />}

        </React.Fragment>
    );
};

export default AdminPanelCallRequestsPage;
