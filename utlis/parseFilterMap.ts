export const parseFilterMap = (filterMap : string) : [number, number, string] => {
    const [slashIndex, questionMarkIndex] = [filterMap.lastIndexOf('/'), filterMap.indexOf('?')];
    const [equalsMarkIndex, colonIndex] = [filterMap.indexOf('='), filterMap.indexOf(':')];

    const categoryId = filterMap.slice(slashIndex + 1, questionMarkIndex);
    const filterId = filterMap.slice(equalsMarkIndex + 1, colonIndex);
    const queryFilterMap = filterMap.slice(equalsMarkIndex + 1);

    return [Number(categoryId), Number(filterId), queryFilterMap];
}