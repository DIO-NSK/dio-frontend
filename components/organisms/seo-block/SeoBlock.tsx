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
    const errorObject = isStatic ? context.formState.errors : context.formState.errors.seoEntityDto;

    useEffect(() => {
        if (seoId) {
            getSeoById(seoId).then((seo) => {
                context.setValue('seoEntityDto', {
                    ...seo,
                    keywords: seo?.keywords?.join(','),
                })
            })
        }
    }, [seoId])

    return (
        <section className={getClassName(isStatic)}>
            <Text text='SEO' className="text-[20px] font-medium text-black" />
            <div className='flex flex-row gap-5'>
                <ControlledTextInput
                    errors={(errorObject as any)?.title}
                    hintText={{ hintMessage: "Длина должна быть не больше 80 символов", type: 'neutral' }}
                    placeholder="Введите название"
                    labelText="Заголовок"
                    name={isStatic ? "title" : "seoEntityDto.title"}
                    hasInnerError={false}
                />
                {
                    isStatic ? null : <ControlledTextInput
                        errors={(errorObject as any)?.urlMask}
                        hintText={{ hintMessage: `Например, ${hintUrl}`, type: 'neutral' }}
                        placeholder="Введите URL страницы"
                        labelText="URL страницы"
                        name={isStatic ? "urlMask" : "seoEntityDto.urlMask"}
                        hasInnerError={false}
                    />
                }
            </div>
            <div className='flex flex-row gap-5'>
                <ControlledTextArea
                    errors={(errorObject as any)?.keywords ? {message : "Количество ключевых слов не может быть больше 20."} as any: null}
                    hintText={{ hintMessage: "Длина должна быть не больше 20 слов. Каждое ключевое слово должно разделяться от другого запятой. Любая последовательность символов до запятой воспринимается как одно ключевое слово.", type: 'neutral' }}
                    placeholder="Введите ключевые слова"
                    labelText="Ключевые слова"
                    name={isStatic ? "keywords" : "seoEntityDto.keywords"}
                    hasInnerError={false}
                />
                <ControlledTextArea
                    hasInnerError={false}
                    errors={(errorObject as any)?.description}
                    hintText={{ hintMessage: "Длина должна быть не больше 512 символов", type: 'neutral' }}
                    name={isStatic ? "description" : "seoEntityDto.description"}
                    placeholder="Введите описание"
                    labelText="Описание"
                />
            </div>
        </section>
    )
}