import { TextLink } from "@/types/dto/text";
import { ResponseProduct } from "@/types/dto/user/product/ResponseProduct";

export interface HeaderBreadcrumbsProps {
  product: ResponseProduct;
  breadcrumbs: TextLink[];
}
