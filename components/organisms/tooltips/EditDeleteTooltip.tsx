
import React from "react"
import {Tooltip} from "@mui/joy";
import Text from "@/components/atoms/text/text-base/Text";
import {FiEdit, FiTrash2} from "react-icons/fi";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {TooltipProps} from "@/types/props/Tooltip";

const EditDeleteTooltip = ({
                               tableRow,
                               children,
                               ...props
                           }: TooltipProps<string[]>) => {
    const rowCV: ClassValue[] = [
        "w-full flex flex-row items-center gap-3 text-text-gray",
        "hoverable hover:text-black pointer",
    ];

    return (
        <React.Fragment>
            <Tooltip
                size={"lg"}
                variant={"outlined"}
                sx={{
                    border: "none",
                    borderRadius: "10px",
                    backgroundColor: "#FFFFFF",
                }}
                title={
                    <div className={"flex flex-col gap-5 p-3"}>
                        <div
                            className={cn(rowCV)}
                            onClick={(e) => {
                                e.stopPropagation();
                                props.onEdit?.(tableRow);
                            }}
                        >
                            <FiEdit size={"18px"}/>
                            <Text text={"Редактировать"}/>
                        </div>
                        <div
                            className={cn(rowCV, "hover:text-red-700 text-info-red")}
                            onClick={(e) => {
                                e.stopPropagation();
                                props.onDelete?.(tableRow);
                            }}
                        >
                            <FiTrash2 size={"18px"}/>
                            <Text text={"Удалить"}/>
                        </div>
                    </div>
                }
                placement={"bottom-end"}
            >
                <div className={"absolute pointer top-1/3 right-7"}>{children}</div>
            </Tooltip>
        </React.Fragment>
    );
};

export default EditDeleteTooltip;
