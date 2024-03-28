import React from 'react';
import {SelectItem} from "@/types/props/SelectItem";
import Text from "@/components/atoms/text/text-base/Text";
import {cn} from "@/utlis/cn";
import {FiCheck} from "react-icons/fi";
import {ClassValue} from "clsx";

type StepperProps = {
    steps: SelectItem<number>[],
    activeStep: SelectItem<number>,
    setActiveStep: (activeStep: SelectItem<number>) => void
}

const FormStepper = (props: StepperProps) => {

    const handleStepClick = (curStep: SelectItem<number>) => {
        if (curStep.value < props.activeStep.value) {
            props.setActiveStep(curStep)
        }
    }

    return (
        <section className={"w-full flex flex-row gap-2 sm:gap-7 items-center justify-center"}>
            {
                props.steps.map((step, stepIndex, steps) => {

                        const stepCV = [
                            "w-7 h-7 sm:w-[35px] sm:h-[35px] rounded-full flex items-center justify-center",
                            {"bg-bg-light-blue text-text-gray": stepIndex > props.activeStep.value},
                            {"bg-link-blue text-white": stepIndex < props.activeStep.value},
                            {"bg-light-gray text-link-blue": stepIndex === props.activeStep.value}
                        ]

                        const textCV: ClassValue = {"text-text-gray": stepIndex > props.activeStep.value}

                        return (
                            <React.Fragment>
                                <button
                                    className={"flex flex-row items-center gap-4"}
                                    onClick={() => handleStepClick(step)}
                                >
                                    <div className={cn(stepCV)}>
                                        {
                                            stepIndex < props.activeStep.value
                                            && <FiCheck size={"18px"}/>
                                        }
                                        {
                                            stepIndex >= props.activeStep.value && <Text
                                                text={`${stepIndex + 1}`}
                                                className={"text-[14px] font-medium"}
                                            />
                                        }
                                    </div>
                                    <Text
                                        className={cn("hidden sm:flex whitespace-nowrap", textCV)}
                                        text={step.name}
                                    />
                                </button>
                                {
                                    stepIndex !== steps.length - 1 && <div
                                        className={"w-full h-0.5 bg-light-gray"}
                                    />
                                }
                            </React.Fragment>
                        )
                    }
                )
            }
        </section>
    );

};

export default FormStepper;
