import {HeaderWrapperProps} from "@/types/props/Wrapper";
import Text from "@/components/atoms/text/text-base/Text";
import {cn} from "@/utlis/cn";
import MobileSliderWrapper from "@/components/mobile/wrappers/mobile-slider-wrapper/MobileSliderWrapper";
import Link from "next/link";

const MobileHeaderWrapper = ({canSlide = true, ...props}: HeaderWrapperProps) => (
    <section className={cn("w-full flex flex-col gap-5 sm:hidden", props.classNames?.mainWrapper)}>
        <div className={"px-5 w-full flex flex-row items-baseline justify-between"}>
            {props.header && <Text
                text={props.header}
                className={"text-[20px] font-semibold"}
            />}
            {props.textLink && <Link href={props.textLink.link as string}>
                <Text
                    className={"text-[14px] text-link-blue pointer"}
                    text={props.textLink.text}
                />
            </Link>}
        </div>
        {
            canSlide ? <section className={"sm:hidden flex w-full ml-5"}>
                <MobileSliderWrapper>{props.children}</MobileSliderWrapper>
            </section> : <section className={"w-full px-5 grid grid-cols-2 gap-2 pb-5"}>
                {props.children}
            </section>
        }
    </section>
);

export default MobileHeaderWrapper;
