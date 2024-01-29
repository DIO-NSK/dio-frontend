import React from 'react';
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import {Characteristic} from "@/types/dto/Characteristic";
import HeaderDescrButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescrButtonRow";
import AdminPanelCharRow from "@/components/moleculas/rows/admin-panel-char-row/AdminPanelCharRow";

type AdminPanelCharBlockProps = {
    onChangeChar: (char: Characteristic, index : number) => void,
    onDeleteChar : (index : number) => void,
    onAddChar: () => void,
    chars: Characteristic[],
}

const AdminPanelCharBlock = (props: AdminPanelCharBlockProps) => {
    return (
        <div className={"w-full mx-[-28px] px-7 flex flex-col gap-5 pb-7 border-b-2 border-light-gray"}>

            <HeaderDescrButtonRow
                header={"Дополнительные характеристики"}
                descr={"Данные характеристики будут видны только в карточке товара" +
                    " и не будут учитываться при поиске продукта"}
                button={
                    <Button
                        classNames={{button: "h-fit"}}
                        icon={<FiPlus size={"18px"}/>}
                        buttonType={"SECONDARY"}
                        text={"Добавить ещё"}
                        onClick={props.onAddChar}
                        size={"sm"}
                    />
                }
            />

            <div className={"w-full flex flex-col gap-5"}>
                {
                    props.chars.map((charRow, key) =>
                        <AdminPanelCharRow
                            onDelete={() => props.onDeleteChar(key)}
                            onChange={(char : Characteristic) => props.onChangeChar(char, key)}
                            value={charRow}
                            key={key}
                        />
                    )
                }
            </div>

        </div>
    );

};

export default AdminPanelCharBlock;
