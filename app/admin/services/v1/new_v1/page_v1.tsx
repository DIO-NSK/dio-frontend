"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import AdminPanelBlockWrapper from "@/components/wrappers/admin-panel-block-wrapper/AdminPanelBlockWrapper";
import {useAdminPanelNewServicePage} from "@/app/admin/services/v1/new_v1/page.hooks";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import {useVariableItemRow} from "@/utlis/hooks/useVariableItemRow";
import {CategoryRent} from "@/types/dto/CategoryRent";
import AdminPanelServiceRentBlock
    from "@/components/organisms/blocks/admin-panel-service-rent-block/AdminPanelServiceRentBlock";
import Button from "@/components/atoms/buttons/button/Button";

const FirstRow = () => {

    const {...context} = useAdminPanelNewServicePage()

    return (
        <AdminPanelBlockWrapper className={"flex flex-row items-center"}>
            {
                context.inputGridData.map((inputData, key) =>
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
            <SelectInput
                selectedItem={context.selectInput.activeSelectItem}
                onSelect={context.selectInput.setActiveSelectItem}
                items={context.selectInput.selectItems}
                labelText={"Группа товара"}
            />
        </AdminPanelBlockWrapper>
    )
}

const AdminPanelNewServicePage = () => {

    const defaultCategoryRent: CategoryRent = {
        category: "",
        rent: {
            "day": "", "month": "",
            "half_year": "", "year": ""
        }
    }

    const {...context} = useAdminPanelNewServicePage()
    const {...categoryRents} = useVariableItemRow<CategoryRent>(defaultCategoryRent)

    return (
        <>
            <HeaderRow
                className={"w-full"}
                theme={"bordered"}
                header={"Новая услуга"}
                hasBackIcon
            />
            <FirstRow/>
            <AdminPanelServiceRentBlock
                onAddItem={categoryRents.handlers.handleAddItem}
                onChangeItem={categoryRents.handlers.handleChangeItem}
                onDeleteItem={categoryRents.handlers.handleDeleteItem}
                items={categoryRents.state}
            />
            <Button
                text={"Сохранить"}
                onClick={context.handleSaveChanges}
                classNames={{button : "w-[250px]"}}
            />
        </>
    );

};

export default AdminPanelNewServicePage;
