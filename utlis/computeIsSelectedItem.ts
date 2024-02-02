export const computeIsSelectedItem = <T,>(items : T[], elem: T) => {
    return !!items.find((another) => another === elem)
}