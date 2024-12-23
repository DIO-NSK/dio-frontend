import { IfRenderBlockProps } from "./IfRenderBlock.types";

export const IfRenderBlock = ({ condition, children }: IfRenderBlockProps) => (condition ? children : null);
