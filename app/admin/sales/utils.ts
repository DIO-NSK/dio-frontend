
export const convertDeadlineToDate = (deadline : string) => {
    const dateDeadline = deadline.replace('до ', '');
    const [day, month, year] = dateDeadline.split('.')
    return `${year}-${month}-${day}`
}