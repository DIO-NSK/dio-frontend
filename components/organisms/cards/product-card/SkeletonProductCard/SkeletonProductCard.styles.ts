import { ClassValue } from "clsx";

export const wrapperCV = (classNames: any): ClassValue[] => [
    "w-full sm:col-span-3 h-fit flex flex-col gap-4 p-5 bg-white",
    "sm:gap-7 sm:p-7 rounded-xl sm:hover:z-10 sm:hover:shadow-lg sm:hover:shadow-gray-200/50 sm:hover:scale-[1.01] sm:hoverable pointer",
    "border-2 border-gray-100 relative", classNames?.mainWrapper
]