import React, {useState} from 'react';
import {WrapperProps} from "@/types/props/Wrapper";
import Text from "@/components/atoms/text/text-base/Text";
import {cn} from "@/utlis/cn";
import ChevronButton from "@/components/atoms/buttons/chevron-button/ChevronButton";

const OrderPageHeaderBlock = ({header, ...props}: WrapperProps & { header: string }) => {

    const [isExpanded, setExpanded] = useState<boolean>(true)
    const handleSwitchExpanded = () => setExpanded(!isExpanded)

    return (
        <div className={cn("w-full flex flex-col gap-5", props.className)}>
            <div className={"w-full flex flex-row items-center justify-between"}>
                <Text text={header} className={"text-[20px] font-medium"}/>
                <ChevronButton
                    setExpanded={handleSwitchExpanded}
                    isExpanded={isExpanded}
                />
            </div>
            {isExpanded && props.children}
        </div>
    );

};

export default OrderPageHeaderBlock;
