import React from 'react';
import {InfoBlockElement} from "@/types/dto/text";
import Text from "@/components/atoms/text/text-base/Text";
import {cn} from "@/utlis/cn";
import Button from "@/components/atoms/buttons/button/Button";

type MobileCartInfoBlockProps = {
    infoBlockData: InfoBlockElement[],
    buttonText: string,
    onSubmit: () => void,
    className ?: string
}

const MobileCartInfoBlock = (props: MobileCartInfoBlockProps) => {
    return (
        <section className={"md:hidden w-full flex flex-col gap-5"}>
            {props.infoBlockData.map((element, key) =>
                <div key={key} className={"w-full flex flex-row items-baseline justify-between pb-5 border-b-2 border-light-gray"}>
                    <Text text={element.header} className={"text-text-gray"}/>
                    <Text text={element.description} className={cn("text-text-gray", element.className)}/>
                </div>
            )}
            <Button
                classNames={{button : props.className}}
                onClick={props.onSubmit}
                text={props.buttonText}
            />
        </section>
    );
};

export default MobileCartInfoBlock;
