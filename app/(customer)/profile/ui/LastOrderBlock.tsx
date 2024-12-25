"use client";

import {
  $orders,
  getOrdersEvent,
  resetOrderToRepeatEvent,
  selectOrderToRepeatEvent,
} from "@/app/(customer)/profile/orders/model";
import Button from "@/components/atoms/buttons/button/Button";
import Text from "@/components/atoms/Text/Text";
import OrderCard from "@/components/organisms/cards/OrderCard/OrderCard";
import { IfRenderBlock } from "@/components/wrappers/IfRenderBlock/IfRenderBlock";
import { useUnit } from "effector-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiRefreshCw } from "react-icons/fi";

export const LastOrderBlock = () => {
  const router = useRouter();
  const [resetOrderToRepeat, selectOrderToRepeat] = useUnit([resetOrderToRepeatEvent, selectOrderToRepeatEvent]);
  const [orders, getOrders] = useUnit([$orders, getOrdersEvent]);

  useEffect(() => {
    resetOrderToRepeat();
    getOrders();
  }, []);

  const handleRepeatOrder = () => {
    selectOrderToRepeat(orders.at(0)!!);
    router.push("/cart/checkout");
  };

  return (
    <IfRenderBlock condition={orders?.length !== 0}>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-row items-center justify-between">
          <Text className="text-lg font-medium">Последний заказ</Text>
          <Button
            classNames={{ button: "p-0 bg-0 md:py-3 md:px-4 md:bg-light-gray" }}
            icon={<FiRefreshCw size="18px" className="hidden md:flex" />}
            onClick={handleRepeatOrder}
            buttonType="SECONDARY"
            size="sm"
          >
            Повторить заказ
          </Button>
        </div>
        <OrderCard order={orders.at(0)!!} canRepeat={false} />
      </div>
    </IfRenderBlock>
  );
};
