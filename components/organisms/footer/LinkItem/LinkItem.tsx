import Text from "@/components/atoms/Text/Text";
import { IconTextLink } from "@/types/links";
import { cn } from "@/utlis/cn";
import Link from "next/link";

export const LinkItem = ({ item, className }: { item: IconTextLink; className?: string }) => (
  <Link
    className={cn("col-span-1", className)}
    rel={item?.href ? "noopener noreferer" : undefined}
    target={item?.href ? "_blank" : undefined}
    href={item?.href ?? item.path}
  >
    <Text className={"hoverable pointer text-text-gray hover:text-link-blue"} text={item.text} />
  </Link>
);
