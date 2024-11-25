import { ResponseAdminProductSearch } from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/page.hooks";
import SquareIcon from "@/components/atoms/icons/square-icon/SquareIcon";
import Text from "@/components/atoms/Text/Text";
import { ProductEntity } from "@/components/organisms/tables/product-content-table/ProductContentTable";
import EditDeleteTooltip from "@/components/organisms/tooltips/EditDeleteTooltip";
import { SortableHandlerProps } from "@/components/wrappers/sortable-wrapper/SortableItemWrapper";
import { ProductTableRow } from "@/types/dto/Table";
import { cn } from "@/utlis/cn";
import { ClassValue } from "clsx";
import React from "react";
import { FiMenu, FiMoreHorizontal } from "react-icons/fi";

const draggableCN = "absolute cursor-grab active:cursor-grabbing top-1/3 left-7";

const ProductRow = ({
  onClick,
  isDraggable,
  tableRow,
  ...props
}: {
  onClick: (product: ProductTableRow<ProductEntity>) => void;
  onEdit?: (tableRow: ProductTableRow<ProductEntity>) => void;
  onDelete: (tableRow: ProductTableRow<ProductEntity>) => void;
  tableRow: ProductTableRow<ProductEntity>;
  overrideTooltip?: React.ReactNode;
  isDraggable?: boolean;
} & SortableHandlerProps) => {
  const wrapperCV: ClassValue[] = [
    "relative w-full grid grid-cols-8 items-center gap-x-7 py-7 border-b-2 border-light-gray",
    "hoverable group hover:bg-bg-light-blue px-7 relative pointer",
    { "pl-20": isDraggable },
  ];

  const handleProductClick = () => onClick(tableRow);

  return (
    <div className={cn(wrapperCV)} onClick={handleProductClick}>
      {isDraggable && (
        <div ref={props.setActivatorNodeRef} className={cn(draggableCN)} {...props.attributes} {...props.listeners}>
          <SquareIcon icon={<FiMenu size={"18px"} />} />
        </div>
      )}
      <div className={cn("flex flex-row items-center gap-5", tableRow.itemsWidth["image"])}>
        <img
          src={tableRow.item.image}
          alt={"Изображение товара"}
          className={"w-[70px] h-[70px] object-scale-down rounded-xl"}
        />
        <Text text={tableRow.item.name} className={"font-medium"} />
      </div>
      <Text
        text={`${(tableRow.item as ResponseAdminProductSearch).discount}%`}
        className={(tableRow as ProductTableRow<ResponseAdminProductSearch>).itemsWidth["discount"]}
      />
      {(tableRow.item as ResponseAdminProductSearch).stockAmount && (
        <Text
          text={`${(tableRow.item as ResponseAdminProductSearch).stockAmount} шт.`}
          className={(tableRow as ProductTableRow<ResponseAdminProductSearch>).itemsWidth?.["stockAmount"]}
        />
      )}
      {(tableRow.item as ResponseAdminProductSearch).price && (
        <Text
          text={`${(tableRow.item as ResponseAdminProductSearch).price} ₽`}
          className={(tableRow as ProductTableRow<ResponseAdminProductSearch>).itemsWidth["price"]}
        />
      )}
      {isDraggable && !props.overrideTooltip ? (
        <EditDeleteTooltip tableRow={tableRow} {...props}>
          <SquareIcon icon={<FiMoreHorizontal size={"18px"} />} />
        </EditDeleteTooltip>
      ) : (
        <SquareIcon
          className={"absolute pointer top-1/3 right-7"}
          icon={props.overrideTooltip}
          //@ts-ignore
          onClick={(e: MouseEvent) => {
            e.stopPropagation();
            props.onDelete?.(tableRow);
          }}
        />
      )}
    </div>
  );
};

export default ProductRow;
