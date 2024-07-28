import React from 'react';
import {Skeleton} from "primereact/skeleton";
import Text from "@/components/atoms/text/text-base/Text";

import 'primereact/resources/themes/lara-light-cyan/theme.css';

const CatalogHeaderSkeleton = () => (
    <header className={"w-full px-5 sm:px-[100px] sm:col-span-full flex flex-col gap-3"}>
        <Skeleton width={'50%'} height={'50px'}/>
        <span className={'w-full flex flex-row gap-3'}>
            {Array(3).fill(0).map((_, key, array) => (
                <span className={'flex flex-row gap-3 items-center'}>
                    <Skeleton width={'150px'} height={'20px'} className={'rounded-sm'}/>
                    {key !== array.length - 1 ? <Text text={'/'} className={'text-gray-300'}/> : null}
                </span>
            ))}
        </span>
    </header>
);

export default CatalogHeaderSkeleton;
