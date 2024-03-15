import {FiSearch} from "react-icons/fi";
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

type SearchBarClassNames = {
    mainWrapper?: string,
    wrapper?: string,
    input?: string
}

type SearchbarProps = {
    placeholder: string,
    onChange: (value: string) => void,
    hasPopover?: boolean,
    classNames?: SearchBarClassNames,
    value?: string,
}

const Input = (props: Omit<SearchbarProps, "hasPopover">) => {

    const inputCV: ClassValue[] = [
        "w-full p-5 sm:px-[30px] py-4 rounded-xl bg-bg-light-blue border-0",
        "sm:bg-white sm:border-2 border-light-gray pointer",
        "group-hover:border-blue-400 hoverable",
        "focus:outline-0", props.classNames?.input
    ]

    const iconCV: ClassValue[] = [
        "absolute z-10 right-5 sm:right-[30px] top-1/3 stroke-text-gray sm:pointer",
        "w-5 h-5 sm:group-hover:stroke-blue-600 sm:hoverable"
    ]

    return (
        <div className={cn("w-full relative group", props.classNames?.wrapper)}>
            <FiSearch className={cn(iconCV)}/>
            <TextInput
                classNames={{input: cn(inputCV)}}
                placeholder={props.placeholder}
                onChange={props.onChange}
                value={props.value}
            />
        </div>
    )

}

const PopoverProductColumn = ({products}: { products: ResponseProductSearch[] }) => {

    if (products.length === 0) return

    return (
        <section className={"w-full flex flex-col gap-5"}>

            <div className={"w-full flex flex-row items-baseline gap-4"}>
                <Text text={"Товары"} className={"text-lg font-medium"}/>
                <Text text={`${products.length} шт.`} className={"text-text-gray"}/>
            </div>

            <section className={"w-full flex flex-col gap-5"}>
                {
                    products.map((product, index) => (
                        <div className={"w-full flex flex-row items-center border-b-2 border-light-gray gap-5"}
                             key={index}>
                            <img
                                className={"w-[130px] h-[70px] object-scale-down"}
                                alt={"Изображение продукта"}
                                src={product.image}
                            />
                            <div className={"w-full flex flex-col gap-2"}>
                                <div className={"flex flex-row items-baseline gap-2"}>
                                    <Text
                                        className={"text-link-blue font-medium"}
                                        text={`${product.newPrice} ₽`}
                                    />
                                    <Text
                                        className={"text-sm text-text-gray line-through"}
                                        text={`${product.oldPrice} ₽`}
                                    />
                                </div>
                                <Text text={product.name}/>
                            </div>
                        </div>
                    ))
                }
            </section>

        </section>
    )
}

const PopoverCategoryColumn = ({categories}: { categories: ResponsePromoSearch[] }) => {

    if (categories.length === 0) return

    return (
        <section className={"w-full flex flex-col gap-5"}>

            <div className={"w-full flex flex-row items-baseline gap-4"}>
                <Text text={"Категории"} className={"text-lg font-medium"}/>
                <Text text={`${categories.length} шт.`} className={"text-text-gray"}/>
            </div>

            <section className={"w-full flex flex-col gap-5"}>
                {
                    categories.map((category, index) => (
                        <div
                            className={"w-full flex flex-col gap-2 pb-5 border-b-2 border-light-gray"}
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
            className={"text-text-gray"}
        />
    }
}

const PopoverList = () => {

    const [catalog, searchName] = useUnit([$searchCatalog, $searchValue])

    if (searchName.length === 0) return

    if (catalog) return (
        <section className={"absolute z-20 top-[80px] w-full flex flex-col gap-5 p-7 rounded-xl bg-white shadow-2xl"}>
            <PopoverProductColumn products={catalog.productList}/>
            <PopoverCategoryColumn categories={catalog.categoryList}/>
            <NotFoundMessage catalog={catalog}/>
        </section>
    )

}

const SearchInput = ({hasPopover = false, ...props}: SearchbarProps) => {
    return (
        <section className={cn("w-full relative flex flex-col gap-5", props.classNames?.mainWrapper)}>
            <Input {...props}/>
            {hasPopover && <PopoverList/>}
        </section>
    )
}

export default SearchInput
