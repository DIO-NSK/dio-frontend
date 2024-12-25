import { IfRenderBlock } from "@/components/wrappers/IfRenderBlock/IfRenderBlock";
import { OrderCardProps } from "@/types/props/OrderCard";
import { cn } from "@/utlis/cn";
import React, { useMemo, useState } from "react";
import { Content } from "./Content/Content";
import { Footer } from "./Footer/Footer";
import { HeaderRow } from "./HeaderRow/HeaderRow";
import { InformationBlock } from "./InformationBlock/InformationBlock";
import { createStyles } from "./OrderCard.utils";

const OrderCard = React.memo(({ canRepeat = true, theme = "outlined", ...props }: OrderCardProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <div className={cn(styles)}>
      <HeaderRow {...props} />
      <InformationBlock {...props} />
      <IfRenderBlock condition={isOpen}>
        <Content {...props} />
      </IfRenderBlock>
      <Footer order={props.order} isOpen={isOpen} setOpen={setOpen} canRepeat={canRepeat} />
    </div>
  );
});

export default OrderCard;
