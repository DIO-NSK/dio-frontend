import React, {Children} from 'react';
import {WrapperProps} from "@/types/props/Wrapper";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {SyntheticListenerMap} from "@dnd-kit/core/dist/hooks/utilities";
import {DraggableAttributes} from "@dnd-kit/core";

type SortableItemWrapperProps = { sequenceNumber : number } & WrapperProps

export type SortableHandlerProps = {
    setActivatorNodeRef?: (element: (HTMLElement | null)) => void,
    listeners?: SyntheticListenerMap | undefined,
    attributes?: DraggableAttributes
}

const SortableItemWrapper = (props: SortableItemWrapperProps) => {

    console.log(props.sequenceNumber)

    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition
    } = useSortable(
        {
            id: props.sequenceNumber
        }
    )

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
    };

    const childrenWithRef = () => Children.map(props.children, (child) => {
        return React.cloneElement(child as React.ReactElement, {
            setActivatorNodeRef: setActivatorNodeRef,
            listeners: listeners,
            attributes: attributes
        })
    })

    return (
        <div style={style} ref={setNodeRef}>
            {childrenWithRef()}
        </div>
    );

};

export default SortableItemWrapper;
