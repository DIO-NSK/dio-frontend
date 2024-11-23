import { ImageHeaderDescrCard } from "@/types/cards";

import CrownIcon from "../../../../../public/icons/crown-icon.png";
import RocketIcon from "../../../../../public/icons/rocket-icon.png";
import SettingsIcon from "../../../../../public/icons/settings-icon.png";
import DIOLogo from "../../../../../public/images/dio-logo.png";

export const data: ImageHeaderDescrCard[] = [
    {
        image: DIOLogo.src,
        header: "1 DIO = 1 рубль",
        descr: "Бонусами можно оплатить до 70% следующей покупки "
    }, {
        image: SettingsIcon.src,
        header: "Начисление бонусов",
        descr: "Определите размер вашего DIO-бонуса в текущем месяце от 4% до 8%"
    }, {
        image: CrownIcon.src,
        header: "Заказывайте воду 19л.",
        descr: "Заказывает воду в бутылях 19л не менее 4 бутылей за месяц"
    }, {
        image: RocketIcon.src,
        header: "Баланс DIO-счёта",
        descr: "DIO - бонусы начисляются 1 числа каждого месяца"
    },
]