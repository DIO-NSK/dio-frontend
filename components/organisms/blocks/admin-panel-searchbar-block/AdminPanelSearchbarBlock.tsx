import React from 'react';
import AdminPanelBlockWrapper from "@/components/wrappers/admin-panel-block-wrapper/AdminPanelBlockWrapper";
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import HeaderDescrButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescrButtonRow";
import DraggableRowWrapper from "@/components/wrappers/draggable-row-wrapper/DraggableRowWrapper";
import SearchInput from "@/components/atoms/inputs/search-input/SearchInput";

type AdminPanelSearchbarBlockProps = {
    header: string,
    description: string,
    onAddSearchbar: () => void,
    onChangeSearchbar: (index: number, value: string) => void,
    onDeleteSearchbar: (index: number) => void,
    items: string[]
}

const AdminPanelSearchbarBlock = (props: AdminPanelSearchbarBlockProps) => {

    return (
        <AdminPanelBlockWrapper>

            <HeaderDescrButtonRow
                header={props.header}
                descr={props.description}
                button={
                    <Button
                        classNames={{button: "h-fit"}}
                        icon={<FiPlus size={"18px"}/>}
                        buttonType={"SECONDARY"}
                        text={"Добавить ещё"}
                        onClick={props.onAddSearchbar}
                        size={"sm"}
                    />
                }
            />

            <div className={"w-full flex flex-col gap-5"}>
                {
                    props.items.map((item, key) =>
                        <DraggableRowWrapper onDelete={() => props.onDeleteSearchbar(key)}>
                            <SearchInput
                                classNames={{input : "py-5 bg-bg-light-blue"}}
                                placeholder={"Введите название товара"}
                                value={item}
                                onChange={(value: string) => props.onChangeSearchbar(key, value)}
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
