export function convertPhoneNumber(phoneNumber: string): string {
    const countrySign = `+${phoneNumber[1]} `
    const treeNumbers = `(${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}`
    const twoNumbers = `-${phoneNumber.slice(7, 9)}-${phoneNumber.slice(9, 11)}`
    return countrySign + treeNumbers + twoNumbers
}