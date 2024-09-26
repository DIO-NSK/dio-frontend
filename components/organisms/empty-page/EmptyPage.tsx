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
    "md:-mx-10 w-full md:col-span-6 xl:col-span-9 flex flex-row gap-12",
    "rounded-xl md:p-10 md:bg-bg-light-blue",
    className
]

const EmptyPage = (props : EmptyPageProps) => {

    const router = useRouter()
    const handleGoToMain = () => router.push("/")

    return (
        <section className={cn(wrapperStyles(props.className))}>
            <div className={'hidden md:flex'}>
                <QuestionMark/>
            </div>
            <section className={"flex flex-col gap-5 md:gap-7 w-full"}>
                <div className={"flex flex-col md:gap-3 gap-1 w-full"}>
                    <Text text={props.header} className={"md:text-xl text-lg font-medium"}/>
                    <Text text={props.description} className={"md:text-lg text-base text-text-gray"}/>
                </div>
                <div className={"w-full flex flex-col gap-2 md:w-fit md:flex-row"}>
                    {props.children}
                    <Button text={"На главную"} onClick={handleGoToMain} buttonType={"SECONDARY"}/>
                </div>
            </section>
        </section>
    )

}

export default EmptyPage;