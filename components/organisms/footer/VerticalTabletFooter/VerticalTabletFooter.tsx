import {footerData} from "@/data/footerData";
import Text from "@/components/atoms/text/text-base/Text";
import Link from "next/link";
import React from "react";
import {IconRow} from "../IconRow/IconRow";
import {RowWrapper} from "../RowWrapper/RowWrapper";
import {LinkItem} from "../LinkItem/LinkItem";
import {cn} from "@/utlis/cn";
import {HeaderDescription} from "@/types/dto/text";
import {secondRowData} from "../HorizontalTabletFooter/HorizontalTabletFooter.constants";

const FirstRow = () => (
    <RowWrapper className={'grid-cols-3 pb-6'}>
        <LinkItem item={footerData[0]} className={'col-start-1 row-start-1'}/>
        <LinkItem item={footerData[1]} className={'col-start-1 row-start-2'}/>
        <LinkItem item={footerData[2]} className={'col-start-1 row-start-3'}/>
        <LinkItem item={footerData[3]} className={'col-start-2 row-start-1'}/>
        <LinkItem item={footerData[4]} className={'col-start-2 row-start-2'}/>
        <LinkItem item={footerData[5]} className={'col-start-2 row-start-3'}/>
        <LinkItem item={footerData[6]} className={'col-start-3 row-start-1'}/>
        <LinkItem item={footerData[7]} className={'col-start-3 row-start-2'}/>
        <LinkItem item={footerData[8]} className={'col-start-3 row-start-3'}/>
    </RowWrapper>
)

const TelephoneColumn = ({item, className}: { item: HeaderDescription, className?: string }) => (
    <div className={cn('flex flex-col gap-3', className)}>
        <Text text={item.header} className={'text-text-gray'}/>
        <Link href={`tel:${item.description}`}>
            <Text text={item.description} className={'text-text-black'}/>
        </Link>
    </div>
)

const SecondRow = () => (
    <RowWrapper className={'grid-cols-3 pb-6'}>
        <div className={'col-span-1 flex flex-col gap-5'}>
            <LinkItem item={footerData[9]}/>
            <LinkItem item={footerData[10]}/>
            <LinkItem item={footerData[11]}/>
        </div>
        <TelephoneColumn item={secondRowData[0]} className={'col-start-2'}/>
        <TelephoneColumn item={secondRowData[1]} className={'col-start-3'}/>
    </RowWrapper>
)

const ThirdRow = () => (
    <RowWrapper className={'grid-cols-3 pb-6 align-start'}>
        <TelephoneColumn item={secondRowData[2]} className={'col-start-1'}/>
        <TelephoneColumn item={secondRowData[3]} className={'col-start-2'}/>
        <IconRow className={'col-start-3 row-span-1 row-start-1 !h-fit'}/>
    </RowWrapper>
)

const FourthRow = () => (
    <RowWrapper className={'grid-cols-3 pb-6'}>
        <LinkItem item={footerData[12]} className={'col-start-1 row-start-1'}/>
        <LinkItem item={footerData[13]} className={'col-start-2 row-start-1 whitespace-nowrap'}/>
    </RowWrapper>
)

export const VerticalTabletFooter = () => (
    <footer className={'w-full flex flex-col gap-6'}>
        <FirstRow/>
        <SecondRow/>
        <ThirdRow/>
        <FourthRow/>
    </footer>
)