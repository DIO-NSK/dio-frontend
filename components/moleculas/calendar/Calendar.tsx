import React from 'react';
import {Nullable} from "primereact/ts-helpers";
import {addLocale} from "primereact/api";
import {Calendar as PrimeReactCalendar, CalendarPassThroughOptions} from "primereact/calendar";

import 'primereact/resources/themes/lara-light-cyan/theme.css';
import {cn} from "@/utlis/cn";

export type CalendarValue = Nullable<(Date | null)[]>

export type CalendarProps = {
    value: CalendarValue,
    onChange: (elem: CalendarValue) => void,
}

const passThrough : Partial<CalendarPassThroughOptions> = {
    input: {
        root: () => "border-2 border-light-gray rounded-xl h-[50px] rounded-[8px] pl-5"
    },
    title : () => "flex flex-row gap-3",
    buttonbar : () => "pt-5 border-t-2 border-light-gray p-5 w-full flex flex-row items-center justify-between gap-5",
    todayButton : {
        root : () => cn([
            "w-full px-4 py-3 bg-bg-light-blue text-link-blue rounded-lg",
            "hoverable pointer hover:bg-blue-100 hover:text-blue-600"
        ]),
        label : () => "font-medium"
    },
    clearButton : {
        root : () => cn([
            "w-full px-4 py-3 bg-bg-light-blue text-red-500 rounded-lg",
            "hoverable pointer hover:bg-red-100 hover:text-red-600 font-light"
        ]),
        label : () => "font-medium"
    }
}

const Calendar = ({value, onChange}: CalendarProps) => {

    addLocale('ru', {
        firstDayOfWeek: 1,
        dayNames: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
        dayNamesShort: ['пн.', 'вт.', 'ср.', 'чт.', 'пт.', 'сб.', 'вс.'],
        dayNamesMin: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        monthNames: ['Январь ', 'Февраль ', 'Март ', 'Апрель ', 'Май ', 'Июнь ', 'Июль ', 'Август ', 'Сентябрь ', 'Октябрь ', 'Ноябрь ', 'Декабрь '],
        monthNamesShort: ['янв.', 'фев.', 'мар.', 'апр.', 'май', 'июн.', 'июл.', 'авг.', 'сен.', 'окт.', 'ноя.', 'дек.'],
        today: 'Сегодня',
        clear: 'Очистить'
    });

    return (
        <PrimeReactCalendar
            pt={passThrough}
            value={value}
            readOnlyInput
            hideOnRangeSelection
            showButtonBar
            mask={'99.99.9999 - 99.99.9999'}
            dateFormat='dd.mm.yy'
            onChange={(e) => onChange(e.value)}
            placeholder={'Выберите период'}
            selectionMode="range"
            locale='ru'
        />
    )

}

export default Calendar;