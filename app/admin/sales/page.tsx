"use client"

import AdminPanelHeaderButtonRow
    from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow";
import ProductContentTable from "@/components/organisms/tables/product-content-table/ProductContentTable";
import {salesTableHeader} from "@/data/tables/adminSalesTable";
import {
    useAdminPanelHeaderButtonRow
} from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow.hooks";
import AdminPanelHeaderRow from "@/components/organisms/rows/admin-panel-header-row/AdminPanelHeaderRow";
import {useAdminPanelHeaderRow} from "@/components/organisms/rows/admin-panel-header-row/AdminPanelHeaderRow.hooks";
import React, {useEffect, useState} from "react";
import {useUnit} from "effector-react";
import {
    $sales,
    changeSalesOrderEvent,
    changeSalesRowOrder, deleteSaleFx,
    getSalesEvent,
    ResponseShortSale
} from "@/app/admin/sales/model";
import AdminPanelSaveDiscardChangesRow
    from "@/components/organisms/rows/admin-panel-save-discard-changes-row/AdminPanelSaveDiscardChangesRow";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {AdminSale} from "@/types/dto/AdminSale";
import {ProductTableRow} from "@/types/dto/Table";
import {usePathname, useRouter} from "next/navigation";
import DeletePopup from "@/components/organisms/popups/admin/delete-popup/DeletePopup";
import {PopupProps} from "@/types/props/Popup";
import Text from "@/components/atoms/text/text-base/Text";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";

type DeleteAdminSalePopupProps = {
    tableRow: ProductTableRow<ResponseShortSale>
} & PopupProps

const DeleteAminSalePopup = (props: DeleteAdminSalePopupProps) => {

    const deleteSale = useUnit(deleteSaleFx)
    const handleDeleteSale = () => deleteSale(props.tableRow.id).then(props.onClose)

    return (
        <PopupWrapper placement={"center"} {...props}>
            <div className={"w-[500px] flex flex-col gap-5"}>

                <div className={"flex flex-row items-baseline gap-3"}>
                    <Text text={"Удалить акцию"} className={"text-[20px] font-medium"}/>
                    <Text text={props.tableRow.item.name} className={"text-text-gray"}/>
                </div>

                <Text text={"Предупреждаем, это действие невозможно отменить."}/>

                <Button
                    classNames={{button: "bg-info-red sm:hover:bg-red-700"}}
                    onClick={handleDeleteSale}
                    text={"Я понимаю и хочу удалить акцию"}
                />

            </div>
        </PopupWrapper>
    )

}

const AdminPanelSalesPage = () => {

    const router = useRouter()
    const pathname = usePathname()

    const changeOrder = useUnit(changeSalesRowOrder)
    const [sales, getSales] = useUnit([$sales, getSalesEvent])

    const headerContext = useAdminPanelHeaderButtonRow()

    const [saleIdToDelete, setSaleIdToDelete] = useState<ProductTableRow<ResponseShortSale> | null>(null)

    const handleEditSale = (tableRow: ProductTableRow<ResponseShortSale>) => router.push(pathname.concat(`/${tableRow.id}/edit`))

    useEffect(() => {
        getSales()
    }, [])

    return (
        <React.Fragment>
            {saleIdToDelete && <DeleteAminSalePopup
                onClose={() => setSaleIdToDelete(null)}
                tableRow={saleIdToDelete}
            />}
            <AdminPanelHeaderButtonRow
                searchInputOnChange={headerContext.searchbar.setSearchValue}
                searchInputValue={headerContext.searchbar.searchValue}
                onAddNewItem={headerContext.handleAddItem}
            />
            <HeaderRow
                className={"w-full"}
                theme={"bordered"}
                header={"Акции"}
            />
            <ProductContentTable
                onDragEnd={changeOrder}
                tableHeader={salesTableHeader}
                tableContent={sales}
                onDelete={(productRow) => setSaleIdToDelete(productRow as ProductTableRow<ResponseShortSale>)}
                onEdit={(productRow) => handleEditSale(productRow as ProductTableRow<ResponseShortSale>)}
                isDraggable={true}
            />
        </React.Fragment>
    );
};

export default AdminPanelSalesPage;
