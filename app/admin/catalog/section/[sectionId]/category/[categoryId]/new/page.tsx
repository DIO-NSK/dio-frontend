"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {
    useAdminPanelNewProductPage
} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/new/page.hooks";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import AdminPanelCharBlock from "@/components/organisms/blocks/admin-panel-char-block/AdminPanelCharBlock";
import {useCharacteristics} from "@/utlis/hooks/useCharacteristics";

// TODO: Сделать красивее

const DefaultInputGrid = () => {

    const {...context} = useAdminPanelNewProductPage()

    const itemsPerRow = 3
    const gridColAmount = Math.ceil(context.inputGridData.length / itemsPerRow)
    const inputRowCN : string = "mx-[-28px] px-7 w-full grid grid-cols-3 gap-7 pb-7 border-b-2 border-light-gray"

    return (
        <>
            {
                Array.from({length: gridColAmount}, (_, rowIndex) =>
                    <div key={rowIndex} className={inputRowCN}>
                        {
                            context.inputGridData
                                .slice(rowIndex * 2, (rowIndex + 1) * 2 + 1)
                                .map((inputData, inputIndex) => {
                                    return rowIndex === 0 && inputIndex === 2 ? <SelectInput
                                        width={"col-span-1"}
                                        label={"Группа товара"}
                                        items={context.dropdown.dropdownItems}
                                        onSelect={context.dropdown.setActiveProductGroup}
                                        selectedItem={context.dropdown.activeProductGroup}
                                        key={inputIndex}
                                    /> : <TextInput
                                        classNames={{wrapper: "col-span-1"}}
                                        placeholder={inputData.placeholder}
                                        labelText={inputData.labelText}
                                        value={inputData.value}
                                        onChange={inputData.onChange}
                                        inputMask={inputData.inputMask}
                                        key={inputIndex}
                                    />
                                })
                        }
                    </div>
                )
            }
        </>
    )
}

const AdminPanelNewProductPage = () => {

    const {...chars} = useCharacteristics()

    return (
        <>
            <HeaderRow
                className={"w-full"}
                theme={"bordered"}
                header={"Новый товар"}
                hasBackIcon
            />
            <DefaultInputGrid/>
            <AdminPanelCharBlock
                onDeleteChar={chars.handlers.handleDeleteChar}
                onChangeChar={chars.handlers.handleChangeChar}
                onAddChar={chars.handlers.handleAddChar}
                chars={chars.state}
            />
        </>
    );

};

export default AdminPanelNewProductPage;
