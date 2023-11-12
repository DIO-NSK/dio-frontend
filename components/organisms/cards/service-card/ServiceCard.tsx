import style from "./ServiceCard.module.css"
import Text2XL from "@/components/atoms/text/text-2xl/Text2XL";
import {COLOR} from "@/components/colors";

type ServiceCardTypes = {
    number : number,
    text : string,
}

const ServiceCard = ({number, text} : ServiceCardTypes) => {
    return (
        <div className={style.wrapper}>

            <div className={style.infoCol}>

                <Text2XL text={"0" + number.toString()} color={COLOR["link-blue"]} />
                <Text2XL text={text} />

            </div>

        </div>
    )
}

export default ServiceCard
