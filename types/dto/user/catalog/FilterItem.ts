export type FilterItem = {
    id : number,
    name: string,
    valueName: string,
    variants: string[],
    range: Record<string, string>
}