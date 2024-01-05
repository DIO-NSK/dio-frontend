"use client"

import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import Breadcrumbs from "@/components/atoms/breadcrumbs/Breadcrumbs";
import {TextLink} from "@/types/dto/text";

const AboutCompanyPage = () => {

    const breadcrumbs : TextLink[] = [
        {text : "Главная", link : "/"},
        {text : "О компании", link : "/about-company"},
    ]

    return (
        <InnerPageWrapper>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
        </InnerPageWrapper>
    );
};

export default AboutCompanyPage;
