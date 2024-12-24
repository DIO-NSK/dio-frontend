import Link from "next/link";
import { ImageLinkContainerProps } from "./ImageLinkContainer.types";

export const ImageLinkContainer = ({ link, children }: ImageLinkContainerProps) => {
  return link ? <Link href={link}>{children}</Link> : children;
};
