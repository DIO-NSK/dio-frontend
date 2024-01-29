import React from 'react';
import {TableWrapperProps} from "@/types/dto/Table";
import Text from "@/components/atoms/text/text-base/Text";
import {cn} from "@/utlis/cn";

const Header = (props: TableWrapperProps) => {
    return (
        <div className={"w-full mx-[-28px] px-7 grid grid-cols-8 gap-x-7 pb-7 border-b-2 border-light-gray"}>
            {
                props.tableHeader?.map((item, key) =>
                    <Text
                        key={key}
                        text={item.text}
                        className={cn("text-text-gray", item.width)}
                    />
                )
            }
        </div>
    )
}

const Content = (props: TableWrapperProps) => {
    return (
        <div className={"w-full flex flex-col mx-[-28px]"}>
            {props.children}
        </div>
    )
}

const TableWrapper = (props: TableWrapperProps) => {
    return (
        <div className={cn("h-fit w-full flex flex-col", props.className)}>
            {props.tableHeader && <TableWrapper.Header {...props}/>}
            <TableWrapper.Content {...props}/>
        </div>
    );
};

TableWrapper.Header = Header
TableWrapper.Content = Content

export default TableWrapper;
