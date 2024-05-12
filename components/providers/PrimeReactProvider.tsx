"use client"

import React from 'react';
import Tailwind from "primereact/passthrough/tailwind";
import {twMerge} from "tailwind-merge";
import {WrapperProps} from "@/types/props/Wrapper";

import {APIOptions, PrimeReactProvider as InternalPrimeReactProvider} from "primereact/api";

const primeReactConfig: Partial<APIOptions> = {
    unstyled: false,
    pt: Tailwind,
    ptOptions: {
        mergeSections: true,
        mergeProps: true,
        classNameMergeFunction: twMerge
    }
}

const PrimeReactProvider = (props: WrapperProps) => (
    <InternalPrimeReactProvider value={primeReactConfig}>
        {props.children}
    </InternalPrimeReactProvider>
);

export default PrimeReactProvider;