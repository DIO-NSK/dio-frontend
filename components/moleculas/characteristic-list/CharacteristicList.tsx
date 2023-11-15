import style from "./CharacteristicList.module.css"
import TextBase from "@/components/atoms/text/text-base/TextBase";
import {ProductCharacteristic} from "@/types/product";

const Item = ({characteristic}: {
    characteristic: ProductCharacteristic
}) => {
    return (
        <div className={style.row}>
            <TextBase text={characteristic.name}/>
            <TextBase text={characteristic.value}/>
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
