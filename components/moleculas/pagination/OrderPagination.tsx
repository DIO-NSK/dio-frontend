'use client'

import React, {useEffect, useState} from 'react';
import {WrapperProps} from "@/types/props/Wrapper";
import {cn} from "@/utlis/cn";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import Button from "@/components/atoms/buttons/button/Button";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const ORDERS_PER_VIEW = 30

type IconButtonProps = {
    isActive: boolean,
    onClick: () => void
} & WrapperProps

const IconButton = (props: IconButtonProps) => {

    const itemCV = [
        "p-3 bg-bg-light-blue rounded-xl text-text-gray flex items-center justify-between",
        "hover:text-link-blue hover:bg-light-gray hoverable pointer active:outline-none",
        {"hover:cursor-not-allowed hover:text-text-gray": !props.isActive}
    ]

    return (
        <button onClick={() => props.isActive && props.onClick()} className={cn(itemCV)}>
            {props.children}
        </button>
    )

}

interface OrderPaginationProps {
    itemsLength : number;
}

const OrderPagination = ({itemsLength} : OrderPaginationProps) => {

    const searchParams = useSearchParams()

    const pathname = usePathname()
    const router = useRouter()

    const [activeIndex, setActiveIndex] = useState<number>(1)

    const pageCount = Math.ceil(itemsLength / ORDERS_PER_VIEW)
    const pages = Array.from({length: pageCount}, (_, index) => index + 1)

    useEffect(() => {
        const currentPage = searchParams.get('page')
        if (currentPage && !isNaN(+currentPage)) {
            setActiveIndex(+currentPage)
        }
    }, [searchParams]);

    useEffect(() => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.set('page', activeIndex.toString())
        router.push(pathname.concat(`?${current.toString()}`))
        window.scrollTo(0, 0)
    }, [activeIndex]);

    return (
        <section className={'col-span-9 px-7 flex flex-row items-center justify-center gap-5'}>
            <IconButton
                onClick={() => setActiveIndex(activeIndex - 1)}
                isActive={activeIndex !== 1}
            >
                <FiChevronLeft size={'20px'}/>
            </IconButton>
            <section className={"flex flex-row items-center gap-5"}>
                {pages.map((page, index) => (
                    <Button
                        classNames={{
                            button: cn([
                                'px-0 py-3 w-[52px] hover:text-link-blue rounded-lg bg-bg-light-blue text-text-gray',
                                {'bg-light-gray text-link-blue': page === activeIndex}
                            ])
                        }}
                        buttonType={'SECONDARY'}
                        onClick={() => setActiveIndex(page)}
                        text={`${page}`} key={index}
                    />
                ))}
            </section>
            <IconButton
                onClick={() => setActiveIndex(activeIndex + 1)}
                isActive={activeIndex !== pageCount}
            >
                <FiChevronRight size={'20px'}/>
            </IconButton>
        </section>
    );

};

export default OrderPagination;