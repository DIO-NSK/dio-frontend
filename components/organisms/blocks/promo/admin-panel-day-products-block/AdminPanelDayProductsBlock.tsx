import React from 'react';
import HeaderDescriptionButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescriptionButtonRow";
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus, FiTrash2} from "react-icons/fi";
import {useToggle} from "@/utlis/hooks/useToggle";
import OrderPageAddDayProductPopup
    from "@/components/organisms/popups/admin/order-page-add-day-product-popup/OrderPageAddDayProductPopup";
import ProductContentTable from "@/components/organisms/tables/product-content-table/ProductContentTable";
import {adminDayProductTableHeader} from "@/data/tables/adminProductTable";
import {
    useAdminPanelProductsBlock
} from "@/components/organisms/blocks/promo/admin-panel-day-products-block/AdminPanelDayProductsBlock.model";

const AdminPanelDayProductsBlock = () => {

    const toggle = useToggle()
    const context = useAdminPanelProductsBlock()

    return (
        <React.Fragment>
            {toggle.state && <OrderPageAddDayProductPopup
                onClose={toggle.toggleState}
            />}
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
                    isDraggable={true}
                    onProductClick={() => console.log("Click")}
                    tableHeader={adminDayProductTableHeader}
                    //@ts-ignore
                    tableContent={context.tableContent}
                    onDelete={context.handleDelete}
                    overrideTooltip={
                        <FiTrash2
                            className={"hover:text-red-700 text-info-red"}
                            size={"18px"}
                        />
                    }
                />

            </div>
        </React.Fragment>
    );
};

export default AdminPanelDayProductsBlock;
