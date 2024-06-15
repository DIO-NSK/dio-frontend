import {FullwidthMainCardType} from "@/types/cards";
import {Side} from "@/data/enums/side";

import ProductImage1 from "@/public/images/product-image-1.png"
import ProductImage2 from "@/public/images/product-image-2.png"
import ProductImage3 from "@/public/images/product-image-3.png"

import WaterIcon from "@/public/icons/water-icon.png"
import SettingsIcon from "@/public/icons/settings-icon.png"
import CrownIcon from "@/public/icons/crown-icon.png"

export const fullWidthCardData : FullwidthMainCardType[] = [
    {
        side: Side.LEFT,
        header : "Автоматизированное производство",
        descr : "Артезианская вода «DIO» производится на полностью " +
            "автоматической линии производства, проходит постоянный " +
            "контроль качества — каждые 30 минут вода исследуется " +
            "сотрудниками лаборатории.",
        image : 'https://storage.yandexcloud.net/dio-static-images/product-image-1-min.png',
        icon : SettingsIcon.src,
    }, {
        side: Side.RIGHT,
        header : "Дар природы с глубины 130 м.",
        descr : "Три артезианские скважины расположены\n" +
            "на территории производства DIOGEN (\"Диоген\")\n" +
            "в лесной зоне Академгородка и относятся\n" +
            "к магниево-кальциевым гидрокарбонатным источникам, содержащим важные\n" +
            "для организма вещества.",
        image : 'https://storage.yandexcloud.net/dio-static-images/product-image-2-min.png',
        icon : WaterIcon.src,
    }, {
        side: Side.LEFT,
        header : "Контроль качества",
        descr : "Главный принцип производства питьевой\n" +
            "воды «DIO»  — сохранение природного микроэлементного состава артезианской воды.\n" +
            "Каждая партия воды проверяется региональным\n" +
            "центром Роспотребнадзора РФ.",
        image : 'https://storage.yandexcloud.net/dio-static-images/product-image-3-min.png',
        icon : CrownIcon.src,
    }
]