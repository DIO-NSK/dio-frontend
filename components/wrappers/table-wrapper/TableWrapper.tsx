import React, {ReactNode} from 'react';
import {TableWrapperProps} from "@/types/dto/Table";
import Text from "@/components/atoms/text/text-base/Text";
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";

const Header = (props: TableWrapperProps) => {

    const wrapperCV: ClassValue[] = [
        "w-full px-7 grid grid-cols-8",
        "gap-x-7 pb-7 border-b-2 border-light-gray"
    ]

    return (
        <div className={cn(wrapperCV, props.classNames?.header)}>
            {props.tableHeader?.map((item, key) =>
                <Text
                    key={key}
                    text={item.text}
                    className={cn("text-text-gray", item.width)}
                />
            )}
        </div>
    )

}

const Content = (props: TableWrapperProps) => {
    return (
        <div className={cn("w-full flex flex-col", props.classNames?.content)}>
            {props.children}
        </div>
    )
}

const TableWrapper = (props: TableWrapperProps) => {
    return (
        <div className={cn("h-fit w-full flex flex-col", props.classNames?.content)}>
            {props.tableHeader && <TableWrapper.Header {...props}/>}
            {props.children}
        </div>
    );
};

TableWrapper.Header = Header
TableWrapper.Content = Content

export default TableWrapper;
