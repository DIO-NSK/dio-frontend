import {SaleCardDTO} from "@/types/cards";

import SaleImage1 from "../public/images/sales/sale-image-1.png"
import SaleImage2 from "../public/images/sales/sale-image-2.png"
import SaleImage3 from "../public/images/sales/sale-image-3.png"
import SaleImage4 from "../public/images/sales/sale-image-4.png"
import SaleImage5 from "../public/images/sales/sale-image-5.png"
import SaleImage6 from "../public/images/sales/sale-image-6.png"

export const mockSaleCardArray: SaleCardDTO[] = [
    {
        header: "Вода «Горная Вершина» в подарок",
        descr: "При покупке 2-х бутылей воды «Горная Вершина» 19 л. в подарок 3 бутылки воды 1,5 л.",
        duration: "15.10.23",
        image: SaleImage1.src
    },{
        header: "Бесплатное обслуживание пурифайера",
        descr: "При покупке пурифайера DIO доставка, подключение и установка пурифайера в подарок\n",
        duration: "15.10.23",
        image: SaleImage2.src
    }, {
        header: "Лечебно-столовая вода DIO в подарок",
        descr: "При покупке 4х бутылей DIO Минерал в подарок 2 бутылки минаральной лечебно-столовой воды DIO 1.5 л газированной",
        duration: "15.10.23",
        image: SaleImage3.src
    }, {
        header: "-20% на покупку второго пурифайера",
        descr: "При покупке от двух и более пурифайеров Вы получаете скидку 20% на второй пурифайер\n",
        duration: "15.10.23",
        image: SaleImage4.src
    },{
        header: "Лечебно-столовая вода DIO в подарок",
        descr: "При покупке 4х бутылей DIO Минерал в подарок 2 бутылки минаральной лечебно-столовой воды DIO 1.5 л газированной",
        duration: "15.10.23",
        image: SaleImage5.src
    },{
        header: "-20% на покупку второго пурифайера",
        descr: "При покупке от двух и более пурифайеров Вы получаете скидку 20% на второй пурифайер\n",
        duration: "15.10.23",
        image: SaleImage6.src
    },

]