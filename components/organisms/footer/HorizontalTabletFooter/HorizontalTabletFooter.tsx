import {footerData} from "@/data/footerData";
import Text from "@/components/atoms/text/text-base/Text";
import Link from "next/link";
import React from "react";
import {secondRowData} from "@/components/organisms/footer/HorizontalTabletFooter/HorizontalTabletFooter.constants";
import {IconRow} from "../IconRow/IconRow";
import {RowWrapper} from "../RowWrapper/RowWrapper";
import {LinkItem} from "../LinkItem/LinkItem";

const FIRST_ROW_ITEMS_AMOUNT = 12;

const FirstRow = () => (
    <RowWrapper>
        {footerData.slice(0, FIRST_ROW_ITEMS_AMOUNT).map((item, key) => (
            <LinkItem item={item} className={`col-start-${Math.floor(key / 3) + 1} row-start-${key % 3 + 1} `} key={key}/>
        ))}
    </RowWrapper>
)

const SecondRow = () => (
    <RowWrapper>
        {
            secondRowData.map(({header, description}, key) => (
                <div className={'col-span-1 flex flex-col gap-3'} key={key}>
                    <Text text={header} className={'text-text-gray'}/>
                    <Link href={`tel:${description}`}>
                        <Text text={description} className={'text-text-black'}/>
                    </Link>
                </div>
            ))
        }
    </RowWrapper>
)

const ThirdRow = () => (
    <div className={'w-full grid grid-cols-4 gap-5 align-items-start'}>
        {footerData.slice(FIRST_ROW_ITEMS_AMOUNT - 1).map((item, key) => (
            <LinkItem item={item} key={key}/>
        ))}
        <IconRow/>
    </div>
)

export const HorizontalTabletFooter = () => (
    <footer className={'w-full flex flex-col gap-8'}>
        <FirstRow/>
        <SecondRow/>
        <ThirdRow/>
    </footer>
)