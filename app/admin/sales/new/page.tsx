"use client"

import {useAdminPanelNewSalePage} from "@/app/admin/sales/new/page.hooks";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import TextArea from "@/components/atoms/inputs/text-area/TextArea";
import AdminPanelSaleRuleBlock from "@/components/organisms/blocks/admin-panel-sale-rule-block/AdminPanelSaleRuleBlock";
import AdminPanelSearchbarBlock
    from "@/components/organisms/blocks/admin-panel-searchbar-block/AdminPanelSearchbarBlock";
import {useVariableItemRow} from "@/utlis/hooks/useVariableItemRow";
import AdminPanelPhotoBlock from "@/components/organisms/blocks/admin-panel-photo-block/AdminPanelPhotoBlock";

const FirstInputRow = () => {

    const {...context} = useAdminPanelNewSalePage()

    const inputGridData = [
        {
            labelText: "Название акции",
            placeholder: "Введите название акции",
            value: context.nameInput.name,
            onChange: context.nameInput.setName
        }, {
            labelText: "Код акции",
            placeholder: "223 899",
            inputMask: "999 999",
            value: context.codeInput.code,
            onChange: context.codeInput.setCode
        }
    ]

    return (
        <div className={"w-full mx-[-28px] px-7 grid grid-cols-2 gap-7 pb-7 border-b-2 border-light-gray"}>
            {
                inputGridData.map((inputData, key) =>
                    <TextInput
                        placeholder={inputData.placeholder}
                        labelText={inputData.labelText}
                        inputMask={inputData.inputMask}
                        onChange={inputData.onChange}
                        value={inputData.value}
                        key={key}
                    />
                )
            }
        </div>
    )
}

const SecondInputRow = () => {

    const {...context} = useAdminPanelNewSalePage()

    return (
        <div className={"w-full mx-[-28px] px-7 grid grid-cols-2 gap-7 pb-7 border-b-2 border-light-gray"}>
            <SelectInput
                label={"Группа акции"}
                items={context.groupInput.selectItems}
                onSelect={context.groupInput.setActiveSelectItem}
                selectedItem={context.groupInput.activeSelectItem}
                className={"col-span-1"}
            />
            <TextInput
                labelText={"Длительность акции"}
                placeholder={"до 31.12.24"}
                inputMask={"до 99.99.99"}
                onChange={context.durationInput.setDuration}
                value={context.durationInput.duration}
            />
        </div>
    )

}

const AdminPanelNewSalePage = () => {

    const {...context} = useAdminPanelNewSalePage()
    const {...products} = useVariableItemRow<string>("")
    const {...anotherProducts} = useVariableItemRow<string>("")

    return (
        <>
            <HeaderRow
                className={"w-full"}
                theme={"bordered"}
                header={"Новая акция"}
                hasBackIcon
            />

            <FirstInputRow/>
            <SecondInputRow/>
            <TextArea
                labelText={"Описание акции"}
                placeholder={"Придумайте привлекающее описание акции. Идеальная длина описания — 1 предложение."}
                value={context.textArea.description}
                onChange={context.textArea.setDescription}
                classNames={{
                    wrapper: "mx-[-28px] px-7",
                    input: "min-h-[150px] max-h-[220px]"
                }}
            />
            <AdminPanelSaleRuleBlock/>
            <AdminPanelSearchbarBlock
                header={"Товары, участвующие в акции"}
                description={"Данные товары включены в акцию по умолчанию"}
                onAddSearchbar={products.handlers.handleAddItem}
                onChangeSearchbar={products.handlers.handleChangeItem}
                onDeleteSearchbar={products.handlers.handleDeleteItem}
                items={products.state}
            />
            <AdminPanelSearchbarBlock
                header={"Дополнительные товары"}
                description={"Данные товары дополнительно прилагаются к акции." +
                    "Пользователь сможет выбрать один товар  из данного списка"}
                onAddSearchbar={anotherProducts.handlers.handleAddItem}
                onChangeSearchbar={anotherProducts.handlers.handleChangeItem}
                onDeleteSearchbar={anotherProducts.handlers.handleDeleteItem}
                items={anotherProducts.state}
            />
            <AdminPanelPhotoBlock
                photos={context.photoBlock.photos}
                onAddPhoto={context.photoBlock.handleAddPhoto}
                onDeletePhoto={context.photoBlock.handleDeletePhoto}
            />
        </>
    );


};

export default AdminPanelNewSalePage;
