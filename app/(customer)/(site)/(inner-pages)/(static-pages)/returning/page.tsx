"use client"

import BreadCrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";
import Text from "@/components/atoms/text/text-base/Text";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import {TextLink} from "@/types/dto/text";
import StaticInfoCol from "@/components/moleculas/cols/static-info-col/StaticInfoCol";
import {returningData} from "@/data/static/returning";

const ReturningPage = () => {

    const breadcrumbs: TextLink[] = [
        {text: "Главная", link: "/"},
        {text: "Возврат и обмен товара", link: "/returning"},
    ]

    return (
        <InnerPageWrapper classNames={{mobileWrapper : "pt-0"}}>

            <div className={"col-span-full flex flex-col gap-[10px]"}>
                <BreadCrumbs breadcrumbs={breadcrumbs}/>
                <Text
                    text={"Возврат и обмен товара"}
                    className={"text-[24px] text-black font-semibold"}
                />
            </div>

            <StaticInfoCol data={returningData}/>

        </InnerPageWrapper>
    );
};

export default ReturningPage;
