import {useState} from "react";

export const useAdminPanelSalePage = (saleId : number) => {

    const [isEditable, setEditable] = useState<boolean>(false)
    const handleSwitchEditable = () => setEditable(!isEditable)

    return {
        editMode : {isEditable, handleSwitchEditable}
    }

}