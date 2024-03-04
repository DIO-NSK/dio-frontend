import React from 'react';
import AdminPanelBlockWrapper from "@/components/wrappers/admin-panel-block-wrapper/AdminPanelBlockWrapper";
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import HeaderDescriptionButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescriptionButtonRow";
import DraggableRowWrapper from "@/components/wrappers/draggable-row-wrapper/DraggableRowWrapper";
import SearchInput from "@/components/atoms/inputs/search-input/SearchInput";
import {VariableBlock} from "@/types/props/VariableBlock";

type AdminPanelSearchbarBlockProps = {
    header: string,
    description: string
} & VariableBlock<string>

const AdminPanelSearchbarBlock = (props: AdminPanelSearchbarBlockProps) => {

    return (
        <AdminPanelBlockWrapper>

            <HeaderDescriptionButtonRow
                header={props.header}
                descr={props.description}
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

            <div className={"w-full flex flex-col gap-5"}>
                {
                    props.items.map((item, key) =>
                        <DraggableRowWrapper onDelete={() => props.onDeleteItem(key)}>
                            <SearchInput
                                classNames={{input : "py-5 bg-bg-light-blue"}}
                                placeholder={"Введите название товара"}
                                value={item}
                                onChange={(value: string) => props.onChangeItem(key, value)}
                                key={key}
                            />
                        </DraggableRowWrapper>
                    )
                }
            </div>

        </AdminPanelBlockWrapper>
    );

};

export default AdminPanelSearchbarBlock;
