import React from 'react';
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

type StepperProps = {
    activeIndex: number,
    onSelect: (stepId: number) => void,
    stepCount?: number
}

const MobileStepper = ({stepCount = 4, ...props}: StepperProps) => {

    const steps = Array.from({length: stepCount}, (_, stepIndex) => stepIndex)

    return (
        <div className={"flex flex-row items-center gap-2"}>
            {
                steps.map(stepIndex => {

                    const stepCV: ClassValue[] = [
                        "w-8 h-[3px] bg-border-gray",
                        {"bg-link-blue": stepIndex === props.activeIndex}
                    ]

                    return <div
                        onClick={() => props.onSelect(stepIndex)}
                        className={cn(stepCV)}
                        key={stepIndex}
                    />

                })
            }
        </div>
    );
};

export default MobileStepper;
