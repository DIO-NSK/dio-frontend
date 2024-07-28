import React from 'react';
import {CircularProgress} from "@mui/joy";
import Text from "@/components/atoms/text/text-base/Text";
import {cn} from "@/utlis/cn";

const Loading = ({className} : {className ?: string}) => {
    return (
        <section className={cn("col-span-full w-full h-full flex items-center justify-center", className)}>
            <div className={"flex flex-col gap-5 items-center p-20"}>
                <CircularProgress/>
                <Text
                    text={"Страница загружается.."}
                    className={"text-link-blue text-lg"}
                />
            </div>
        </section>
    );
};

export default Loading;
