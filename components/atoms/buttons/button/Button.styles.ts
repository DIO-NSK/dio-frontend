import { ClassValue } from "clsx";

const createButtonSize = (size: string): ClassValue => ({
    "px-6 py-4 xl:px-[50px] gap-[15px]": size == "md",
    "px-5 px-4 py-3 gap-2": size == "sm",
});

const createButtonType = (type: string): ClassValue => ({
    "bg-light-gray text-link-blue sm:hover:bg-blue-100": type === "SECONDARY",
    "bg-link-blue text-white sm:hover:bg-blue-800": type === "PRIMARY",
})

export const createButtonStyles = (size: string, type: string, disabled: boolean, buttonCV: string | undefined): ClassValue[] => ([
    "flex flex-row items-center",
    "justify-center rounded-xl whitespace-nowrap",
    "sm:hover:duration-200 transition duration-200 pointer text-base",
    { "bg-bg-light-blue text-text-gray border-2 border-light-gray": disabled },
    { "sm:hover:bg-bg-light-blue sm:hover:text-text-gray sm:hover:border-2": disabled },
    { "sm:hover:border-light-gray sm:hover:cursor-not-allowed": disabled },
    createButtonSize(size), createButtonType(type),
    buttonCV,
]);