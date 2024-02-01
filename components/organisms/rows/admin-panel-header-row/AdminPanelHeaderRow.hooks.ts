import {useState} from "react";

export const useAdminPanelHeaderRow = () => {

    const [isEditable, setEditable] = useState<boolean>(false)
    const handleSwitchEditable = () => setEditable(!isEditable)

    return {
        isEditable, handleSwitchEditable
    }

}