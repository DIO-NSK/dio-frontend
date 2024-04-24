"use client"

import LineChart from "@/components/organisms/charts/LineChart";
import React, {useEffect} from "react";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {useAdminPanelAnalyticsPage} from "@/app/admin/page.hooks";
import Button from "@/components/atoms/buttons/button/Button";
import {FiShoppingBag, FiUpload} from "react-icons/fi";
import {useUnit} from "effector-react";
import {$orders, getOrdersEvent} from "@/app/admin/orders/model";
import OrderContentTable from "@/components/organisms/tables/order-content-table/OrderContentTable";
import {adminOrdersTableHeader} from "@/data/tables/adminOrdersTable";
import {$graphVisitPoints, $orderGraphPoints, getOrdersGraphEvent, getVisitPointsEvent} from "@/app/admin/model";
import dayjs from "dayjs";
import moment from "moment";

const AdminPanelAnalyticsPage = () => {

    const {...context} = useAdminPanelAnalyticsPage()

    const [graphVisitPoints, getGraphVisitPoints] = useUnit([$graphVisitPoints, getVisitPointsEvent])
    const [orderGraphPoints, getOrderGraphPoints] = useUnit([$orderGraphPoints, getOrdersGraphEvent])
    const [orders, getOrders] = useUnit([$orders, getOrdersEvent])

    const endDate = dayjs(Date.now()).format("YYYY-MM-DD")
    const beginDate = moment(Date.now()).subtract(1,'months').format('YYYY-MM-DD')

    useEffect(() => {
        getGraphVisitPoints({beginDate: beginDate, endDate: endDate})
        getOrderGraphPoints({beginDate: beginDate, endDate: endDate})
        getOrders()
    }, [])

    return (
        <React.Fragment>
            <HeaderRow
                theme={"bordered"}
                className={"w-full"}
                header={"Аналитика"}
                rightContent={
                    <div className={"flex flex-row items-center gap-5"}>
                        <Button
                            text={"Сгенерировать фид"}
                            onClick={context.handlers.handleGenerateFeed}
                            icon={<FiShoppingBag size={"18px"}/>}
                            buttonType={"SECONDARY"}
                            size={"sm"}
                        />
                        <Button
                            text={"Экспортировать базу данных"}
                            onClick={context.handlers.handleExportDatabase}
                            icon={<FiUpload size={"18px"}/>}
                            buttonType={"SECONDARY"}
                            size={"sm"}
                        />
                    </div>
                }
            />
            <div className={"w-full mx-[-28px] px-7 grid grid-cols-8 gap-7"}>
                {orderGraphPoints && <LineChart
                    name={"История заказов"}
                    className={"col-span-4"}
                    graphPoints={orderGraphPoints}
                />}
                {graphVisitPoints && <LineChart
                    name={"История посещений"}
                    className={"col-span-4"}
                    graphPoints={graphVisitPoints}
                />}
            </div>
            <HeaderRow
                theme={"bordered"}
                className={"w-full"}
                header={"Последние заказы"}
                rightContent={
                    <Button
                        text={"Смотреть все"}
                        onClick={context.handlers.handleViewAllOrders}
                        buttonType={"SECONDARY"}
                        size={"sm"}
                    />
                }
            />
            {orders && <OrderContentTable
                onClick={context.handlers.handleClickTableRow}
                tableHeader={adminOrdersTableHeader}
                tableContent={orders}
                maxItems={5}
            />}
        </React.Fragment>
    );

};

export default AdminPanelAnalyticsPage;
