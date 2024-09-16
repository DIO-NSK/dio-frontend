import React from 'react';
import SelectInput, {DropdownInputProps} from "@/components/atoms/inputs/select-input/SelectInput";
import ServiceFullCard from "@/components/organisms/cards/service-full-card/ServiceFullCard";
import {ServiceCardDTO} from "@/types/cards";

type ServiceContentBlockProps = {
    services?: ServiceCardDTO[]
} & DropdownInputProps<string>

const ServiceContentBlock = (props: ServiceContentBlockProps) => (
    <section className={"w-full md:col-span-8 xl:col-span-9 flex flex-col gap-5"}>
        <SelectInput className={"md:hidden"} {...props}/>
        <section className={"w-full flex flex-col gap-5"}>
            {props.services?.map((card, key) => (
                <ServiceFullCard card={card} key={key}/>
            ))}
        </section>
    </section>
)

export default ServiceContentBlock;
