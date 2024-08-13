import {AutoCompletePassThroughMethodOptions, AutoCompletePassThroughOptions} from "primereact/autocomplete";
import {cn} from "@/utlis/cn";

export const pt : AutoCompletePassThroughOptions = {
    root: () => ({
        className: 'col-span-full'
    }),
    container: {
        className: cn(
            'm-0 list-none cursor-text overflow-hidden flex items-center flex-wrap col-span-full', 'px-3 py-2 gap-2',
            'font-sans text-base text-gray-700 border border-gray-300 transition duration-200 ease-in-out appearance-none rounded-md',
            'focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] hover:border-blue-500 focus:outline-none'
        )
    },
    input: ({ props } : AutoCompletePassThroughMethodOptions) => ({
        root: {
            className: cn(
                'm-0 w-full col-span-full',
                'transition-colors duration-200 appearance-none rounded-lg',
                { 'rounded-tr-none rounded-br-none': props.dropdown },
                {
                    'font-sans text-base text-gray-700 bg-white p-3 border border-gray-300 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] hover:border-blue-500 focus:outline-none':
                        !props.multiple,
                    'font-sans text-base text-gray-700 border-0 outline-none bg-transparent m-0 p-0 shadow-none rounded-none w-full': props.multiple
                }
            )
        }
    }),
    dropdownButton: {
        root: () => ({
            className : 'rounded-tl-none rounded-bl-none'
        })
    },
    loadingIcon : {
        className : 'hidden'
    },
    panel: {
        className: cn('mt-5 bg-white text-gray-700 border-0 rounded-md shadow-lg max-w-[925px]', 'max-h-[200px] overflow-auto')
    },
    item: ({ context, state } : AutoCompletePassThroughMethodOptions) => ({
        className: cn('cursor-pointer font-normal overflow-hidden relative whitespace-wrap max-w-[925px]', 'm-0 p-3 border-0  transition-shadow duration-200 rounded-none', {
            'text-gray-700 hover:text-gray-700 hover:bg-gray-100': !context.selected,
            'bg-white text-gray-700 hover:text-gray-700 hover:bg-gray-100': state.focused && !context.selected,
            'bg-blue-100 text-blue-700': context.selected,
        })
    }),
}