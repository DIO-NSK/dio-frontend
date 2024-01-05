import style from "./SCHeaderDescrCol.module.css"
import TextLg from "@/components/atoms/text/text-lg/TextLg";
import Text from "@/components/atoms/text/text-base/Text";

const SCHeaderDescrCol = ({header, descr}: {
    header: string,
    descr: string,
}) => {
    return (
        <div className={style.headerDescrCol}>
            <TextLg text={header} weight={"semibold"}/>
            <Text text={descr}/>
        </div>
    )
}

export default SCHeaderDescrCol
