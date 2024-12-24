import { TextLink } from "@/types/dto/text";

export interface BreadcrumbsHeaderProps {
  isSmallBreakpoint: boolean;
  breadcrumbs: TextLink[];
  categoryName: string;
  amount: number;
}
