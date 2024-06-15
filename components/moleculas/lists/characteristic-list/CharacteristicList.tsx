import Text from "@/components/atoms/text/text-base/Text";
import {ProductCharacteristic} from "@/types/product";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

const Item = ({characteristic}: {
    characteristic: ProductCharacteristic
}) => {

    const wrapperCV: ClassValue[] = [
        "w-full flex flex-row items-baseline justify-between",
        "pb-[20px] border-b-2 border-light-gray"
    ]

    const prefix = characteristic.valueName?.trim().length ? `, ${characteristic.valueName}` : ''

    return (
        <div className={cn(wrapperCV)}>
            <Text text={`${characteristic.name}${prefix}`}/>
            <Text text={characteristic.value}/>
        </div>
    )

}

const CharacteristicList = ({characteristics}: {
    characteristics: ProductCharacteristic[]
}) => {
    return (
        <section className={"w-full col-span-4 flex flex-col gap-[20px]"}>
            {characteristics.slice(0, 5).map((item) => {
                return <CharacteristicList.Item characteristic={item}/>
            })}
        </section>
    )
}

CharacteristicList.Item = Item

export default CharacteristicList
