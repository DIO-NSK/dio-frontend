import {TableHeaderItem, TableRow} from "@/types/dto/Table";
import {coolerProductCard, waterProductCard} from "@/data/shoppingCartProducts";
import {AdminOrder} from "@/types/dto/AdminOrder";

export const adminOrdersTableHeader: TableHeaderItem[] = [
    {text: "Дата создания", width: "col-span-1"},
    {text: "Дата доставки", width: "col-span-1"},
    {text: "ID заказа", width: "col-span-1"},
    {text: "Статус", width: "col-span-1"},
    {text: "Клиент", width: "col-span-1"},
    {text: "Сумма", width: "col-span-1"},
    {text: "Позиции", width: "col-span-2"},
]

export const adminOrderTableItem: AdminOrder = {
    orderId: 187126,
    status: "processing",
    deliveryDate: "Чт. 22.11",
    products: [coolerProductCard, waterProductCard],
    totalPrice: 2000, creationDate: "19.11.2023",
    deliveryPrice : 0, creationTime: "20:18:22",
    customer: {
        valueName: "Артём Третьяков",
        phoneNumber: "+7 (913) 939-11-94",
        email : "tretiakovvvvv@gmail.com"
    },
    bankName : "Alfa-Bank"
}

export const adminOrderTableRow: TableRow<AdminOrder> = {item: {...adminOrderTableItem, testId: 0}}

export const adminOrderTableContent: TableRow<AdminOrder>[] = [
    {item: {...adminOrderTableItem, testId: 0}}, {item: {...adminOrderTableItem, testId: 1}},
    {item: {...adminOrderTableItem, testId: 2}}, {item: {...adminOrderTableItem, testId: 3}},
]

