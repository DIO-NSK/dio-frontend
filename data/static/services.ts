import {ServiceCardDTO} from "@/types/cards";

export type Group<T> = {
    groupHeader : string,
    items : T[]
}

const rentGroup : Group<ServiceCardDTO> = {
    groupHeader : "Аренда кулеров и пурифайеров",
    items : [
        {
            header : "Аренда напольного кулера с холодильником",
            descr : "Аренда может осуществляться как на краткосрочной основе, так и на длительный период. Напольный кулер с нагревом и охлаждением и с холодильником на 16 литров:",
            rentTime : [
                {name : "До недели", value : "750 ₽"},
                {name : "Помесячная аренда", value : "750 ₽"},
                {name : "6 месяцев", value : "4400 ₽ за весь срок"},
                {name : "1 год", value : "8500 ₽ за весь срок"},
            ],
            additional : [
                "Доставка и установка кулера",
                "Сервисное обслуживание и ремонт неисправностей, возникших не по вине клиента",
                "Санитарная обработка 1 раз в год",
            ],
            price : 25
        }, {
            header : "Аренда напольного кулера",
            descr : "Аренда может осуществляться как на краткосрочной основе, так и на длительный период. Напольный кулер с нагревом и охлаждением.",
            rentTime : [
                {name : "До недели", value : "650 ₽"},
                {name : "Помесячная аренда", value : "650 ₽"},
                {name : "6 месяцев", value : "3800 ₽ за весь срок"},
                {name : "1 год", value : "7000 ₽ за весь срок"},
            ],
            additional : [
                "Доставка и установка кулера",
                "Сервисное обслуживание и ремонт неисправностей, возникших не по вине клиента",
                "Санитарная обработка 1 раз в год",
            ],
            price : 21.67
        }, {
            header : "Аренда настольного кулера",
            descr : "Аренда может осуществляться как на краткосрочной основе, так и на длительный период.",
            rentTime : [
                {name : "До недели", value : "450 ₽"},
                {name : "Помесячная аренда", value : "450 ₽"},
                {name : "6 месяцев", value : "2600 ₽ за весь срок"},
                {name : "1 год", value : "5000 ₽ за весь срок"},
            ],
            additional : [
                "Доставка и установка кулера",
                "Сервисное обслуживание и ремонт неисправностей, возникших не по вине клиента",
                "Санитарная обработка 1 раз в год",
            ],
            price : 15
        }, {
            header : "Аренда пурифайера с электронным охлаждением",
            descr : "Сервисное обслуживание пурифайеров проводится на месте его установки, без демонтажа и замены! Минимальный срок аренды — 1 месяц.",
            rentTime : [
                {name : "1 месяц", value : "2000 ₽"},
                {name : "3 месяца", value : "5800 ₽"},
                {name : "6 месяцев", value : "11 500 ₽"},
                {name : "1 год", value : "22 000 ₽"},
            ],
            additional : [
                "Доставка пурифаера",
                "Установка и подключение к системе водоснабжения до 10 метров без скрытой установки",
                "Годовое сервисное обслуживание: Проводится 2 раза в год и включает в себя",
                "Опрессовку системы",
                "Дезинфекцию баков горячей и холодной воды",
                "Очистку и дезинфекцию кранов, каплесборника",
                "Очистку всех внешних панелей",
                "Замену 4х фильтров: осадочного, угольного, ультрафильтрационной мембраны, постугольного фильтра",
                "Дезинфекцию баков горячей и холодной воды",
            ],
            price : 66.67
        }, {
            header : "Аренда пурифайера с компрессорным охлаждением",
            descr : "Сервисное обслуживание пурифайеров проводится на месте его установки, без демонтажа и замены! Минимальный срок аренды — 1 месяц.",
            rentTime : [
                {name : "1 месяц", value : "2000 ₽"},
                {name : "3 месяца", value : "5800 ₽"},
                {name : "6 месяцев", value : "11 500 ₽"},
                {name : "1 год", value : "22 000 ₽"},
            ],
            additional : [
                "Доставка пурифаера",
                "Установка и подключение к системе водоснабжения до 10 метров без скрытой установки",
                "Годовое сервисное обслуживание: Проводится 2 раза в год и включает в себя",
                "Опрессовку системы",
                "Дезинфекцию баков горячей и холодной воды",
                "Очистку и дезинфекцию кранов, каплесборника",
                "Очистку всех внешних панелей",
                "Замену 4х фильтров: осадочного, угольного, ультрафильтрационной мембраны, постугольного фильтра",
                "Дезинфекцию баков горячей и холодной воды",
            ],
            price : 66.67
        }
    ]
}

const diagnosticsGroup : Group<ServiceCardDTO> = {
    groupHeader : "Ремонт и диагностика оборудования",
    items : [
        {
            header : "Гарантийный ремонт пурифайера",
            descr : `Обслуживание оборудования, находящегося на гарантии, если оно вышло из строя не по вине потребителя,
                а обнаруженный недостаток или дефект был допущен производителем, устраняется бесплатно!
                Срок гарантийного периода устанавливается производителем оборудования и составляет от 12 до 24 месяцев.
                При получении оборудования из ремонта, если ремонт производился в сервисном центре, необходимо внимательно
                осмотреть аппарат на полноту комплектации и предмет возможных дефектов (трещин, царапин, сколов и пр.)
                После принятия оборудования и отъезда курьера, никакие претензии приниматься не будут. Если Вы являетесь клиентом Компании "DIO"
                    и у Вас заключен договор на годовое сервисное обслуживание пурифайера, то компания на время ремонта предоставит вам подменный пурифайер.
                    В зависимости от серьезности повреждения Вашего оборудования, гарантийный ремонт может составлять от 2 до 45 суток.
                    Гарантийный ремонт может быть осуществлен на месте установки пурифайера без его демонтажа специалистами сервисного центра компании DIO.`,

            additional : [
                "Ввода изделия в эксплуатацию с проведением пусконаладочных работ.",
                "Проведение сервисного обслуживания (санитарной обработки) специалистами сервисного центра компании DIO каждые 6 (шесть) месяцев (платное)",
                `Эксплуатация изделия в соответствии с руководством по эксплуатации изделия. Аппарат не будет подлежать гарантийному обслуживанию, если:
                    аппарат вышел из строя, вследствие включения его в сеть без воды; существует механическая поломка кранов подачи воды; гарантийный талон
                    не заполнен или утерян; при сдаче на гарантийный ремонт обнаруживается несоответствие комплектности аппарата; аппарат имеет явные следы
                    вскрытия или механических повреждений; заводские пломбы нарушены; нарушены условия хранения, эксплуатации или транспортировки;
                    аппарат подвергался ремонту сторонними лицами, не являющимися сотрудниками нашего авторизованного сервисного центра.`
            ]
        },
        {
            header : "Выездная диагностика пурифайера",
            descr : `Сервисный центр Компании DIO осуществляет постгарантийный ремонт кулеров, пурифайеров и капсульных кофемашин. 
                     Диагностику на месте установки пурифайера осуществляет инженер Сервисного центра.`,

            additional : [
                "После диагностики, озвучивается стоимость полных работ по ремонту. Если клиент отказывается от ремонта, деньги уплаченные за диагностику не возвращаются.",
                "Выезд инженера на место нахождения оборудования осуществляется в течение 3-х рабочих дней."
            ],
            price: 1000
        },
        {
            header : "Гарантийный ремонт кулера",
            descr : `Обслуживание оборудования, находящегося на гарантии, если оно вышло из строя не по вине потребителя,
                а обнаруженный недостаток или дефект был допущен производителем, устраняется бесплатно!
                Срок гарантийного периода устанавливается производителем оборудования и составляет от 12 до 24 месяцев.
                При получении оборудования из ремонта, если ремонт производился в сервисном центре, необходимо внимательно
                осмотреть аппарат на полноту комплектации и предмет возможных дефектов (трещин, царапин, сколов и пр.)
                После принятия оборудования и отъезда курьера, никакие претензии приниматься не будут. Если Вы являетесь клиентом Компании "DIO"
                    и у Вас заключен договор на годовое сервисное обслуживание пурифайера, то компания на время ремонта предоставит вам подменный пурифайер.
                    В зависимости от серьезности повреждения Вашего оборудования, гарантийный ремонт может составлять от 2 до 45 суток.
                    Гарантийный ремонт может быть осуществлен на месте установки пурифайера без его демонтажа специалистами сервисного центра компании DIO.`,

            additional : [
                "Ввода изделия в эксплуатацию с проведением пусконаладочных работ.",
                "Проведение сервисного обслуживания (санитарной обработки) специалистами сервисного центра компании DIO каждые 6 (шесть) месяцев (платное)",
                `Эксплуатация изделия в соответствии с руководством по эксплуатации изделия. Аппарат не будет подлежать гарантийному обслуживанию, если:
                    аппарат вышел из строя, вследствие включения его в сеть без воды; существует механическая поломка кранов подачи воды; гарантийный талон
                    не заполнен или утерян; при сдаче на гарантийный ремонт обнаруживается несоответствие комплектности аппарата; аппарат имеет явные следы
                    вскрытия или механических повреждений; заводские пломбы нарушены; нарушены условия хранения, эксплуатации или транспортировки;
                    аппарат подвергался ремонту сторонними лицами, не являющимися сотрудниками нашего авторизованного сервисного центра.`
            ]
        },
        {
            header : "Выездная диагностика кулера",
            descr : `Сервисный центр Компании DIO осуществляет постгарантийный ремонт кулеров, пурифайеров и капсульных кофемашин. 
                     Диагностику на месте установки пурифайера осуществляет инженер Сервисного центра.`,

            additional : [
                "После диагностики, озвучивается стоимость полных работ по ремонту. Если клиент отказывается от ремонта, деньги уплаченные за диагностику не возвращаются.",
                "Выезд инженера на место нахождения оборудования осуществляется в течение 3-х рабочих дней."
            ],
            price: 1000
        },
        {
            header : "Диагностика кулера",
            descr : `Сервисный центр Компании DIO осуществляет постгарантийный ремонт кулеров.
                     Диагностику на месте установки пурифайера осуществляет инженер Сервисного центра.`,

            additional : [
                "Стоимость диагностики напольного кулера 1450 рублей",
                "Стоимость диагностики настольного кулера 1150 рублей",
                "Оборудование принимается в ремонт на условиях оплаты предварительной диагностики.",
                "Заказчику, до начала ремонта и после диагностики, озвучивается стоимость полных работ по ремонту. Если клиент отказывается от ремонта, деньги уплаченные за предварительную диагностику не возвращаются",
                "По согласованию, с заказчиком, в случае отказа от ремонта, компания либо возвращает ему оборудование без ремонта либо утилизирует",
                "При проведении ремонтных работ кулер обязательно проходит санитарную обработку",
                "Срок выполнения ремонта составляет от 2 до 45 дней, в зависимости от сложности ремонта. Диагностика (в случае необходимости) производится в течении 3х рабочих дней"
            ]
        }
    ]
}

const sanitizationGroup : Group<ServiceCardDTO> = {
    groupHeader : "Санитарная обработка оборудования",
    items : [
        {
            header : "Санитарная обработка кулера",
            descr : `Рекомендуемая периодичность проведения санитарной обработки – 1 раз в шесть месяцев.
            Кулер является тем устройством, через которое питьевая вода попадает к человеку. 
            Как только бутылка с водой установлена на кулере, качество воды перестает зависеть только от производителя и качества розлива.
            В кулере в воду могут попадать внешние загрязнения (пыль, микроорганизмы). Источником заражения кулера бактериями могут являться сами потребители. 
            Достаточно один раз установить бутылку с водой, не сняв с пробки гигиенический ярлычок, который предназначен для защиты бутыли от проникновения загрязнений,
             и вода окажется загрязненной. В процессе эксплуатации кулера на стенках баков, соединительных трубках и краниках образуется биопленка,
              которая представляет собой наилучшую среду для размножения бактерий. Бактерии, попавшие в воду, ухудшают вкусовые качества воды,
               ее внешние свойства воды, размножаются в бачках аппарата. Содержащиеся в воде минеральные вещества вызывают образование накипи 
               и осадка в бачках и водопроводящих магистралях кулера, засорению кранов. В результате ухудшается качество воды, возрастает расход электроэнергии,
                повышается уровень шума при работе кулера, уменьшается напор воды вплоть до полной остановки, сокращается срок службы аппарата`,

            additional : [
                "доставка кулера от клиента в Сервисный центр и обратно",
                "Предоставление оборудования на замену на время проведения санитарной обработки (при условии действующего договора на поставку питьевой воды с Компанией DIO)",
                "мелкий ремонт, не включающий замену вышедших из строя запчастей",
                "диагностика аппарата",
                "санитарная внутренняя обработка резервуаров, кранов подачи воды и патрубков",
                "наружную промывка кулера",
                "Срок санитарной обработки составляет от 3-х до 10-ти дней"
            ]
        },
        {
            header : "Выездная санитарная обработка кулера",
            descr : `Сотрудники сервисного центра Компании DIO сделают санитарную обработку и сервисное обслуживание вашего кулера на месте его установки.
            Рекомендуемая периодичность проведения санитарной обработки – 1 раз в шесть месяцев.
            Кулер является тем устройством, через которое питьевая вода попадает к человеку. 
            Как только бутылка с водой установлена на кулере, качество воды перестает зависеть только от производителя и качества розлива.
            В кулере в воду могут попадать внешние загрязнения (пыль, микроорганизмы). Источником заражения кулера бактериями могут являться сами потребители. 
            Достаточно один раз установить бутылку с водой, не сняв с пробки гигиенический ярлычок, который предназначен для защиты бутыли от проникновения загрязнений,
             и вода окажется загрязненной. В процессе эксплуатации кулера на стенках баков, соединительных трубках и краниках образуется биопленка,
              которая представляет собой наилучшую среду для размножения бактерий. Бактерии, попавшие в воду, ухудшают вкусовые качества воды,
               ее внешние свойства воды, размножаются в бачках аппарата. Содержащиеся в воде минеральные вещества вызывают образование накипи 
               и осадка в бачках и водопроводящих магистралях кулера, засорению кранов. В результате ухудшается качество воды, возрастает расход электроэнергии,
                повышается уровень шума при работе кулера, уменьшается напор воды вплоть до полной остановки, сокращается срок службы аппарата`,

            additional : [
                "Мелкий ремонт, не включающий замену вышедших из строя запчастей",
                "Диагностика аппарата",
                "Санитарная внутренняя обработку всех внутренних резервуаров, кранов подачи воды и патрубков",
                "Наружняя промывка кулера",
                "Обработка кулера азонатором",
                "Декальцинацию бака горячей воды, кранов",
                "По времени, в зависимости от степени загрязнения, санитарная обработка займет от 60 до 90 минут."
            ]
        }
    ]
}

const mountGroup : Group<ServiceCardDTO> = {
    groupHeader : "Установка пурифаеров",
    items : [
        {
            header : "Простая установка пуриайера",
            descr : `При покупке пурифайера в компании "DIO", наши специалисты бесплатно доставят пурифайер, бесплатно установят и подключат его к системе водоснабжения`,

            additional : [
                "Трубка полипропиленовая до 10 м",
                "Кабель канал до 6 м",
                "Кран ц/ц",
                "Кран врезной"
            ],

            price: 2000
        },
        {
            header : "Сложная (или скрытая) установка пурифайера",
            descr : `Наши специалисты произведут скрытую установку пурифаера и подключат его к системе водоснабжения`,

            additional : [
                "Трубка полипропиленовая до 20 м",
                "Кабель канал до 10 м",
                "Кран ц/ц",
                "Кран врезной"
            ],

            price: 5000
        }
    ]
}

const maintenanceGroup : Group<ServiceCardDTO> = {
    groupHeader : "Сервисное обслуживание оборудования",
    items : [
        {
            header : "Годовое 4-х разовое сервисное обслуживание пурифайера(офис более 50 человек)",
            descr : `Сервисное обслуживание пурифайеров проводится на месте его установки, без демонтажа и замены. В стоимость обслуживания не входит стоимость фильтров. Фильтры необходимо оплачивать отдельно.`,

            additional : [
                "опрессовка системы 4 раза в год",
                "дезинфекция баков горячей и холодной воды 2 раза в год",
                "очистка и дезинфекция кранов, каплесборника 2 раза в год",
                "очистка всех внешних панелей 4 раза в год",
                "замена осадочного фильтра – 4 раза в год",
                "замена пре-угольного фильтра – 4 раза в год",
                "замена ультрафильтрационной мембраны – 2 раз в год",
                "замена пост-угольного фильтра – 2 раз в год",
            ],

            price: 4800
        },
        {
            header : "Годовое 2-х разовое сервисное обслуживание пурифайера (офис до 40 человек)",
            descr : `Сервисное обслуживание пурифайеров проводится на месте его установки, без демонтажа и замены. В стоимость обслуживания не входит стоимость фильтров. Фильтры необходимо оплачивать отдельно.`,

            additional : [
                "опрессовка системы 2 раза в год",
                "дезинфекция баков горячей и холодной воды 2 раза в год",
                "очистка и дезинфекция кранов, каплесборника 2 раза в год",
                "очистка всех внешних панелей 2 раза в год",
                "замена осадочного фильтра – 2 раза в год",
                "замена пре-угольного фильтра – 2 раза в год",
                "замена ультрафильтрационной мембраны – 1 раз в год",
                "замена пост-угольного фильтра – 1 раз в год",
            ],

            price: 3200
        },
        {
            header : "Единоразовое полное сервисное обслуживание пурифайера",
            descr : `Сервисное обслуживание пурифайеров проводится на месте его установки, без демонтажа и замены. В стоимость обслуживания не входит стоимость фильтров. Фильтры необходимо оплачивать отдельно.`,

            additional : [
                "опрессовка системы",
                "дезинфекция баков горячей и холодной воды",
                "очистка и дезинфекция кранов, каплесборника",
                "очистка всех внешних панелей",
                "замена осадочного фильтра",
                "замена пре-угольного фильтра",
                "замена ультрафильтрационной мембраны",
                "замена пост-угольного фильтра",
            ],

            price: 2200
        }
    ]
}

const freeUseGroup : Group<ServiceCardDTO> = {
    groupHeader : "Бесплатное пользование",
    items : [
        {
            header : "Cтеллаж для хранения 4-х бутылей в бесплатное пользование",
            descr : `Cтеллаж для хранения 4-х бутылей по 19 литров предоставляется в бесплатное пользование
             при условии ежемесячного и единовременного заказа не менее 4-х бутылей по 19 литров питьевой воды dio`,
            price: 0
        },
        {
            header : "Настольный куллер без охлаждения в бесплатное пользование",
            descr : `настольный кулер с нагревом и без охлаждения предоставляется в бесплатное пользование при условии ежемесячного заказа не менее 6-ти бутылей по 19 литров питьевой воды dio`,
            additional : [
                "Обязательным условием бесплатного пользования кулеров является проведение платной санитарной обработки оборудования 1 раз в шесть месяцев, в сервисном центре Компании \"DIO\"",
                "При невыполнении ежемесячного плана потребления питьевой воды DIO, вы будете обязаны оплатить арендную плату за каждый месяц нарушения условий договора."
            ],
            price: 0
        },
        {
            header : "Настольный куллер с охлаждением в бесплатное пользование",
            descr : `Настольный кулер с нагревом и охлаждением предоставляется в бесплатное пользование при условии ежемесячного заказа не менее 6-ти бутылей по 19 литров питьевой воды dio`,
            additional : [
                "Обязательным условием бесплатного пользования кулеров является проведение платной санитарной обработки оборудования 1 раз в шесть месяцев, в сервисном центре Компании \"DIO\"",
                "При невыполнении ежемесячного плана потребления питьевой воды DIO, вы будете обязаны оплатить арендную плату за каждый месяц нарушения условий договора."
            ],
            price: 0
        }
    ]
}



export const services = [
    rentGroup, diagnosticsGroup, sanitizationGroup, mountGroup, maintenanceGroup, freeUseGroup
]
