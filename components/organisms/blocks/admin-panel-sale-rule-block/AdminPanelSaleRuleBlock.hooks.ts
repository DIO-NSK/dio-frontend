import {useState} from "react";

const MIN_LENGTH = 1

export const useAdminPanelSaleRuleBlock = () => {

    const [rules, setRules] = useState<string[]>([""])
    const handleAddRule = () => setRules([...rules, ""])
    const handleDeleteRule = (indexToDelete: number) => {
        if (rules.length !== MIN_LENGTH) {
            const filteredRules = rules.filter((_, index) => index !== indexToDelete)
            setRules(filteredRules)
        }
    }
    const handleChangeRule = (indexToChange: number, value: string) => {
        setRules(rules => rules.map((rule, index) => {
            return index !== indexToChange ? rule : value
        }))
    }

    return {
        handleAddRule, handleDeleteRule,
        handleChangeRule, rules
    }

}