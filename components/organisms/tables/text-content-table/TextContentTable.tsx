import React from 'react';
import TableWrapper from "@/components/wrappers/table-wrapper/TableWrapper";
import {TableHeaderItem, TextTableRow} from "@/types/dto/Table";
import Text from "@/components/atoms/text/text-base/Text";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import SquareIcon from "@/components/atoms/icons/square-icon/SquareIcon";
import {FiMenu, FiMoreHorizontal} from "react-icons/fi";
import EditDeleteTooltip from "@/components/organisms/tooltips/EditDeleteTooltip";
import {usePathname, useRouter} from "next/navigation";

type TextContentTableProps = {
    tableHeader?: TableHeaderItem[],
    tableContent: TextTableRow[],
    className?: string,
    isDraggable?: boolean
}

const TextContentTable = (props: TextContentTableProps) => {

    const pathname = usePathname()
    const router = useRouter()

    const itemCV: ClassValue = [
        "w-full grid grid-cols-8 gap-7 py-7 border-b-2 border-light-gray",
        "hoverable group hover:bg-bg-light-blue px-7 relative pointer",
        {"pl-20": props.isDraggable}
    ]

    const handleRowClick = () => router.push(pathname.concat("/section/sectionId"))

    return (
        <TableWrapper {...props}>
            {
                props.tableContent.map((tableRow, rowKey) =>
                    <div key={rowKey} className={cn(itemCV)} onClick={handleRowClick}>
                        {
                            props.isDraggable &&
                            <div className={"absolute cursor-grab active:cursor-grabbing top-1/3 left-7"}>
                                <SquareIcon icon={<FiMenu size={"18px"}/>}/>
                            </div>
                        }
                        {
                            tableRow.items.map((rowItem, itemKey) =>
                                <Text key={itemKey} text={rowItem} className={"col-span-2"}/>
                            )
                        }
                        <EditDeleteTooltip tableItem={tableRow}>
                            <SquareIcon icon={<FiMoreHorizontal size={"18px"}/>}/>
                        </EditDeleteTooltip>
                    </div>
                )
            }
        </TableWrapper>
    );

};

export default TextContentTable;
