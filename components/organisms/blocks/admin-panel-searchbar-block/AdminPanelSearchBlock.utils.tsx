
export const swap = (array : any[], from : number, to : number) : any[] => {
    const newArray = [...array];
    [newArray[from], newArray[to]] = [newArray[from], newArray[to]];

    return newArray;
}