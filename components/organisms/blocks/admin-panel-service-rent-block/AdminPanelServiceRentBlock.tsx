import React from 'react';
import {VariableBlock} from "@/types/props/VariableBlock";
import {CategoryRent} from "@/types/dto/CategoryRent";
import AdminPanelBlockWrapper from "@/components/wrappers/admin-panel-block-wrapper/AdminPanelBlockWrapper";
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import HeaderDescrButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescrButtonRow";
import AdminPanelRentRow from "@/components/moleculas/rows/admin-panel-rent-row/AdminPanelRentRow";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

const AdminPanelServiceRentBlock = (props: VariableBlock<CategoryRent>) => {
    return (
        <AdminPanelBlockWrapper>

            <HeaderDescrButtonRow
                header={"Стоимость аренды"}
                descr={"Введите название категории в поле ниже и измените для него стоимость аренды"}
                button={
                    <Button
                        classNames={{button: "h-fit"}}
                        icon={<FiPlus size={"18px"}/>}
                        buttonType={"SECONDARY"}
                        text={"Добавить ещё"}
                        onClick={props.onAddItem}
                        size={"sm"}
                    />
                }
            />

            <div className={"w-full flex flex-col gap-7"}>
                {
                    props.items.map((categoryRent, key, array) => {

                        const blockCV: ClassValue = {"pb-7 border-b-2 border-light-gray": key !== array.length - 1}

                        return <AdminPanelRentRow
                            item={categoryRent}
                            onChange={(categoryRent: CategoryRent) => props.onChangeItem(key, categoryRent)}
                            onDelete={() => props.onDeleteItem(key)}
                            className={cn(blockCV)}
                        />

                    })
                }
            </div>

        </AdminPanelBlockWrapper>
    );
};

export default AdminPanelServiceRentBlock;
