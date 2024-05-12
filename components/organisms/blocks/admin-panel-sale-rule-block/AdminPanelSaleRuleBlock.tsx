import React, {useEffect} from 'react';
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import HeaderDescriptionButtonRow from "@/components/organisms/rows/header-descr-button-row/HeaderDescriptionButtonRow";
import AdminPanelRuleRow from "@/components/moleculas/rows/admin-panel-rule-row/AdminPanelRuleRow";
import AdminPanelBlockWrapper from "@/components/wrappers/admin-panel-block-wrapper/AdminPanelBlockWrapper";
import {useFieldArray, useFormContext} from "react-hook-form";
import {CreateSaleData} from "@/schemas/admin/CreateSaleSchema";

const AdminPanelSaleRuleBlock = () => {

    const {control, reset} = useFormContext<CreateSaleData>()
    const {fields, append, remove}
        = useFieldArray({control, name: "ruleList"})

    useEffect(() => {
        reset({ruleList: [{rule : ""}]})
    }, []);

    return (
        <AdminPanelBlockWrapper className={"mx-0 px-7"}>
            <HeaderDescriptionButtonRow
                header={"Правила для участия в акции"}
                descr={"Введите каждое правило в отдельном поле для того, чтобы информация" +
                    "корректно отображалась у пользователей."}
                button={
                    <Button
                        onClick={() => append({rule : ""})}
                        classNames={{button: "h-fit"}}
                        icon={<FiPlus size={"18px"}/>}
                        buttonType={"SECONDARY"}
                        text={"Добавить ещё"}
                        size={"sm"}
                    />
                }
            />
            <section className={"w-full flex flex-col gap-5"}>
                {fields.map((rule, key) =>
                    <AdminPanelRuleRow
                        name={`ruleList.${key}.rule`}
                        onDelete={() => remove(key)}
                        key={rule.id}
                    />
                )}
            </section>

        </AdminPanelBlockWrapper>
    );
};

export default AdminPanelSaleRuleBlock;
