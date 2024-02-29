"use client"

import {LocalizationProvider, MobileDatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Text from "@/components/atoms/text/text-base/Text";

import 'dayjs/locale/ru';
import {ruRU} from '@mui/x-date-pickers/locales';


const TestPage = () => {
    return (
        <div className={"w-full p-7"}>
            <LocalizationProvider
                localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
                dateAdapter={AdapterDayjs}
                adapterLocale='ru'
            >
                <div className={"w-full flex flex-col gap-2"}>
                    <Text text={"Выберите дату"}/>
                    <MobileDatePicker
                        defaultValue={dayjs(Date.now())}
                        sx={{
                            ".MuiOutlinedInput-notchedOutline": {
                                border: "none",
                            },
                            ".MuiOutlinedInput-input": {
                                backgroundColor: "#F6FCFF",
                                border: "2px solid #E3F6FF",
                                borderRadius: "10px"
                            }
                        }}
                    />
                </div>
            </LocalizationProvider>
        </div>
    );
};

export default TestPage;
