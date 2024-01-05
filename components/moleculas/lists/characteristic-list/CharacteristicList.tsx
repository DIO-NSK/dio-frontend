import style from "./CharacteristicList.module.css"
import Text from "@/components/atoms/text/text-base/Text";
import {ProductCharacteristic} from "@/types/product";

const Item = ({characteristic}: {
    characteristic: ProductCharacteristic
}) => {
    return (
        <div className={style.row}>
            <Text text={characteristic.name}/>
            <Text text={characteristic.value}/>
        </div>
    )
}

const CharacteristicList = ({characteristics}: {
    characteristics: ProductCharacteristic[]
}) => {
    return (
        <div className={style.listCol}>
            {
                characteristics.map((item) => {
                    return <CharacteristicList.Item characteristic={item}/>
                })
            }
        </div>
    )
}

CharacteristicList.Item = Item

export default CharacteristicList
