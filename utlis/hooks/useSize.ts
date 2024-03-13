import {MutableRefObject, useEffect, useState} from "react";

export function useSize<T extends Element, >(ref: MutableRefObject<T | undefined>) {

    const [size, setSize] = useState<DOMRectReadOnly>()

    useEffect(() => {
        if (ref.current == null) return
        const observer = new ResizeObserver(([entry]) =>
            setSize(entry.contentRect))
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return size

}