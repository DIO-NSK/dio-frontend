import React, {PropsWithChildren, ReactNode} from 'react';
import Text from "@/components/atoms/text/text-base/Text";

type FormBlockProps = {
    header?: string,
    leftContent?: ReactNode,
    rightContent?: ReactNode
} & PropsWithChildren

const FormBlock = (props: FormBlockProps) => {
    return (
        <section className={'px-7 pb-7 w-full border-b-2 border-light-gray flex flex-col gap-6'}>
            <div className={'w-full flex flex-row items-center justify-between'}>
                <div className={'flex flex-row items-baseline gap-3'}>
                    {props.header && <Text text={props.header} className={'text-lg font-medium'}/>}
                    {props.leftContent}
                </div>
                {props.rightContent}
            </div>
            <section className={"w-full grid grid-cols-3 gap-7"}>
                {props.children}
            </section>
        </section>
    );
};

export default FormBlock;