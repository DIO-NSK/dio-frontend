
export type CallRequest = {
    id : Symbol,
    customer : Customer,
    date : string,
    time : string,
    comment : string
}

export type Customer = {
    name : string,
    phoneNumber : string,
    email ?: string,
}