import {ImageHeaderDescrCard} from "@/types/cards";

import DIOLogo from "../public/images/dio-logo.png"
import SettingsIcon from "../public/icons/settings-icon.png"
import CrownIcon from "../public/icons/crown-icon.png"
import RocketIcon from "../public/icons/rocket-icon.png"

export const bonusCardData : ImageHeaderDescrCard[] = [
    {
        image : DIOLogo.src,
        header : "1 DIO = 1 рубль",
        descr : "DIO-бонусами можно оплатить до 70% от стоимости следующей покупки"
    }, {
        image : SettingsIcon.src,
        header : "Начисление бонусов",
        descr : "DIO-бонусы начсляются 1 числа каждого месяца"
    }, {
        image : CrownIcon.src,
        header : "Заказывайте воду 19л.",
        descr : "Заказывайте не менее 4 бутылей питьевой воды в месяц"
    }, {
        image : RocketIcon.src,
        header : "Баланс DIO-счёта",
        descr : "Можно узнать в личном кабинете или в\n" +
            "контакт-центре по номеру +7 (383) 333-99-00"
    },
]