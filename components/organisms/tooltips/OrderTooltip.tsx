import React from 'react';
import {TooltipProps} from "@/types/props/Tooltip";
import {FiCheck, FiCopy, FiEdit2, FiPlusCircle, FiSlash, FiTrash2, FiUpload} from "react-icons/fi";
import {Tooltip} from "@mui/joy";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";
import {AdminOrder} from "@/types/dto/AdminOrder";
import {ClassValue} from "clsx";

const OrderTooltip = ({open, tableItem, children}: TooltipProps<AdminOrder>) => {

    const tooltipBlocks = [
        {
            header: "Основные",
            items: [
                {text: "Изменить заказ", action: () => console.log("Action"), icon: <FiEdit2 size={"18px"}/>},
                {text: "Копировать заказ", action: () => console.log("Action"), icon: <FiCopy size={"18px"}/>},
                {text: "Экспортировать в .csv", action: () => console.log("Action"), icon: <FiUpload size={"18px"}/>},
                {
                    text: "Удалить заказ",
                    action: () => console.log("Action"),
                    icon: <FiTrash2 size={"18px"}/>,
                    className: "text-info-red hover:text-red-800"
                }
            ]
        }, {
            header: "Сменить статус",
            items: [
                {text: "Принять", action: () => console.log("Action"), icon: <FiPlusCircle size={"18px"}/>},
                {text: "Отменить", action: () => console.log("Action"), icon: <FiSlash size={"18px"}/>},
                {text: "Выполнить", action: () => console.log("Action"), icon: <FiCheck size={"18px"}/>},
            ]
        }

    ]

    const rowCV: ClassValue[] = [
        "w-full flex flex-row items-center gap-3",
        "hoverable pointer hover:text-link-blue"
    ]

    return (
        <Tooltip
            size={"lg"}
            variant={"outlined"}
            open={open}
            sx={{
                border: "none",
                borderRadius: "10px",
                backgroundColor: "#FFFFFF"
            }}
            title={
                <div className={"p-4 flex flex-col gap-5"}>
                    {
                        tooltipBlocks.map((tooltipBlock, blockKey, array) => {

                            const blockCV = {"border-b-2 border-light-gray pb-5": blockKey !== array.length - 1}

                            return <div key={blockKey} className={"w-full flex flex-col gap-5"}>
                                <Text text={tooltipBlock.header} className={"text-text-gray"}/>
                                <div className={cn("flex flex-col gap-5", blockCV)}>
                                    {
                                        tooltipBlock.items.map((tooltipItem, itemKey) =>
                                            <div
                                                className={cn(rowCV, tooltipItem.className)}
                                                onClick={tooltipItem.action}
                                                key={itemKey}
                                            >
                                                {tooltipItem.icon}
                                                <Text text={tooltipItem.text}/>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>

                            }
                        )
                    }
                </div>
            }
            placement={"bottom-start"}
        >
            <div>{children}</div>
        </Tooltip>
    );
};

export default OrderTooltip;
