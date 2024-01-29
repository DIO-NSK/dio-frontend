import React from 'react';
import Text from "@/components/atoms/text/text-base/Text";

type HeaderDescrButtonRowProps = {
    header : string,
    descr : string,
    button : React.ReactNode
}

const HeaderDescrButtonRow = (props : HeaderDescrButtonRowProps) => {
    return (
        <div className={"w-full flex flex-row items-end justify-between"}>
            <div className={"flex flex-col gap-2 w-[600px]"}>
                <Text text={props.header} className={"text-[20px] font-medium"}/>
                <Text text={props.descr} className={"text-text-gray"}/>
            </div>
            {props.button}
        </div>
    );
};

export default HeaderDescrButtonRow;
