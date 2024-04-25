import {FiCheck, FiSearch, FiX} from "react-icons/fi";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {useUnit} from "effector-react";
import {$searchCatalog, $searchValue} from "@/components/organisms/bars/searchbar/model";
import Text from "@/components/atoms/text/text-base/Text";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";
import {ResponsePromoSearch} from "@/types/dto/user/promo/ResponsePromoSearch";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import {ResponseSearchCatalog} from "@/types/dto/user/catalog/ResponseSearchCatalog";
import Link from "next/link";
import {SearchbarProps} from "@/types/props/Searchbar";
import {useDiscount} from "@/utlis/hooks/product/useDiscount";
import {MouseEventHandler} from "react";
import {useClickOutside} from "@/utlis/hooks/useClickOutside";

const SelectableVariants = <T, >({variants, onSelectVariant, selectedVariant}: SearchbarProps<T>) => {
    return (
        <div className={"flex flex-row gap-2"}>
            {variants?.map((variant, key) => {
                const variantCV: ClassValue[] = [
                    "flex flex-row items-center gap-1 rounded-lg py-2 px-3 text-sm bg-bg-light-blue text-text-gray",
                    "hoverable pointer hover:bg-light-gray hover:text-link-blue",
                    {"bg-light-gray text-link-blue": selectedVariant?.value === variant.value}
                ]
                return (
                    <div
                        className={cn(variantCV)}
                        onClick={() => onSelectVariant?.(variant)}
                        key={key}
                    >
                        {selectedVariant?.value === variant.value && <FiX size={"14px"}/>}
                        {variant.name}
                    </div>
                )
            })}
        </div>
    )
}

const Input = <T, >({selectable = false, ...props}: Omit<SearchbarProps<T>, "hasPopover">) => {

    const inputCV: ClassValue[] = [
        "w-full p-5 sm:px-[30px] py-4 rounded-xl bg-bg-light-blue border-0",
        "sm:bg-white sm:border-2 border-light-gray pointer",
        "group-hover:border-blue-400 hoverable",
        "focus:outline-0", props.classNames?.input
    ]

    const iconCV: ClassValue[] = [
        "stroke-text-gray sm:hover:cursor-pointer",
        "w-5 h-5 sm:group-hover:stroke-blue-600 sm:hoverable"
    ]

    const absoluteWrapperCV = [
        "absolute flex flex-row items-center gap-3",
        "z-10 top-3 right-5 sm:right-[30px]",
        {"top-1/3": !selectable}
    ]

    const handleClear: MouseEventHandler = (e) => {
        e.stopPropagation()
        props.onChange("")
        props.onSelect?.(undefined)
    }

    return (
        <div className={cn("w-full relative group", props.classNames?.wrapper)}>
            <div className={cn(absoluteWrapperCV)}>
                {selectable && <SelectableVariants {...props}/>}
                {props.value ? <FiX className={cn(iconCV)} onClick={handleClear}/>
                    : <FiSearch className={cn(iconCV)}/>}
            </div>
            <TextInput
                classNames={{input: cn(inputCV)}}
                placeholder={props.placeholder}
                onChange={props.onChange}
                value={props.value}
            />
        </div>
    )

}

const PopoverProductColumn = <T, >({products, ...props}: SearchbarProps<T> & { products: ResponseProductSearch[] }) => {

    if (products.length === 0) return

    const productRowCV: ClassValue = [
        "w-full right-0 p-7 pb-5 hover:bg-bg-light-blue hoverable pointer",
        "flex flex-row items-center border-b-2",
        "border-light-gray justify-between"
    ]

    return (
        <section className={"w-full flex flex-col"}>

            <div className={"w-full flex flex-row items-baseline gap-4 p-7 pb-5"}>
                <Text text={"Товары"} className={"text-lg font-medium"}/>
                <Text text={`${products.length} шт.`} className={"text-text-gray"}/>
            </div>

            <section className={"w-full flex flex-col gap-5"}>
                {
                    products.map((product, index, array) => {

                        const [newPrice, price] = useDiscount(product.price, product.discountPercent)

                        const itemCV = {
                            "rounded-b-xl": index === array.length - 1,
                            "bg-bg-light-blue": product.id === props.selectedElement?.id
                        }

                        return (
                            <div className={cn(productRowCV, itemCV)} onClick={() => props.onSelect?.(product)}
                                 key={index}>
                                <section className={"flex flex-row items-center gap-5"}>
                                    <img
                                        className={"w-[130px] h-[70px] object-scale-down"}
                                        alt={"Изображение продукта"}
                                        src={product?.mainImage}
                                    />
                                    <div className={"w-full flex flex-col gap-2"}>
                                        <div className={"flex flex-row items-baseline gap-2"}>
                                            <Text
                                                className={"text-link-blue font-medium"}
                                                text={`${newPrice.toFixed(2)} ₽`}
                                            />
                                            {product.discountPercent !== 0 && <Text
                                                className={"text-sm text-text-gray line-through"}
                                                text={`${price.toFixed(2)} ₽`}
                                            />}
                                        </div>
                                        <Text text={product.name}/>
                                    </div>
                                </section>
                                {
                                    props.selectedElement?.id === product.id && <FiCheck
                                        size={"20px"} className={"text-link-blue"}/>
                                }
                            </div>
                        )

                    })
                }
            </section>

        </section>
    )
}

const PopoverCategoryColumn = ({categories}: { categories: ResponsePromoSearch[] }) => {

    if (categories.length === 0) return

    return (
        <section className={"w-full flex flex-col gap-5"}>

            <div className={"w-full flex flex-row items-baseline gap-4 p-7 pb-5"}>
                <Text text={"Категории"} className={"text-lg font-medium"}/>
                <Text text={`${categories.length} шт.`} className={"text-text-gray"}/>
            </div>

            <section className={"w-full flex flex-col"}>
                {
                    categories.map((category, index) => (
                        <div
                            className={"w-full flex flex-col gap-2 p-7 pt-0 border-b-2 border-light-gray"}
                            key={index}
                        >
                            <Link href={`/catalog/${category.id}`}>
                                <Text className={"font-medium"} text={category.name}/>
                            </Link>
                        </div>
                    ))
                }
            </section>

        </section>
    )
}

const NotFoundMessage = ({catalog}: { catalog: ResponseSearchCatalog }) => {
    if (catalog.categoryList.length === 0 && catalog.productList.length === 0) {
        return <Text
            text={"Мы не смогли найти товар или категорию по вашему запросу"}
            className={"p-7 text-text-gray"}
        />
    }
}

const PopoverList = <T, >(props: SearchbarProps<T>) => {

    const [catalog, searchName] = useUnit([$searchCatalog, $searchValue])

    if (searchName.length === 0) return

    if (catalog) return (
        <section
            className={"absolute overflow-y-scroll z-20 top-[80px] w-full flex flex-col gap-5 rounded-xl bg-white shadow-2xl"}>
            <PopoverProductColumn products={catalog.productList} {...props}/>
            <PopoverCategoryColumn categories={catalog.categoryList}/>
            <NotFoundMessage catalog={catalog}/>
        </section>
    )

}

const SearchInput = <T, >({hasPopover = false, ...props}: SearchbarProps<T>) => {

    const {
        ref,
        isComponentVisible,
        setIsComponentVisible
    } = useClickOutside(true)

    return (
        <section
            ref={ref} onClick={() => setIsComponentVisible(true)}
            className={cn("w-full relative flex flex-col gap-5", props.classNames?.mainWrapper)}
        >
            <Input {...props}/>
            {hasPopover && isComponentVisible && <PopoverList {...props}/>}
        </section>
    )
}

export default SearchInput
