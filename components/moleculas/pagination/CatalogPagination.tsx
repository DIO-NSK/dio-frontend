import React, {useState} from 'react';
import {useUnit} from "effector-react";
import {$productsAmount} from "@/app/(customer)/(site)/(inner-pages)/catalog/[categoryId]/model";
import {WrapperProps} from "@/types/props/Wrapper";
import {cn} from "@/utlis/cn";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import Button from "@/components/atoms/buttons/button/Button";
import {RequestFilterParams, sendFiltersFx} from "@/components/organisms/bars/catalog-left-sidebar/model";

const CARDS_PER_VIEW = 9

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

const CatalogPagination = ({categoryId} : {categoryId : number}) => {

    const [amount, changePage] = useUnit([$productsAmount, sendFiltersFx])
    const [activeIndex, setActiveIndex] = useState<number>(1)

    const pageCount = Math.ceil(amount / CARDS_PER_VIEW)
    const pages = Array.from({length: pageCount}, (_, index) => index + 1)

    const handleChangePage = (page: number) => {
        changePage({categoryId : categoryId, page: page - 1, size: CARDS_PER_VIEW} as RequestFilterParams)
        window.scrollTo(0,0)
        setActiveIndex(page)
    }

    return (
        <section
            className={'col-span-9 pt-7 px-7 border-t-2 border-light-gray flex flex-row items-center justify-between'}>
            <IconButton
                onClick={() => handleChangePage(activeIndex - 1)}
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
                        onClick={() => handleChangePage(page)}
                        text={`${page}`} key={index}
                    />
                ))}
            </section>
            <IconButton
                onClick={() => handleChangePage(activeIndex + 1)}
                isActive={activeIndex !== pageCount}
            >
                <FiChevronRight size={'20px'}/>
            </IconButton>
        </section>
    );

};

export default CatalogPagination;