"use client"

import LineChart from "@/components/organisms/charts/LineChart";
import React, {useEffect, useState} from "react";
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
import {CalendarValue} from "@/components/moleculas/calendar/Calendar";

const AdminPanelAnalyticsPage = () => {

    const {...context} = useAdminPanelAnalyticsPage()

    const [graphVisitPoints, getGraphVisitPoints] = useUnit([$graphVisitPoints, getVisitPointsEvent])
    const [orderGraphPoints, getOrderGraphPoints] = useUnit([$orderGraphPoints, getOrdersGraphEvent])
    const [orders, getOrders] = useUnit([$orders, getOrdersEvent])

    const endDate = dayjs(Date.now()).format("YYYY-MM-DD")
    const beginDate = moment(Date.now()).subtract(1, 'months').format('YYYY-MM-DD')

    const [visitRange, setVisitRange] = useState<CalendarValue>([])
    const [ordersRange, setOrdersRange] = useState<CalendarValue>([])

    useEffect(() => {
        getGraphVisitPoints({beginDate: beginDate, endDate: endDate})
        getOrderGraphPoints({beginDate: beginDate, endDate: endDate})
        getOrders()
    }, [])

    useEffect(() => {
        if (visitRange) {
            const [from, to] = visitRange.map(date => dayjs(date).format("YYYY-MM-DD"))
            getGraphVisitPoints({beginDate: from, endDate: to})
        } else {
            getGraphVisitPoints({beginDate: beginDate, endDate: endDate})
        }
    }, [visitRange])

    useEffect(() => {
        if (ordersRange) {
            const [from, to] = ordersRange.map(date => dayjs(date).format("YYYY-MM-DD"))
            getOrderGraphPoints({beginDate: from, endDate: to})
        } else {
            getOrderGraphPoints({beginDate: beginDate, endDate: endDate})
        }
    }, [ordersRange])

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
                            disabled={true} hasSpinner={false}
                            onClick={context.handlers.handleGenerateFeed}
                            icon={<FiShoppingBag size={"18px"}/>}
                            buttonType={"SECONDARY"}
                            size={"sm"}
                        />
                        <Button
                            text={"Экспортировать базу данных"}
                            disabled={true} hasSpinner={false}
                            onClick={context.handlers.handleExportDatabase}
                            icon={<FiUpload size={"18px"}/>}
                            buttonType={"SECONDARY"}
                            size={"sm"}
                        />
                    </div>
                }
            />
            <div className={"px-7 w-full grid grid-cols-8 gap-7"}>
                {orderGraphPoints && <LineChart
                    name={"История заказов"}
                    className={"col-span-4"}
                    graphPoints={orderGraphPoints}
                    onChange={setOrdersRange}
                    value={ordersRange}
                />}
                {graphVisitPoints && <LineChart
                    name={"История посещений"}
                    className={"col-span-4"}
                    graphPoints={graphVisitPoints}
                    onChange={setVisitRange}
                    value={visitRange}
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
