import style from "./SCHeaderDescrCol.module.css"
import TextLg from "@/components/atoms/text/text-lg/TextLg";
import TextBase from "@/components/atoms/text/text-base/TextBase";

const SCHeaderDescrCol = ({header, descr}: {
    header: string,
    descr: string,
}) => {
    return (
        <div className={style.headerDescrCol}>
            <TextLg text={header} weight={"semibold"}/>
            <TextBase text={descr}/>
        </div>
    )
}

export default SCHeaderDescrCol
