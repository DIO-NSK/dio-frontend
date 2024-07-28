import React from 'react';
import SelectInput, {DropdownInputProps} from "@/components/atoms/inputs/select-input/SelectInput";
import ServiceFullCard from "@/components/organisms/cards/service-full-card/ServiceFullCard";
import {ServiceCardDTO} from "@/types/cards";

type ServiceContentBlockProps = {
    services?: ServiceCardDTO[]
} & DropdownInputProps<string>

const ServiceContentBlock = (props: ServiceContentBlockProps) => (
    <section className={"w-full sm:col-span-9 flex flex-col gap-5"}>
        <SelectInput className={"sm:hidden"} {...props}/>
        <section className={"w-full flex flex-col gap-5 sm:-mt-5"}>
            {props.services?.map((card, key) => (
                <ServiceFullCard card={card} key={key}/>
            ))}
        </section>
    </section>
)

export default ServiceContentBlock;
