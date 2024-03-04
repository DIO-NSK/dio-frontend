import React, {useEffect, useState} from 'react';
import HeaderDescriptionButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescriptionButtonRow";
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import {useToggle} from "@/utlis/hooks/useToggle";
import {ProductTableRow} from "@/types/dto/Table";
import {AdminProduct} from "@/types/dto/AdminProduct";
import OrderPageAddDayProductPopup
    from "@/components/organisms/popups/admin/order-page-add-day-product-popup/OrderPageAddDayProductPopup";
import ProductContentTable from "@/components/organisms/tables/product-content-table/ProductContentTable";
import {adminProductRow, adminProductTableHeader} from "@/data/tables/adminProductTable";

const AdminPanelDayProductsBlock = () => {

    const {...toggle} = useToggle()

    const [products, setProducts] = useState<AdminProduct[]>([])
    const handleAddProduct = (product: AdminProduct) => setProducts([...products, product])
    const handleDeleteProduct = (indexToDelete: number) => {
        const filteredProducts = products.filter((_, index) => index !== indexToDelete)
        setProducts(filteredProducts)
    }

    const [
        tableRows,
        setTableRows
    ] = useState<ProductTableRow<AdminProduct>[]>([])

    useEffect(() => {
        const tableRows = products.map(_ => adminProductRow)
        setTableRows(tableRows)
    }, [products])

    return (
        <>
            {
                toggle.state && <OrderPageAddDayProductPopup
                    onAddItem={handleAddProduct}
                    onClose={toggle.toggleState}
                />
            }
            <div className={"flex flex-col gap-7"}>

                <HeaderDescriptionButtonRow
                    button={
                        <Button
                            size={"sm"} buttonType={"SECONDARY"}
                            icon={<FiPlus size={"18px"}/>}
                            onClick={toggle.toggleState}
                            text={"Добавить"}
                        />
                    }
                    descr={"Вы можете изменить расположение товаров дня в слайдере в режиме редактирования"}
                    header={"Товары дня"}
                    className={"w-full mx-[-28px] px-7 pb-7 border-b-2 border-light-gray"}
                />

                <ProductContentTable
                    onProductClick={() => console.log("Click")}
                    tableHeader={adminProductTableHeader}
                    tableContent={tableRows}
                />

            </div>
        </>
    );
};

export default AdminPanelDayProductsBlock;
