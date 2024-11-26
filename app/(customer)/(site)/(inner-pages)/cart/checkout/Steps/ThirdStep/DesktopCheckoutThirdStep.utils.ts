import { CreateOrderRequest } from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/Steps/ThirdStep/model";
import { CreateOrderData } from "@/schemas/customer/checkout/CreateOrderSchema";

export const convertFormDataToRequest = (data: CreateOrderData): CreateOrderRequest =>
  ({
    orderId: data.orderId,
    pickedProducts: data.pickedProducts,
    pickedPromos: data.pickedPromos,
    paymentMethod: data.paymentMethod.value,
    deliveryTime: data.deliveryTime.name,
    deliveryDate: data.deliveryDate.value,
    routeCode: +data.deliveryTime.value,
    bonuses: data.bonuses ? +data.bonuses : undefined,
  } as CreateOrderRequest);
