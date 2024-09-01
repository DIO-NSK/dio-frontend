"use client"

import AdminPanelOrderHeader from "@/components/organisms/rows/admin-panel-order-header/AdminPanelOrderHeader";
import React, {useEffect} from "react";
import {adminOrdersTableHeader} from "@/data/tables/adminOrdersTable";
import {useSelectable} from "@/utlis/hooks/useSelectable";
import {AdminOrder} from "@/types/dto/AdminOrder";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Text from "@/components/atoms/text/text-base/Text";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import {useAdminPanelOrdersPage} from "@/app/admin/orders/page.hooks";
import {useUnit} from "effector-react";
import {$orders} from "@/app/admin/orders/model";
import dynamic from "next/dynamic";
import Loading from "@/components/mobile/loading/Loading";
import {$ordersLength, filterOrdersEvent} from "@/components/organisms/popups/admin/order-page-filter-popup/model";
import OrderPagination from "@/components/moleculas/pagination/OrderPagination";
import {useSearchParams} from "next/navigation";

const OrderContentTable = dynamic(
    () => import("@/components/organisms/tables/order-content-table/OrderContentTable"),
    {loading: () => <Loading/>}
)

const AdminPanelOrderPage = () => {

    const searchParams = useSearchParams();
    const page = searchParams.get('page');

    const [orders, ordersLength , getOrders] = useUnit([$orders, $ordersLength, filterOrdersEvent])

    const {...context} = useAdminPanelOrdersPage()
    const {...selectableContext} = useSelectable<AdminOrder>([])

    useEffect(() => {
        console.log(page);
        const pageNumber = page ? Number(page) - 1 : 0;
        getOrders({page : pageNumber})
    }, [ page ]);

    return (
        <React.Fragment>
            <AdminPanelOrderHeader/>
            <HeaderRow
                theme={"bordered"}
                className={"w-full"}
                header={"Заказы"}
                leftContent={
                    <div className={"w-fit flex flex-row items-baseline gap-4"}>
                        {selectableContext.selectedItems.length > 0 &&
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
                            </div>}
                        <TextButton
                            onClick={selectableContext.handleSelectAllItems}
                            text={"Выбрать всё"}
                        />
                    </div>
                }
                rightContent={
                    <MultiselectButton
                        size={"sm"} className={"w-[860px]"}
                        activeElement={context.multiselectButton.activeItem}
                        selectElement={context.multiselectButton.setActiveItem}
                        elements={context.multiselectButton.multiselectData}
                    />
                }
            />
            {orders ? <OrderContentTable
                tableHeader={adminOrdersTableHeader}
                onSelect={selectableContext.handleSelectItem}
                onClick={context.handleRowClick}
                tableContent={orders}
                selectedItems={[]}
            /> : null}
            <OrderPagination itemsLength={ordersLength}/>
        </React.Fragment>
    );

};

export default AdminPanelOrderPage;
