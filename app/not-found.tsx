"use client"

import CoolerImage from "@/public/images/water-cooler-image.png"
import {useRouter} from "next/navigation";
import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import Navbar from "@/components/organisms/bars/navbar/Navbar";
import Searchbar from "@/components/organisms/bars/searchbar/Searchbar";
import React from "react";
import Footer from "@/components/organisms/footer/Footer";
import MobileNavbar from "@/components/mobile/moleculas/bars/navbar/MobileNavbar";

const header: string = "Такой страницы не существует"
const message: string = `Проверьте корректность вашей ссылки,
    либо вы можете вернуться на главную`

const NotFound = () => {

    const router = useRouter()
    const handleBack = () => router.back()
    const handleGoToMain = () => router.push("/")

    return (
        <React.Fragment>
            <Navbar/>
            <Searchbar/>
            <MobileNavbar scrolledUp={false}/>
            <section className={"w-full flex items-center justify-center px-5 sm:px-0 sm:py-0 py-10"}>
                <section className={"flex flex-row items-center gap-16"}>
                    <img
                        src={'https://storage.yandexcloud.net/dio-static-images/bottle-404.png'}
                        className={"hidden sm:flex md:w-[300px] lg:w-[290px] xl:w-[350px] object-cover"}
                        alt={"Фирменный кулер DIO"}
                    />
                    <section className={"flex flex-col items-center sm:items-start gap-5 sm:gap-7"}>
                        <div className={"flex flex-col items-center sm:items-start gap-4"}>
                            <Text text={"404"} className={"text-[64px] md:text-[80px] xl:text-[96px] leading-none font-bold text-link-blue"}/>
                            <div className={"flex flex-col items-center sm:items-start gap-3 sm:gap-4"}>
                                <Text text={header} className={"text-lg sm:text-2xl font-medium"}/>
                                <Text text={message} className={"text-base text-center sm:text-start sm:text-xl text-text-gray sm:w-[400px] text-pretty"}/>
                            </div>
                        </div>
                        <div className={"flex flex-row gap-3 sm:gap-4"}>
                            <Button text={"На главную"} onClick={handleGoToMain}/>
                            <Button text={"Назад"} onClick={handleBack} buttonType={"SECONDARY"}/>
                        </div>
                    </section>
                </section>
            </section>
            <Footer/>
        </React.Fragment>
    );

};

export default NotFound;