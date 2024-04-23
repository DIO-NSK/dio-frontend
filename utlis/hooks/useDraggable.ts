import {useState} from "react";
import {DragEndEvent} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";

type SortableItem<T> = T & { sequenceNumber: number }

export const useDraggable = <T>(initialState: SortableItem<T>[]) => {

    const [state, setState] = useState<SortableItem<T>[]>(initialState)

    const onDragEnd = (event: DragEndEvent) => {
        const {active, over} = event
        if (active.id !== over?.id) {
            setState((items) => {
                const oldIndex = items.findIndex((item) => item.sequenceNumber == active.id);
                const newIndex = items.findIndex((item) => item.sequenceNumber == over?.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    return [state, setState, onDragEnd]

}