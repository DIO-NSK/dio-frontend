export const createStyles = (theme : string) => [
  "w-full flex flex-col gap-5 p-5 md:p-7 rounded-xl",
  { "border-2 border-light-gray": theme == "outlined" },
  { "bg-bg-light-blue": theme == "filled" },
];
