import React, {useState} from 'react';
import {Tooltip} from "@mui/joy";
import Text from "@/components/atoms/text/text-base/Text";
import {FiEdit, FiTrash2} from "react-icons/fi";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import ChangeSectionNamePopup
    from "@/components/organisms/popups/admin/change-section-name-popup/ChangeSectionNamePopup";
import {TooltipProps} from "@/types/props/Tooltip";
import DeleteSectionPopup from "@/components/organisms/popups/admin/delete-section-popup/DeleteSectionPopup";

const EditDeleteTooltip = ({tableItem, children}: TooltipProps) => {

    const [isEditPopupOpen, setEditPopupOpen] = useState<boolean>(false)
    const [isDeletePopupOpen, setDeletePopupOpen] = useState<boolean>(false)

    const handleSwitchEditPopupState = () => setEditPopupOpen(!isEditPopupOpen)
    const handleSwitchDeletePopupState = () => setDeletePopupOpen(!isDeletePopupOpen)

    const rowCV: ClassValue[] = [
        "w-full flex flex-row items-center gap-3 text-text-gray",
        "hoverable hover:text-black pointer"
    ]

    return (
        <>
            {
                isEditPopupOpen && <ChangeSectionNamePopup
                    onClose={handleSwitchEditPopupState}
                    tableItem={tableItem}
                />
            }
            {
                isDeletePopupOpen && <DeleteSectionPopup
                    onClose={handleSwitchDeletePopupState}
                    tableItem={tableItem}
                />
            }
            <Tooltip
                size={"lg"}
                variant={"outlined"}
                sx={{
                    border: "none",
                    borderRadius: "10px",
                    backgroundColor: "#FFFFFF"
                }}
                title={
                    <div className={"flex flex-col gap-5 p-3"}>
                        <div className={cn(rowCV)} onClick={handleSwitchEditPopupState}>
                            <FiEdit size={"18px"}/>
                            <Text text={"Изменить название"}/>
                        </div>
                        <div className={cn(rowCV, "hover:text-red-700 text-info-red")}
                             onClick={handleSwitchDeletePopupState}
                        >
                            <FiTrash2 size={"18px"}/>
                            <Text text={"Удалить"}/>
                        </div>
                    </div>
                }
                placement={"bottom-end"}
            >
                <div className={"absolute pointer top-1/3 right-7"}>
                    {children}
                </div>
            </Tooltip>
        </>
    );

};

export default EditDeleteTooltip;
