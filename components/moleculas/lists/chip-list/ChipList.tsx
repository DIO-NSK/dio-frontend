import React, {MouseEventHandler} from 'react';
import {SelectItem} from "@/types/props/SelectItem";
import Chip from "@/components/atoms/chip/Chip";
import {cn} from "@/utlis/cn";

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

type ChipListProps = {
    items : SelectItem<number>[],
    activeItem : SelectItem<number>,
    setActiveItem : MouseEventHandler<HTMLUListElement>
}

const createChipStyles = (isActive : boolean) => [
    "py-2 px-5 w-fit hoverable pointer whitespace-nowrap",
    {'bg-link-blue text-white' : isActive},
    {'hover:text-link-blue' : !isActive}
]

const ChipList = ({items, activeItem, setActiveItem} : ChipListProps) => {
    return (
        <ul className={'flex flex-row gap-3 flex-wrap col-span-full'} onClick={setActiveItem}>
            {items.map((item) => (
                <Chip
                    className={cn(createChipStyles(activeItem.value === item.value))}
                    activeIndex={item.value}
                    key={item.value}
                >
                    {item.name}
                </Chip>
            ))}
        </ul>
    );
};

export default ChipList;
