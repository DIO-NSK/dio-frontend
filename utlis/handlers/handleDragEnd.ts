import {arrayMove} from "@dnd-kit/sortable";
import {DragEndEvent} from "@dnd-kit/core";

type SortableItem = any & { sequenceNumber: number }

export const handleDragEnd = (event: DragEndEvent, items: SortableItem[]) => {
    const {active, over} = event
    if (active.id !== over?.id) {
        const oldIndex = items.findIndex((item) => item.sequenceNumber == active.id);
        const newIndex = items.findIndex((item) => item.sequenceNumber == over?.id);
        return arrayMove(items, oldIndex, newIndex);
    }
}