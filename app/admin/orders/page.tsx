"use client"

import AdminPanelOrderHeader from "@/components/organisms/rows/admin-panel-order-header/AdminPanelOrderHeader";
import React from "react";
import OrderContentTable from "@/components/organisms/tables/order-content-table/OrderContentTable";
import {adminOrdersTableHeader, adminOrderTableContent} from "@/data/tables/adminOrdersTable";
import {useSelectable} from "@/utlis/hooks/useSelectable";
import {AdminOrder} from "@/types/dto/AdminOrder";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Text from "@/components/atoms/text/text-base/Text";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import {useAdminPanelOrdersPage} from "@/app/admin/orders/page.hooks";

const AdminPanelOrderPage = () => {

    const defaultItems = adminOrderTableContent.map(i => i.item)
    const {...context} = useAdminPanelOrdersPage()
    const {...selectableContext} = useSelectable<AdminOrder>(defaultItems)

    return (
        <>
            <AdminPanelOrderHeader/>
            <HeaderRow
                theme={"bordered"}
                className={"w-full"}
                header={"Заказы"}
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
                        <TextButton
                            onClick={selectableContext.handleSelectAllItems}
                            text={"Выбрать всё"}
                        />
                    </div>
                }
                rightContent={
                    <MultiselectButton
                        size={"sm"} className={"w-[500px]"}
                        activeElement={context.multiselectButton.activeItem}
                        selectElement={context.multiselectButton.setActiveItem}
                        elements={context.multiselectButton.multiselectData}
                    />
                }
            />
            <OrderContentTable
                tableHeader={adminOrdersTableHeader}
                tableContent={adminOrderTableContent}
                onSelect={selectableContext.handleSelectItem}
                selectedItems={selectableContext.selectedItems}
                onClick={context.handleRowClick}
            />
        </>
    );

};

export default AdminPanelOrderPage;
