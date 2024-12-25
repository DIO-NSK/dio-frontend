import { ResponseProfileOrder } from "@/types/dto/user/order/ResponseProfileOrder";

export const createInformationGrid = (order: ResponseProfileOrder) => [
  { header: "Количество товаров", description: `${order.items.length} шт.`, className: "md:hidden xl:flex" },
  { header: "Адрес доставки", description: order.address, className: "md:col-span-full xl:col-span-1" },
  { header: "Дата доставки", description: order.deliveryDate },
  { header: "Время доставки", description: order.deliveryTime },
];
