import ControlledTextArea from "@/components/atoms/inputs/controlled-text-area/ControlledTextArea";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import Text from "@/components/atoms/text/text-base/Text";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { getSeoById } from "./SeoBlock.api";
import { cn } from "@/utlis/cn";

interface SeoBlockProps {
    hintUrl: string;
    isStatic?: boolean;
    seoId?: number;
}

const getClassName = (isStatic: boolean) => {
    const staticClassName = "w-full col-span-full flex flex-col gap-7"

    return isStatic ? staticClassName : cn(staticClassName, "p-7 rounded-xl border-2 border-light-gray");
}

export const SeoBlock = ({ isStatic = false, seoId, hintUrl }: SeoBlockProps) => {
    const context = useFormContext();

    useEffect(() => {
        if (seoId) {
            getSeoById(seoId).then((seo) => {
                context.reset({
                    seoEntityDto: {
                        ...seo,
                        keywords: seo?.keywords?.join(','),
                    }
                })
            })
        }
    }, [seoId])

    return (
        <section className={getClassName(isStatic)}>
            <span className='flex flex-row gap-3 items-baseline'>
                <Text text='SEO' className="text-[20px] font-medium text-black" />
                <Text text='Необязательно для заполнения' className="text-sm text-text-gray" />
            </span>
            <div className='flex flex-row gap-5'>
                <ControlledTextInput
                    hintText={{ hintMessage: "Длина должна быть не больше 80 символов", type: 'neutral' }}
                    placeholder="Введите название"
                    labelText="Заголовок"
                    name={isStatic ? "title" : "seoEntityDto.title"}
                />
                <ControlledTextInput
                    hintText={{ hintMessage: `Например, ${hintUrl}`, type: 'neutral' }}
                    placeholder="Введите URL страницы"
                    labelText="URL страницы"
                    name={isStatic ? "urlMask" : "seoEntityDto.urlMask"}
                />
            </div>
            <div className='flex flex-row gap-5'>
                <ControlledTextArea
                    hintText={{ hintMessage: "Длина должна быть не больше 20 слов", type: 'neutral' }}
                    placeholder="Введите ключевые слова"
                    labelText="Ключевые слова"
                    name={isStatic ? "keywords" : "seoEntityDto.keywords"}
                />
                <ControlledTextArea
                    hintText={{ hintMessage: "Длина должна быть не больше 512 символов", type: 'neutral' }}
                    name={isStatic ? "description" : "seoEntityDto.description"}
                    placeholder="Введите описание"
                    labelText="Описание"
                />
            </div>
        </section>
    )
}