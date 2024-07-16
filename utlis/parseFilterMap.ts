export const parseFilterMap = (filterMap : string) : [number, number] => {
    const [slashIndex, questionMarkIndex] = [filterMap.lastIndexOf('/'), filterMap.indexOf('?')];
    const [equalsMarkIndex, colonIndex] = [filterMap.indexOf('='), filterMap.indexOf(':')];

    const categoryId = filterMap.slice(slashIndex + 1, questionMarkIndex);
    const filterId = filterMap.slice(equalsMarkIndex + 1, colonIndex);

    return [Number(categoryId), Number(filterId)];
}