
import Text40 from "@/components/atoms/text/text-40/Text40";

const Catalog = ({params} : {params : { category : string }}) => {
    return (
        <Text40 text={params.category} />
    )
}

export default Catalog
