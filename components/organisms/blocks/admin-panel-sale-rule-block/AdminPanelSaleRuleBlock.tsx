import React from 'react';
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import HeaderDescrButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescrButtonRow";
import {
    useAdminPanelSaleRuleBlock
} from "@/components/organisms/blocks/admin-panel-sale-rule-block/AdminPanelSaleRuleBlock.hooks";
import AdminPanelRuleRow from "@/components/moleculas/rows/admin-panel-rule-row/AdminPanelRuleRow";
import AdminPanelBlockWrapper from "@/components/wrappers/admin-panel-block-wrapper/AdminPanelBlockWrapper";

const AdminPanelSaleRuleBlock = () => {

    const {...context} = useAdminPanelSaleRuleBlock()

    return (
        <AdminPanelBlockWrapper>

            <HeaderDescrButtonRow
                header={"Правила для участия в акции"}
                descr={"Введите каждое правило в отдельном поле для того, чтобы информация" +
                    "корректно отображалась у пользователей."}
                button={
                    <Button
                        classNames={{button: "h-fit"}}
                        icon={<FiPlus size={"18px"}/>}
                        buttonType={"SECONDARY"}
                        text={"Добавить ещё"}
                        onClick={context.handleAddRule}
                        size={"sm"}
                    />
                }
            />

            <div className={"w-full flex flex-col gap-5"}>
                {
                    context.rules.map((rule, key) =>
                        <AdminPanelRuleRow
                            value={rule}
                            onChange={(value: string) => context.handleChangeRule(key, value)}
                            onDelete={() => context.handleDeleteRule(key)}
                            key={key}
                        />
                    )
                }
            </div>

        </AdminPanelBlockWrapper>
    );
};

export default AdminPanelSaleRuleBlock;
