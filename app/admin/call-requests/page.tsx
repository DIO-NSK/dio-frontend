"use client"

import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import {useState} from "react";
import SearchInput from "@/components/atoms/inputs/search-input/SearchInput";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Text from "@/components/atoms/text/text-base/Text";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import Button from "@/components/atoms/buttons/button/Button";
import CallRequestsContentTable
    from "@/components/organisms/tables/call-requests-content-table/CallRequestsContentTable";
import {callRequestsTableContent, callRequestsTableHeader} from "@/data/tables/adminCallRequestsTable";
import {CallRequest} from "@/types/dto/CallRequest";

const AdminPanelCallRequestsPage = () => {

    const multiselectElements = ["Акутальные", "Архив"]
    const [activeElement, setActiveElement] = useState<string>(multiselectElements[0])

    const [searchValue, setSearchValue] = useState<string>("")

    const [
        selectedItems,
        setSelectedItems
    ] = useState<CallRequest[]>([])

    const handleSelectItem = (callRequest: CallRequest) => {
        const itemToDelete = selectedItems.find((item) => item === callRequest)
        if (itemToDelete) setSelectedItems(state => state.filter((item) => item !== callRequest))
        else setSelectedItems(state => [...state, callRequest])
    }
    const handleSelectAllRequests = () => {
        const selectedItems = callRequestsTableContent.map((tableRow) => tableRow.item)
        setSelectedItems(selectedItems)
    }
    const handleRemoveSelectAll = () => setSelectedItems([])

    const handleMarkRequestsArchive = () => console.log("Archived")

    return (
        <>

            <div className={"w-full mx-[-28px] px-7 grid grid-cols-8 gap-5"}>
                <MultiselectButton
                    activeElement={activeElement}
                    selectElement={setActiveElement}
                    elements={multiselectElements}
                    className={"col-span-3"}
                />
                <SearchInput
                    classNames={{wrapper: "col-span-5"}}
                    placeholder={"Поиск заявок"}
                    onChange={setSearchValue}
                    value={searchValue}
                />
            </div>

            <HeaderRow
                theme={"bordered"}
                className={"w-full"}
                header={"Заявки на звонок"}
                leftContent={
                    <div className={"w-fit flex flex-row items-baseline gap-4"}>
                        {
                            selectedItems.length > 0 && <div className={"flex flex-row items-baseline gap-4"}>
                                <Text
                                    text={`Выбрано ${selectedItems.length}`}
                                    className={"text-text-gray"}
                                />
                                <TextButton
                                    onClick={handleRemoveSelectAll}
                                    text={"Отменить выбор"}
                                    className={"text-info-red hover:text-red-700"}
                                />
                            </div>
                        }
                        <TextButton onClick={handleSelectAllRequests} text={"Выбрать всё"}/>
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

            <CallRequestsContentTable
                tableHeader={callRequestsTableHeader}
                tableContent={callRequestsTableContent}
                onSelect={handleSelectItem}
                selectedItems={selectedItems}
            />

        </>
    );
};

export default AdminPanelCallRequestsPage;
