import { PropsWithChildren } from "react";

export interface SwiperContainerProps extends PropsWithChildren {
    containerHeight?: number;
    outOfScreen?: boolean;
    hasLoop : boolean;
}