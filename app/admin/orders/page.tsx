"use client";

import { $orders } from "@/app/admin/orders/model";
import { useAdminPanelOrdersPage } from "@/app/admin/orders/page.hooks";
import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import Loading from "@/components/mobile/loading/Loading";
import OrderPagination from "@/components/moleculas/pagination/OrderPagination";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import { $ordersLength, filterOrdersEvent } from "@/components/organisms/popups/admin/order-page-filter-popup/model";
import AdminPanelOrderHeader from "@/components/organisms/rows/admin-panel-order-header/AdminPanelOrderHeader";
import { adminOrdersTableHeader } from "@/data/tables/adminOrdersTable";
import { AdminOrder } from "@/types/dto/AdminOrder";
import { useSelectable } from "@/utlis/hooks/useSelectable";
import { useUnit } from "effector-react";
import dynamic from "next/dynamic";
import React from "react";

const OrderContentTable = dynamic(() => import("@/components/organisms/tables/order-content-table/OrderContentTable"), {
  loading: () => <Loading />,
});

const AdminPanelOrderPage = () => {
  const [orders, ordersLength, getOrders] = useUnit([$orders, $ordersLength, filterOrdersEvent]);

  const { ...context } = useAdminPanelOrdersPage();
  const { ...selectableContext } = useSelectable<AdminOrder>([]);

  return (
    <React.Fragment>
      <AdminPanelOrderHeader />
      <HeaderRow
        theme={"bordered"}
        className={"w-full"}
        header={"Заказы"}
        rightContent={
          <MultiselectButton
            size={"sm"}
            className={"w-[860px]"}
            activeElement={context.multiselectButton.activeItem}
            selectElement={context.multiselectButton.setActiveItem}
            elements={context.multiselectButton.multiselectData}
          />
        }
      />
      {orders ? (
        <OrderContentTable
          tableHeader={adminOrdersTableHeader}
          onSelect={selectableContext.handleSelectItem}
          onClick={context.handleRowClick}
          tableContent={orders}
          selectedItems={[]}
        />
      ) : null}
      <OrderPagination itemsLength={ordersLength} />
    </React.Fragment>
  );
};

export default AdminPanelOrderPage;
