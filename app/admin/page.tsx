"use client"

import LineChart from "@/components/organisms/charts/LineChart";
import {adminOrderTableContent} from "@/data/tables/adminOrdersTable";
import React from "react";
import {adminAnalyticsTableHeader} from "@/data/tables/adminAnalyticsTable";
import AnalyticContentTable from "@/components/organisms/tables/analytic-content-table/AnalyticContentTable";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {useAdminPanelAnalyticsPage} from "@/app/admin/page.hooks";
import Button from "@/components/atoms/buttons/button/Button";
import {FiShoppingBag, FiUpload} from "react-icons/fi";

const AdminPanelAnalyticsPage = () => {

    const {...context} = useAdminPanelAnalyticsPage()

    return (
        <>
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
                <LineChart className={"col-span-4"}/>
                <LineChart className={"col-span-4"}/>
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
            <AnalyticContentTable
                tableHeader={adminAnalyticsTableHeader}
                tableContent={adminOrderTableContent}
                onClick={context.handlers.handleClickTableRow}
            />
        </>
    );
};

export default AdminPanelAnalyticsPage;
