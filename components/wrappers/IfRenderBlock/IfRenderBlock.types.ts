import { PropsWithChildren } from "react";

export interface IfRenderBlockProps extends PropsWithChildren {
  condition: boolean;
}