import React from 'react';
import {useRouter} from "next/navigation";
import QuestionMark from "@/components/atoms/svg/question-mark/QuestionMark";
import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import {cn} from "@/utlis/cn";

type EmptyPageProps = {
    header : string,
    description : string,
    children : React.ReactNode,
    className ?: string
}

const wrapperStyles = (className ?: string) => [
    "sm:-mx-10 w-full sm:col-span-6 flex flex-row gap-12",
    "rounded-xl sm:p-10 sm:bg-bg-light-blue",
    className
]

const EmptyPage = (props : EmptyPageProps) => {

    const router = useRouter()
    const handleGoToMain = () => router.push("/")

    return (
        <section className={cn(wrapperStyles(props.className))}>
            <div className={'hidden sm:flex'}>
                <QuestionMark/>
            </div>
            <section className={"flex flex-col gap-5 sm:gap-7 w-full"}>
                <div className={"flex flex-col sm:gap-3 gap-1 w-full"}>
                    <Text text={props.header} className={"sm:text-xl text-lg font-medium"}/>
                    <Text text={props.description} className={"sm:text-lg text-base text-text-gray"}/>
                </div>
                <div className={"w-full flex flex-col gap-2 sm:w-fit sm:flex-row"}>
                    {props.children}
                    <Button text={"На главную"} onClick={handleGoToMain} buttonType={"SECONDARY"}/>
                </div>
            </section>
        </section>
    )

}

export default EmptyPage;