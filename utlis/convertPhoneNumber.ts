export function convertPhoneNumber(phoneNumber: string): string {
    const countrySign = `+${phoneNumber[1]} `
    const treeNumbers = `(${phoneNumber.slice(2, 5)}) ${phoneNumber.slice(5, 8)}`
    const twoNumbers = `-${phoneNumber.slice(8, 10)}-${phoneNumber.slice(10, 12)}`
    return countrySign + treeNumbers + twoNumbers
}